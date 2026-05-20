import { defineConfig } from 'vitest/config'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@core': fileURLToPath(new URL('./src/core', import.meta.url)),
      '@api': fileURLToPath(new URL('./src/core/api', import.meta.url)),
      '@services': fileURLToPath(new URL('./src/core/services', import.meta.url)),
      '@models': fileURLToPath(new URL('./src/core/models', import.meta.url)),
      '@lib': fileURLToPath(new URL('./src/lib', import.meta.url))
    },
	conditions: ['browser']
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text'],
      include: ['src/**/*.{ts,svelte}'],
      exclude: [
        'src/main.ts',
        'src/**/*.model.ts',
        'src/vite-env.d.ts',
        '**/*.config.*'
      ],
	  thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80
      }
    }
  }
})