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
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
      '@services': fileURLToPath(new URL('./src/services', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
    },
  },
};

export default config;
