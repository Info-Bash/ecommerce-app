import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', { target: '19' }]],
      },
    }),
  ],

  server: {
    proxy: {
      '/api': {
        target: 'https://ecommerce-app-ex20.onrender.com',
        changeOrigin: true,
        secure: true,
      },

      '/images': {
        target: 'https://ecommerce-app-ex20.onrender.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },

  build: {
    outDir: 'dist',
  },
})