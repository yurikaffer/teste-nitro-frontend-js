import { defineConfig } from 'vite';

//Proxy criado para evitar erro de CORS
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:8080',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'ECA1AB4CE8583613A2C759B445E98',
        },
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
