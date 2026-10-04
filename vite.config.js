import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Relative base so the same build works on GitHub Pages, Vercel, Netlify or
  // any static host without path tweaks.
  base: './',
  plugins: [react(), tailwindcss()],
})