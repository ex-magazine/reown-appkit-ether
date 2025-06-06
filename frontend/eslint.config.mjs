// import { dirname } from "path";
// import { fileURLToPath } from "url";
// import { FlatCompat } from "@eslint/eslintrc";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

// const eslintConfig = [
//   ...compat.extends("next/core-web-vitals", "next/typescript"),
// ];

// export default eslintConfig;
// import { defineConfig } from 'eslint/config';
// import path from 'node:path';
// import { fileURLToPath } from 'node:url';
// import js from '@eslint/js';
// import { FlatCompat } from '@eslint/eslintrc';

// @ts-check
import prettierConfigRecommended from 'eslint-plugin-prettier/recommended';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import { fixupConfigRules } from '@eslint/compat';
import ts from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const patchedConfig = fixupConfigRules([
  ...compat.extends('next/core-web-vitals'),
]);

const config = [
  ...patchedConfig,
  ...ts.configs.recommended,
  prettierConfigRecommended,
  { ignores: ['.next/*'] },
];

export default config;