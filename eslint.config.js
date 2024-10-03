import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';

export default [
	{ files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
	{ languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
	{ languageOptions: { globals: { ...globals.browser, ...globals.node } } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	pluginReactConfig,
	{
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'react/prop-types': 0,
			'react/react-in-jsx-scope': 'off',
			'@typescript-eslint/ban-ts-comment': 'off',

			'no-console': 'error',
			'arrow-body-style': [0],
			camelcase: [0],
			'class-methods-use-this': 'off',
			'comma-dangle': [
				'error',
				{
					arrays: 'always-multiline',
					objects: 'always-multiline',
					imports: 'always-multiline',
					exports: 'always-multiline',
					functions: 'ignore',
				},
			],
			'consistent-return': [0],
			'default-param-last': [0],
			'function-paren-newline': 'off',
			'generator-star-spacing': [0],
			'global-require': [1],
			'import/extensions': [0],
			'import/no-extraneous-dependencies': [0],
			'import/no-unresolved': [0],
			'import/prefer-default-export': [0],
			'linebreak-style': 0,
			'max-classes-per-file': 'off',
			'object-curly-newline': [0],
			'no-bitwise': [0],
			'no-cond-assign': [0],
			'no-dupe-else-if': 'warn',
			'no-else-return': [0],
			'no-loss-of-precision': 'warn',
			'no-nested-ternary': 'warn',
			'no-param-reassign': 'warn',
			'no-promise-executor-return': 'warn',
			'no-restricted-exports': 'warn',
			'no-restricted-globals': [
				'error',
				{
					name: 'event',
					message: 'Use local parameter instead.',
				},
				{
					name: 'location',
					message:
						'Use the react-router location object instead of window.location',
				},
				{
					name: 'history',
					message: 'Use the router history object instead of window.history',
				},
			],
			'no-restricted-syntax': [0],
			'no-underscore-dangle': [0],
			'no-unsafe-optional-chaining': 'warn',
			'no-use-before-define': [0],
			'prefer-arrow-callback': 'warn',
			'prefer-object-spread': 'off',
			'prefer-regex-literals': 'warn',
			'react/destructuring-assignment': [0],
			'react/forbid-prop-types': [0],
			'react/function-component-definition': [0],
			'react/jsx-curly-brace-presence': 'warn',
			'react/jsx-curly-newline': [0],
			'react/jsx-filename-extension': [
				1,
				{ extensions: ['.js', '.jsx', '.tsx'] },
			],
			'react/jsx-fragments': [0],
			'react/jsx-indent': [0],
			'react/jsx-no-bind': [0],
			'react/jsx-no-constructed-context-values': 'warn',
			'react/jsx-one-expression-per-line': [0],
			'react/jsx-props-no-spreading': [0],
			'react/jsx-wrap-multilines': [
				'error',
				{
					declaration: 'parens-new-line',
					assignment: 'parens-new-line',
					return: 'parens-new-line',
					arrow: 'parens-new-line',
					condition: 'parens-new-line',
					logical: 'parens-new-line',
					prop: 'ignore',
				},
			],
			'react/no-access-state-in-setstate': [0],
			'react/no-array-index-key': 'warn',
			'react/no-children-prop': [0],
			'react/no-typos': [0],
			'react/no-unknown-property': ['warn', { ignore: ['styleName'] }],
			'react/no-unused-class-component-methods': 'warn',
			'react/jsx-no-useless-fragment': 'warn',
			'react/no-unstable-nested-components': 'warn',
			'react/prefer-stateless-function': [0],
			'react/require-default-props': [
				'warn',
				{ ignoreFunctionalComponents: true },
			],
			'react/sort-comp': [0],
			'react/state-in-constructor': [0],
			'react/static-property-placement': [0],
			'require-yield': [1],
			'no-plusplus': 'off',
		},
	},
];
