import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from "unocss/vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), UnoCSS()],
})
