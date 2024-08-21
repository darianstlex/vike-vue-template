import { fileURLToPath, URL } from 'node:url';
import { telefunc } from 'telefunc/vite';
import md from 'unplugin-vue-markdown/vite';
import vike from 'vike/plugin';
import type { UserConfig } from 'vite';

import vue from '@vitejs/plugin-vue';

const config: UserConfig = {
  plugins: [
    vike(),
    telefunc(),
    vue({
      include: [/\.vue$/, /\.md$/],
      script: {
        propsDestructure: true,
      },
    }),
    md({}),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./', import.meta.url)),
      '@utils': fileURLToPath(new URL('./utils', import.meta.url)),
      '@services': fileURLToPath(new URL('./services', import.meta.url)),
    },
  },
};

export default config;
