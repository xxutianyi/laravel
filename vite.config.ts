import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.tsx'],
            refresh: true,
        }),
        svgr(),
        react(),
        tailwindcss(),
        ViteImageOptimizer({
            logStats: false,
        }),
    ],
    build: {
        target: 'es2015',
        cssCodeSplit: true,
        chunkSizeWarningLimit: 1500,
        rollupOptions: {
            output: {
                manualChunks: {
                    'ant-design': ['antd'],
                    'ant-design-icons': ['@ant-design/icons'],
                    'ant-design-addons': ['@ant-design/pro-components'],
                },
            },
        },
    },
});
