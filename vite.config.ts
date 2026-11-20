import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    // fluxos completos digitam muitos campos; 5s (padrão) fica curto em máquinas lentas
    testTimeout: 15000,
  },
})
