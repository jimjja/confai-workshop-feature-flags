import js from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    files: ["**/*.{js,ts}"],
    plugins: { js, prettier: prettierPlugin },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.node },
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      "prettier/prettier": "error",
    },
  },
  tseslint.configs.recommended,
]);
