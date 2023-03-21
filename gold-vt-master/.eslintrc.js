module.exports = {
  root: true,

  env: {
    node: true,
    browser: true
  },

  parser: 'vue-eslint-parser',

  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },

  plugins: ['vue'],

  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src']
        ],
        extensions: ['.js', '.ts', '.jsx', '.vue', '.json']
      }
    }
  },

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/base',
    'plugin:unicorn/recommended',
    'plugin:promise/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:vue/recommended',
    'standard'
  ],

  rules: {
    semi: [2, 'always'],
    'no-console': 'off',
    // Import plugin rules
    'import/no-unresolved': 0,
    'import/namespace': 0,
    'import/no-duplicates': 0,
    'import/default': 0,
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,

    // Unicorn plugin rules
    'unicorn/no-null': 'off',
    'unicorn/catch-error-name': ['error', { name: 'err' }],
    'unicorn/no-abusive-eslint-disable': 'off',
    'unicorn/prevent-abbreviations': 0,
    'unicorn/no-array-reduce': 0,
    'unicorn/filename-case': ['warn', {
      cases: {
        camelCase: true,
        pascalCase: true
      }
    }],
    'unicorn/import-style': 0,
    'unicorn/prefer-ternary': 0,
    'unicorn/no-array-for-each': 0,
    'unicorn/prefer-node-remove': 0,
    'unicorn/prefer-node-append': 0,
    'unicorn/prefer-dom-node-remove': 0,
    'unicorn/prefer-dom-node-append': 0,
    'unicorn/no-array-callback-reference': 0,
    'unicorn/no-fn-reference-in-iterator': 0,

    // Vue plugin rules
    'vue/no-v-html': 0,
    'vue/eqeqeq': 'error',
    'vue/comment-directive': 0,
    'vue/prop-name-casing': ['error', 'camelCase'],
    'vue/match-component-file-name': ['error', {
      extensions: ['vue'],
      shouldMatchCase: true
    }],
    'vue/html-closing-bracket-newline': ['error', {
      singleline: 'never',
      multiline: 'always'
    }],
    'vue/html-closing-bracket-spacing': ['error', {
      startTag: 'never',
      endTag: 'never',
      selfClosingTag: 'always'
    }],
    'vue/component-name-in-template-casing': ['error', 'kebab-case', {
      registeredComponentsOnly: false,
      ignores: []
    }],
    'vue/no-unused-components': ['error', {
      ignoreWhenBindingPresent: true
    }],
    'vue/valid-v-slot': ['error', {
      allowModifiers: true
    }],
    'vue/component-definition-name-casing': ['error', 'kebab-case'],

    // Typescript plugin rules
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/ban-types': 'error',
    '@typescript-eslint/class-name-casing': 'error',
    '@typescript-eslint/consistent-type-assertions': 'error',
    '@typescript-eslint/no-array-constructor': 'error',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-empty-interface': 'error',
    /* '@typescript-eslint/no-inferrable-types': 'error', */
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-namespace': 'error',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/no-this-alias': 'error',
    '@typescript-eslint/no-use-before-define': 'error',
    '@typescript-eslint/prefer-namespace-keyword': 'error',
    '@typescript-eslint/triple-slash-reference': 'error',
    '@typescript-eslint/type-annotation-spacing': 'error',
    '@typescript-eslint/no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
      ignoreRestSiblings: true
    }]
  },

  overrides: [
    {
      files: ['*.ts', '*.vue'],
      rules: {
        // Checked by @typescript-eslint/no-unused-vars
        'no-unused-vars': 0,
        // Checked by @typescript-eslint/no-use-before-define
        'no-use-before-define': 0,

        // Checked by Typescript
        'getter-return': 0,
        // Checked by Typescript
        'no-dupe-args': 0,
        // Checked by Typescript
        'no-dupe-keys': 0,
        // Checked by Typescript
        'no-unreachable': 0,
        // Checked by Typescript
        'valid-typeof': 0,
        // Checked by Typescript
        'no-const-assign': 0,
        // Checked by Typescript
        'no-new-symbol': 0,
        // Checked by Typescript
        'no-this-before-super': 0,

        // This is checked by Typescript using the option `strictNullChecks`.
        'no-undef': 0,

        // This is already checked by Typescript.
        'no-dupe-class-members': 0,
        // This is already checked by Typescript.
        'no-redeclare': 0
      }
    }
  ]
};
