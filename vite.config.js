import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
     tailwindcss(),
     react()
  ],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'gsap': ['gsap'],
          'ogl': ['ogl']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    reportCompressedSize: false
  },
  server: {
    middlewareMode: false,
    preTransformRequests: true
  }
})
