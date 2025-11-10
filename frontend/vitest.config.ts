import { loadEnvConfig } from '@next/env'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

loadEnvConfig(process.cwd())

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    testTimeout: 10000,
    clearMocks: true,
    isolate: true,
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
    },
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, './src'),
      },
      {
        find: '@mocks',
        replacement: resolve(__dirname, './__mocks__'),
      },
    ],
  },
})
