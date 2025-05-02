import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemapPlugin from 'vite-plugin-sitemap';
import path from 'path';
import fs from 'fs-extra';

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  build: {
    // Your other build options...
    rollupOptions: {
      output: {
        // any custom output options here
      }
    }
  },
  plugins: [
    react(),
    sitemapPlugin({
      hostname: 'https://dev2th3core.site',
      dynamicRoutes: [
        '/', '/experience', '/projects', '/techstack', '/contact'
      ]
    }),
    {
      name: 'copy-index-to-404',
      writeBundle() {
        // Path to the built files
        const buildDir = path.resolve(__dirname, 'dist');
        const indexPath = path.join(buildDir, 'index.html');
        const fallbackPath = path.join(buildDir, '404.html');

        // Copy index.html to 404.html
        fs.copy(indexPath, fallbackPath)
          .then(() => {
            console.log('Successfully copied index.html to 404.html');
          })
          .catch((err) => {
            console.error('Error copying index.html to 404.html:', err);
          });
      }
    }
  ],
})

