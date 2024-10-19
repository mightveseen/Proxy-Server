import globals from "globals";
import pluginJs from "@eslint/js";
import configPrettier from 'eslint-config-prettier';
import configAirbnb from 'eslint-config-airbnb-base';
import pluginNode from 'eslint-plugin-node';
import pluginImport from 'eslint-plugin-import';
import pluginPromise from 'eslint-plugin-promise';
import pluginSecurity from 'eslint-plugin-security';
import tseslint from "typescript-eslint";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"]
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  pluginJs.configs.recommended,
  pluginSecurity.configs.recommended,
  ...tseslint.configs.recommended,
  configPrettier,
  {
    plugins: {
      node: pluginNode,
      import: pluginImport,
      promise: pluginPromise
    },
    rules: {
      ...configAirbnb.rules,
      "@typescript-eslint/no-unused-vars": "off"
    }
  }
];