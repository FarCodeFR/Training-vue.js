// eslint.config.js
import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import tsEslint from "typescript-eslint"; 

export default [
  pluginJs.configs.recommended,
  ...tsEslint.configs.recommended, 
  {
    files: ["**/*.vue"],
    plugins: {
      vue: pluginVue,
    },
    processor: pluginVue.processors[".vue"], 
    rules: {
      ...pluginVue.configs["vue3-essential"].rules, 
    },
    languageOptions: {
      parser: pluginVue.configs.base.parser, 
      parserOptions: {
        parser: tsEslint.parser,
        ecmaVersion: "latest",
        sourceType: "module",
        jsxPragma: "Vue",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
];