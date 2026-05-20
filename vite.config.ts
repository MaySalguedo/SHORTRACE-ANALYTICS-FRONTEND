import { defineConfig } from 'vite'
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
    coverage: {
      provider: 'v8',
      reporter: ['text'],
	  include: ['src/**/*.{ts,svelte}'],
	  setupFiles: ['./vitest.setup.ts'],
	  alias: [
		{ find: /^svelte$/, replacement: 'svelte/src/index.js' }
	  ],
      lines: 90,
      functions: 90,
      branches: 90,
      statements: 90,
      exclude: [
        'src/main.ts',
        'src/**/*.model.ts',
        'src/vite-env.d.ts',
        '**/*.config.*'
      ]
    }
  }
})