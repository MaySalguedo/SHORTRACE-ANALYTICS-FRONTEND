import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...svelte.configs['flat/recommended'],
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
	rules: {
      'no-undef': 'off'
    }
  },
  {
    ignores: [
      'dist/',
      'node_modules/',
      '*.config.js',
      '**/*.spec.ts'
    ],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn'
    }
  },{
	  files: ['src/**/*.spec.ts'],
	  rules: {
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-unused-vars': 'warn'
	  }
	},
	{
	  files: ['src/**/!(*.spec).ts'],
	  rules: {
	  '@typescript-eslint/no-explicit-any': 'error'
	}
  }
);