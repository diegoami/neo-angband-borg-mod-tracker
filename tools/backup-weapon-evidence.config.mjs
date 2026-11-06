// Manual evidence only; intentionally excluded from the required896-case suite.
import { mergeConfig, defineConfig } from "vitest/config";
import base from "../vitest.config.mjs";
export default mergeConfig(base, defineConfig({ test: { include: ["evidence/backup-weapon/public-case.probe.ts"] } }));
