import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-unused-modules
export default defineConfig({
    envDir: './env',
    plugins: [react(), tsconfigPaths(), svgrPlugin(), VitePWA({ registerType: 'autoUpdate' })],
    /* If proxy is needed
    server: {
      proxy: {
        "/api": "localhost:8080"
      }
    },
    */
    build: {
        sourcemap: true,
    },
});
