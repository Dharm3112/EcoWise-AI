import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: 'index.html',
        classify: 'classify.html',
        chat: 'chat.html',
        tips: 'tips.html',
        history: 'history.html'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  define: {
    'import.meta.env.VITE_API_BASE': JSON.stringify('/api')
  }
});