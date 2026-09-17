import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// A second build whose only job is to produce one file you can email.
// - iife rather than ES modules, so it runs from a file:// URL
// - no code splitting, no module preload
// - assetsInlineLimit high enough that the fonts become data URIs
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist-single',
    // Wider than the default 'modules' target. A file that is going to be
    // emailed around should not assume a browser from the last three years.
    target: ['es2017', 'safari12'],
    cssCodeSplit: false,
    modulePreload: false,
    assetsInlineLimit: 10_000_000,
    rollupOptions: {
      output: { format: 'iife', inlineDynamicImports: true, entryFileNames: 'app.js', assetFileNames: 'app.[ext]' }
    }
  }
})
