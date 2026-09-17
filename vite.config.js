import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Relative base so a built copy can be served from any folder on the machine.
  base: './',
  build: { outDir: 'dist', assetsDir: 'assets' },
  test: { environment: 'node' }
})
