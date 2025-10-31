// eslint.config.js
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import eslint from '@eslint/js';

// --- Setup para Compatibilidade (Necessário para o Airbnb) ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Inicializa o 'FlatCompat' para "traduzir" configs legadas
const compat = new FlatCompat({
    baseDirectory: __dirname,
    resolvePluginsRelativeTo: __dirname,
});
// --- Fim do Setup de Compatibilidade ---

export default [
    // 1. Arquivos Ignorados (Substitui .eslintignore)
    {
        ignores: [
            'node_modules/',
            'dist/',
            'drizzle/', // Pasta de migrações
            'sqlite.db',
            'sqlite.db-journal',
            'bun.lockb',
            '*.log',
            'eslint.config.js', // Ignora o próprio arquivo de config
        ],
    },

    // 2. Configuração Padrão do ESLint
    eslint.configs.recommended,

    // 3. Configurações do Airbnb (Tratadas pelo FlatCompat)
    // O spread '...' é necessário pois compat.extends() retorna um array
    ...compat.extends('airbnb-base'),
    ...compat.extends('airbnb-typescript/base'),

    // 4. Configuração Específica do TypeScript (Sobrescreve o Airbnb)
   {
        files: ['**/*.ts', '**/*.tsx'], // Aplicar apenas a arquivos TS
        languageOptions: {
            parserOptions: {
                project: true, // Auto-detecta tsconfig.json
                tsconfigRootDir: __dirname,
            },
        },
        rules: {
            // Suas regras customizadas do TS (sobrescrevendo Airbnb/TS)
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        }
    },

    // 6. Configurações Globais do Projeto (Era o Bloco 5)
    // (O resto do seu arquivo)
    {
        languageOptions: {
            globals: {
                ...globals.node,
                Bun: 'readonly',
            },
        },
        rules: {
            // ... (Suas regras 'import/...' existentes)
            'import/no-extraneous-dependencies': [
                'error', 
                { devDependencies: ['migrate.ts', 'drizzle.config.ts'] }
            ],
            'import/prefer-default-export': 'off',

            // ADICIONE ESTA CORREÇÃO AQUI:
            // --- CORREÇÃO AIRBNB / ESLINT v9 ---
            // 1. Desliga a regra antiga/quebrada que o Airbnb tenta usar
            "@typescript-eslint/brace-style": "off",
            
            // 2. Habilita a regra nova (que o typescript-eslint assume) 
            //    com o estilo do Airbnb ("1tbs" = one true brace style)
            "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
            "@typescript-eslint/comma-dangle": "off",
            
            // 2. Habilita a regra nova com o estilo do Airbnb
            "comma-dangle": ["error", "always-multiline"],

            "@typescript-eslint/comma-spacing": "off",
            
            // 2. Habilita a regra nova com o estilo do Airbnb (sem espaço antes, com espaço depois)
            "comma-spacing": ["error", { "before": false, "after": true }],

            "@typescript-eslint/func-call-spacing": "off",
            
            // 2. Habilita a regra nova com o estilo do Airbnb (sem espaços)
            "func-call-spacing": ["error", "never"],

            "@typescript-eslint/indent": "off",
            
            // 2. Habilita a regra nova com o estilo do Airbnb (2 espaços)
            "indent": ["error", 2],

            "@typescript-eslint/keyword-spacing": "off",
            
            // 2. Habilita a regra nova com o estilo do Airbnb (espaços antes e depois)
            "keyword-spacing": ["error", { "before": true, "after": true }],

            "@typescript-eslint/lines-between-class-members": "off",
            
            // 2. Habilita a regra nova com o estilo do Airbnb
            "lines-between-class-members": ["error", "always", { "exceptAfterSingleLine": false }],

            "@typescript-eslint/no-extra-semi": "off",
            
            // 2. Habilita a regra nova com o estilo do Airbnb
            "no-extra-semi": "error",

            "@typescript-eslint/space-before-blocks": "off",
            
            // 2. Habilita a regra nova com o estilo do Airbnb (sempre)
            "space-before-blocks": ["error", "always"],

            "@typescript-eslint/no-throw-literal": "off",
            
            // 2. Habilita a regra nova com o estilo do Airbnb (proibir literais)
            "no-throw-literal": "error",

            "@typescript-eslint/quotes": "off",
            
            // 2. Habilita a regra nova com o estilo do Airbnb (aspas simples)
            "quotes": ["error", "single", { "avoidEscape": true }],

            "@typescript-eslint/semi": "off",
            
            // 2. Habilita a regra nova com o estilo do Airbnb (sempre)
            "semi": ["error", "always"],

            "@typescript-eslint/space-before-function-paren": "off",
            
            // 2. Habilita a regra nova com o estilo do Airbnb
            "space-before-function-paren": ["error", {
              "anonymous": "never",
              "named": "never",
              "asyncArrow": "always"
            }],

            "@typescript-eslint/space-infix-ops": "off",
            
            // 2. Habilita a regra nova com o estilo do Airbnb (exigir espaços)
            "space-infix-ops": "error",

            "@typescript-eslint/object-curly-spacing": "off",
            
            // 2. Habilita a regra nova com o estilo do Airbnb (sempre)
            "object-curly-spacing": ["error", "always"],

            "no-param-reassign": ["error", {
          "props": true,
          "ignorePropertyModificationsFor": ["set"]
        }]
            // --- FIM DA CORREÇÃO ---
        },
    }
];