# Headless Borg death report: smoke-v1

Assigned: 18; recorded: 18. Every assignment is counted.

| Outcome | Count |
| --- | ---: |
| turn cap | 17 |
| death | 1 |

## Deaths

| Seed | Race | Class | Turn | Level | Max depth | Cause |
| --- | --- | --- | ---: | ---: | ---: | --- |
| 3010 | Human | Mage | 2666 | 1 | 1 | small kobold |

## By class

| Class | Assigned | Deaths | Caps | Other outcomes |
| --- | ---: | ---: | ---: | ---: |
| Warrior | 2 | 0 | 2 | 0 |
| Mage | 2 | 1 | 1 | 0 |
| Druid | 2 | 0 | 2 | 0 |
| Priest | 2 | 0 | 2 | 0 |
| Necromancer | 2 | 0 | 2 | 0 |
| Paladin | 2 | 0 | 2 | 0 |
| Rogue | 2 | 0 | 2 | 0 |
| Ranger | 2 | 0 | 2 | 0 |
| Blackguard | 2 | 0 | 2 | 0 |

Measured Borg settings (raw run records retain the full birth/options observations):

```json
{
  "borg.playsRisky": false,
  "borg.worshipsDamage": false,
  "borg.worshipsSpeed": false,
  "borg.worshipsHp": false,
  "borg.worshipsMana": false,
  "borg.worshipsAc": false,
  "borg.worshipsGold": false,
  "borg.selfScum": true,
  "borg.munchkinStart": false
}
```

## Measurement limits

Explicit C recommended point buy, no-selling, native-menu startup and GCC coordinate adapters; exact tick cap. Neo clock starts at0 (engine issue640 remains unresolved). These counts describe this cohort; they do not establish C parity or improvement over differently configured runs. Stalls, timeouts and harness/configuration failures remain separate outcomes.

## Source and bundle identities

- Engine: diegoami/neo-angband-tracker @ b4af703493d314aa35cb719604f06103aa4918f4; Borg: diegoami/neo-angband-borg-mod-tracker @ 43c8dec6e4667459375479850b405f5ede53a716; bundle SHA256: 2d9c563655a2c432bbdbb1a4e33efa850bb917626b1d20e4e935e0a1b061c777; adapters: c-native-menu-birth-and-borg-startup-v2, gcc14-native-rand-loc-y-before-x.

### Death 10-3010: Human Mage

Cause: small kobold. Seed 3010, turn 2666, level 1, maximum depth 1.

Reproduce after extracting the build artifact:

```sh
node tools/zoo/run.mjs --bundle build/bundle.mjs --seed 3010 --race 'Human' --class 'Mage' --birth-profile c-seeded-point-buy-v2 --turns 5000 --out rerun-10-3010
```

Last messages:

- {"turn":2480,"text":"The wild dog can move again."}
- {"turn":2636,"text":"The small kobold misses you."}
- {"turn":2646,"text":"The small kobold hits you."}
- {"turn":2646,"text":"    LOW HITPOINT WARNING     "}
- {"turn":2656,"text":"The small kobold hits you."}
- {"turn":2656,"text":"    LOW HITPOINT WARNING     "}
- {"turn":2666,"text":"The small kobold hits you."}
- {"turn":2666,"text":"You die."}

Last commands:

- {"accepted":true,"intent":{"command":{"code":"walk","dir":8},"kind":"command"},"turn":2590,"type":"intent"}
- {"accepted":true,"intent":{"command":{"code":"walk","dir":7},"kind":"command"},"turn":2600,"type":"intent"}
- {"accepted":true,"intent":{"command":{"code":"walk","dir":4},"kind":"command"},"turn":2610,"type":"intent"}
- {"accepted":true,"intent":{"command":{"code":"walk","dir":4},"kind":"command"},"turn":2620,"type":"intent"}
- {"accepted":true,"intent":{"command":{"code":"walk","dir":4},"kind":"command"},"turn":2630,"type":"intent"}
- {"accepted":true,"intent":{"command":{"code":"walk","dir":4},"kind":"command"},"turn":2640,"type":"intent"}
- {"accepted":true,"intent":{"command":{"code":"walk","dir":4},"kind":"command"},"turn":2650,"type":"intent"}
- {"accepted":true,"intent":{"command":{"code":"walk","dir":4},"kind":"command"},"turn":2660,"type":"intent"}

Last state observations:

- {"kind":"depth","turn":640,"decisions":67,"callbacks":67,"loopCalls":72,"depth":1,"maxDepth":1,"level":1,"maxLevel":1,"hp":10,"maxHp":10,"energy":0}
- {"kind":"depth","turn":640,"decisions":68,"callbacks":68,"loopCalls":74,"depth":0,"maxDepth":1,"level":1,"maxLevel":1,"hp":10,"maxHp":10,"energy":-100}
- {"kind":"depth","turn":820,"decisions":86,"callbacks":86,"loopCalls":93,"depth":1,"maxDepth":1,"level":1,"maxLevel":1,"hp":10,"maxHp":10,"energy":0}
- {"kind":"periodic","turn":970,"decisions":100,"callbacks":100,"loopCalls":108,"depth":1,"maxDepth":1,"level":1,"maxLevel":1,"hp":10,"maxHp":10,"energy":100}
- {"kind":"depth","turn":1250,"decisions":129,"callbacks":129,"loopCalls":137,"depth":0,"maxDepth":1,"level":1,"maxLevel":1,"hp":10,"maxHp":10,"energy":0}
- {"kind":"depth","turn":1420,"decisions":147,"callbacks":147,"loopCalls":156,"depth":1,"maxDepth":1,"level":1,"maxLevel":1,"hp":10,"maxHp":10,"energy":0}
- {"kind":"periodic","turn":2440,"decisions":200,"callbacks":200,"loopCalls":210,"depth":1,"maxDepth":1,"level":1,"maxLevel":1,"hp":5,"maxHp":10,"energy":100}
- {"kind":"stop","turn":2666,"decisions":223,"callbacks":223,"loopCalls":233,"depth":1,"maxDepth":1,"level":1,"maxLevel":1,"hp":-1,"maxHp":10,"energy":60}
