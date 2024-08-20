import vue from '@vitejs/plugin-vue'
import vike from 'vike/plugin'
import { UserConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url';

const config: UserConfig = {
  plugins: [vue({
    script: {
      propsDestructure: true,
    },
  }), vike()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./', import.meta.url)),
      '@utils': fileURLToPath(new URL('./utils', import.meta.url)),
      '@services': fileURLToPath(new URL('./services', import.meta.url)),
    },
  },
}

export default config
