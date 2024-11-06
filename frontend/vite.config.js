import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // to allow testing on local server
  server: {
    proxy: {
      "/api/": "http://localhost:8000",
      "/uploads/": "http://localhost:8000",
    },
  },
})
