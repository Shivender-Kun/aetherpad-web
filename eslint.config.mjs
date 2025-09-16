import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import globals from "globals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      boundaries: await import("eslint-plugin-boundaries"),
    },
    settings: {
      "boundaries/elements": [
        { type: "app", pattern: "src/app/**" },
        {
          type: "shared",
          pattern: "src/{components,constants,lib,services,store,styles}/**",
        },
      ],
    },
    rules: {
      "boundaries/element-types": [
        2,
        {
          default: "disallow",
          rules: [
            // ✅ Allow anything to import shared
            { from: "shared", allow: ["shared"] },
            { from: "app", allow: ["shared"] },

            // ❌ Disallow shared importing feature or app
            { from: "shared", disallow: [, "app"] },
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
