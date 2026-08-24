import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  if (!env.VITE_API_BASE_URL) {
    throw new Error('VITE_API_BASE_URL is required')
  }

  return {
    plugins: [react(), tailwindcss()],
  }
})