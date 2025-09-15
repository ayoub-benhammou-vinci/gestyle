// eslint-disable-next-line spaced-comment
/// <reference types="vitest/config" />

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';

export default defineConfig(({ mode }) => {
  // charge les variables .env
  const env = loadEnv(mode, process.cwd(), '');

  return {
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './src/setupTests.ts',
      deps: {
        inline: [
          '@mui/material',
          '@mui/material/styles',
          '@mui/system',
          '@mui/icons-material',
          '@mui/x-date-pickers',
        ],
      },
    },

    plugins: [
      react(),
      checker({
        typescript: true,
      }),
    ],

    server: {
      proxy: {
        '/api': {
          target: env.VITE_BACKEND_URL, // depuis .env
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
});
