/* eslint-disable camelcase */
import { defineConfig, loadEnv } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';

import typescript from '@rollup/plugin-typescript';

import viteComponents, { VuetifyResolver } from 'vite-plugin-components';

export default defineConfig(({ mode }) => {
  const { VITE_PUBLIC_PATH } = loadEnv(mode, process.cwd());

  const publicDir = VITE_PUBLIC_PATH || '/vt/';

  return {
    base: mode === 'production' ? publicDir : '/',

    server: {
      port: 8081,
      proxy: {
        '^/v1': {
          target: 'http://localhost:8075',
          changeOrigin: true
        }
      }
    },

    plugins: [
      createVuePlugin(),
      viteComponents({
        customComponentResolvers: [
          VuetifyResolver()
        ]
      }),
      typescript({
        tsconfig: './tsconfig.json'
      })
    ],

    resolve: {
      alias: [
        {
          find: '@',
          replacement: require('path').resolve(__dirname, 'src')
        }
      ]
    },

    build: {
      chunkSizeWarningLimit: 600,
      cssCodeSplit: false
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: [
            '@import "./node_modules/vuetify/src/styles/styles.sass";', // original default variables from vuetify
            // vuetify variable overrides
            // '@import "@/scss/variables.scss";',
            ''
          ].join('\n')
        }
      }
    }
  };
});

/**
 * Add to webStorm.config.js
 * //
 * System.config({
 *  paths: {
 *    '@/*': './src/*',
 *  },
 * })
 */
