import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Should be default m being explicit due to vite not found in deployment issues
  build: {
    outDir: 'dist', 
  },

  // to allow testing on local server
  server: {
    proxy: {
      "/api/": "http://localhost:8000",
      "/uploads/": "http://localhost:8000",
    },
  },
})
