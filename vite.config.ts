import { defineConfig, loadEnv } from 'vite';
import type { Plugin } from 'vite';
import type { ServerResponse } from 'node:http';
import react from '@vitejs/plugin-react';

/** The Vercel-style helpers api/*.ts expect on `res`; Vite's dev server only gives us the raw Node response. */
type DevResponse = ServerResponse & { status(code: number): DevResponse; json(payload: unknown): void };

/**
 * Serves api/chat.ts (the Groq-powered AI assistant) during `npm run dev`, so the chat works locally
 * without `vercel dev`. In production Vercel runs the same file as a serverless function.
 */
function devChatApi(env: Record<string, string>): Plugin {
  return {
      name: 'vijay-dev-chat-api',
      apply: 'serve',
      configureServer(server) {
        for (const [key, value] of Object.entries(env)) process.env[key] ??= value;

        server.middlewares.use('/api/chat', async (req, res) => {
          const chunks: Buffer[] = [];
          for await (const chunk of req) chunks.push(chunk as Buffer);
          const response = res as DevResponse;
          const request = req as typeof req & { body?: unknown };
          try {
            request.body = JSON.parse(Buffer.concat(chunks).toString() || 'null');
          } catch {
            request.body = null;
          }
          response.status = (code) => {
            res.statusCode = code;
            return response;
          };
          response.json = (payload) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(payload));
          };
          try {
            const { default: handler } = await server.ssrLoadModule('/api/chat.ts');
            await handler(request, response);
          } catch (err) {
            server.config.logger.error(String(err instanceof Error ? err.stack : err));
            if (!res.writableEnded) response.status(500).json({ error: 'Server error.' });
          }
        });
      },
  };
  }
// https://vite.dev/config/
export default defineConfig(async ({ mode }) => {
  // Expose .env to Node *before* the SEO plugin (which reads VITE_SITE_URL etc.) is evaluated.
  const env = loadEnv(mode, process.cwd(), '');
  for (const [key, value] of Object.entries(env)) process.env[key] ??= value;
  const { default: seo } = await import('./vite-plugin-seo');

  return {
    plugins: [react(), seo(), devChatApi(env)],
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules')) {
              if (id.includes('three') || id.includes('@react-three')) {
                return 'vendor-three';
              }
              if (id.includes('gsap') || id.includes('framer-motion') || id.includes('@studio-freight/lenis')) {
                return 'vendor-animation';
              }
              if (id.includes('react-router-dom')) {
                return 'vendor-router';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
            }
          },
        },
      },
    },
  };
});
