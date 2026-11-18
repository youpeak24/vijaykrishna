/**
 * Single reader for environment configuration.
 *
 * - Browser / Vite: values come from `import.meta.env` (only VITE_* variables are exposed, so
 *   server secrets such as GROQ_API_KEY can never leak into the client bundle).
 * - Node (vite.config.ts + the SEO build plugin): values come from `process.env`.
 *
 * Every key has a fallback, so the site still builds and runs with an empty or missing .env.
 */
type Env = Record<string, string | undefined>;

const viteEnv = (import.meta as unknown as { env?: Env }).env;
const nodeEnv = (globalThis as unknown as { process?: { env?: Env } }).process?.env;

export const getEnv = (key: string, fallback = ''): string => {
  const value = (viteEnv?.[key] ?? nodeEnv?.[key] ?? '').trim();
  return value || fallback;
};
