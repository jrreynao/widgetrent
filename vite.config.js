import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://widgetrent.onrender.com',
        changeOrigin: true,
        // No rewrite, ya que la API espera /api/send-reserva
      }
    }
  },
  build: {
    rollupOptions: {
      input: 'src/widget.jsx',
      output: {
        entryFileNames: 'widget.js',
        chunkFileNames: 'widget.[name].js',
        assetFileNames: ({name}) => {
          if (name && name.endsWith('.css')) return 'widget.css';
          return 'assets/[name][extname]';
        }
      }
    }
  },
  optimizeDeps: {}
});