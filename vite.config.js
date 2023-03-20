import { defineConfig } from 'vite'

export default defineConfig({
    appType: 'mpa',
    root: 'src',
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        minify: true
    }
})