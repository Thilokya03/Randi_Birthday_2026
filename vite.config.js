import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Randi-s-Birthday-2026/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})