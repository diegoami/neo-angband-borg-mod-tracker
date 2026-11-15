#!/usr/bin/env python3
"""Pinned native runner plus disclosed read-only birth/RNG observations.
Only isolated exported build trees are instrumented; the harness stays clean.
"""

import argparse, hashlib, json, pathlib, subprocess, types

HERE = pathlib.Path(__file__).resolve().parent
PIN = "fc9d97cb46aa0aaa27773e5c83a41ec395d515fc"
SOURCE = "e473720ed88a0f0c7ca66815cef3000eb4a38bc3"


def main():
    p = argparse.ArgumentParser()
    p.add_argument("action", choices=["build", "run"])
    p.add_argument("--harness", type=pathlib.Path, required=True)
    p.add_argument("--build", type=pathlib.Path, required=True)
    p.add_argument("--out", type=pathlib.Path)
    p.add_argument("--seed", type=int)
    p.add_argument("--race", default="Human")
    p.add_argument("--cls", default="Warrior")
    p.add_argument("--cap", type=int, default=2000)
    a = p.parse_args()
    root = a.harness.resolve()
    assert (
        subprocess.check_output(
            ["git", "-C", str(root), "rev-parse", "HEAD"], text=True
        ).strip()
        == PIN
    )
    for name in ["measure-native.py", "native-observer.c", "native-observer.h"]:
        expected = subprocess.check_output(
            ["git", "-C", str(root), "show", PIN + ":tools/" + name]
        )
        assert (root / "tools" / name).read_bytes() == expected, (
            "Changed pinned harness tool: " + name
        )
    path = root / "tools/measure-native.py"
    code = path.read_text()
    assert "'-DSUPPORT_X11_FRONTEND=ON'" in code
    # Headless test frontend only; no X11 development dependency or game change.
    code = code.replace("'-DSUPPORT_X11_FRONTEND=ON'", "'-DSUPPORT_X11_FRONTEND=OFF'")
    r = types.ModuleType("pinned_native")
    r.__file__ = str(path)
    exec(compile(code, str(path), "exec"), r.__dict__)
    original_bridge = r.named_play_bridge

    def instrument(source):
        original_bridge(source)
        cmake = source / "CMakeLists.txt"
        cm = cmake.read_text()
        old = "(NOT SUPPORT_X11_FRONTEND))"
        assert cm.count(old) == 1
        cmake.write_text(
            cm.replace(
                old, "(NOT SUPPORT_X11_FRONTEND) AND (NOT SUPPORT_TEST_FRONTEND))"
            )
        )
        observer = source / "src/native-observer.c"
        text = observer.read_text()
        text = text.replace(
            '#include "player.h"',
            '#include "player.h"\n#include "obj-gear.h"\n#include "cave.h"\n#include "object.h"',
        )
        marker = "void measure_init(void)"
        assert text.count(marker) == 1
        text = text.replace(
            marker, (HERE / "native-observations.c.inc").read_text() + "\n" + marker
        )
        text = text.replace(
            "Rand_quick = false;",
            'Rand_quick = false;\n    measure_alignment("seeded");',
        )
        text = text.replace(
            'state("start");',
            'state("start");\n        alignment_birth();\n        measure_alignment("world-ready");',
        )
        text = text.replace(
            'state("borg_start");',
            'state("borg_start");\n        measure_alignment("borg-ready");',
        )
        observer.write_text(text)
        header = source / "src/native-observer.h"
        header.write_text(
            header.read_text() + "\nvoid measure_alignment(const char *stage);\n"
        )
        f = source / "src/player-birth.c"
        t = f.read_text()
        t = '#include "native-observer.h"\n' + t
        for old, new in [
            (
                "\tget_ahw(p);",
                '\tmeasure_alignment("player-generate-before-ahw");\n\tget_ahw(p);\n\tmeasure_alignment("player-generate-after-ahw");',
            ),
            (
                "\t\tp->history = get_history(p->race->history);",
                '\t\tp->history = get_history(p->race->history);\n\t\tmeasure_alignment("player-generate-after-history");',
            ),
            (
                "\troll_hp();",
                '\tmeasure_alignment("accept-before-hp");\n\troll_hp();\n\tmeasure_alignment("accept-after-hp");',
            ),
            (
                "\tstore_reset();",
                '\tmeasure_alignment("stores-before");\n\tstore_reset();\n\tmeasure_alignment("stores-after");',
            ),
            (
                "\tplayer_outfit(player);",
                '\tplayer_outfit(player);\n\tmeasure_alignment("outfit-after");',
            ),
        ]:
            assert t.count(old) == 1, (old, t.count(old))
            t = t.replace(old, new)
        f.write_text(t)
        store = source / "src/store.c"
        text = store.read_text()
        begin = text.index("void store_reset(void)")
        end = text.index("struct init_module store_module", begin)
        part = text[begin:end]
        part = part.replace(
            "\t\tstore_shuffle(s);",
            '\t\tmeasure_alignment(format("store-%d-owner-before",i));\n\t\tstore_shuffle(s);\n\t\tmeasure_alignment(format("store-%d-owner-after",i));',
        )
        part = part.replace(
            "\t\tfor (j = 0; j < 10; j++)\n\t\t\tstore_maint(s);",
            '\t\tfor (j = 0; j < 10; j++) {\n\t\t\tmeasure_alignment(format("store-%d-maint-%d-before",i,j));\n\t\t\tstore_maint(s);\n\t\t\tmeasure_alignment(format("store-%d-maint-%d-after",i,j));\n\t\t}',
        )
        assert part != text[begin:end]
        store.write_text(
            '#include "native-observer.h"\n' + text[:begin] + part + text[end:]
        )
        gen = source / "src/gen-cave.c"
        text = gen.read_text()
        needle = "int num_lava = 3 + randint0(3);"
        assert text.count(needle) == 1
        text = text.replace(
            needle,
            'int num_lava = (measure_alignment("town-before"), 3 + randint0(3));',
        )
        old = (
            "for (n = 0; n < 3 + num_lava; n++)\n\t\t\tbuild_streamer(c, FEAT_LAVA, 0);"
        )
        assert text.count(old) == 1
        text = text.replace(
            old,
            'for (n = 0; n < 3 + num_lava; n++) {\nmeasure_alignment(format("town-stream-%d-before",n));\nbuild_streamer(c, FEAT_LAVA, 0);\nmeasure_alignment(format("town-stream-%d-after",n));\n}',
        )
        gen.write_text('#include "native-observer.h"\n' + text)

    r.named_play_bridge = instrument
    if a.action == "build":
        r.prepare(
            types.SimpleNamespace(
                ref=SOURCE, output=a.build, observe=True, recording=False, retry=False
            )
        )
        (a.build / "alignment-tools.json").write_text(
            json.dumps(
                {
                    "source": SOURCE,
                    "harness": PIN,
                    "x11_frontend": False,
                    "observer_extension_sha256": hashlib.sha256(
                        (HERE / "native-observations.c.inc").read_bytes()
                    ).hexdigest(),
                    "driver_sha256": hashlib.sha256(
                        pathlib.Path(__file__).read_bytes()
                    ).hexdigest(),
                },
                indent=2,
            )
            + "\n"
        )
    else:
        assert a.out is not None and a.seed is not None
        races = [
            "Human",
            "Half-Elf",
            "Elf",
            "Hobbit",
            "Gnome",
            "Dwarf",
            "Half-Orc",
            "Half-Troll",
            "Dunadan",
            "High-Elf",
            "Kobold",
        ]
        classes = [
            "Warrior",
            "Mage",
            "Druid",
            "Priest",
            "Necromancer",
            "Paladin",
            "Rogue",
            "Ranger",
            "Blackguard",
        ]
        letters = "abcdefgimnopqrstuvwxyz"
        base = r.birth_keys(False)
        marker = "key a\nkey a\nkey a\n"
        assert base.count(marker) == 1
        tap = lambda i: "key a\n" if i == 0 else f"key {letters[i]}\nkey {letters[i]}\n"
        assigned = base.replace(
            marker, tap(races.index(a.race)) + tap(classes.index(a.cls)) + "key a\n"
        )
        r.birth_keys = lambda random_birth=False: assigned
        r.run(
            types.SimpleNamespace(
                build=a.build,
                output=a.out,
                seed=a.seed,
                cap=a.cap,
                timeout=180,
                stall_timeout=30,
                no_saves=True,
                load=None,
                configuration=None,
                random_birth=False,
            )
        )


if __name__ == "__main__":
    main()
