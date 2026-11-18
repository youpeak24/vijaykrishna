/**
 * Build-time SEO plugin.
 *
 * A client-rendered SPA ships one empty index.html, so crawlers (and every social/AI bot that
 * does not execute JavaScript) see the same title/description/canonical on every URL and no
 * content at all. This plugin fixes that without a headless browser:
 *
 *  1. Injects the route-specific <head> (title, description, canonical, Open Graph, Twitter,
 *     JSON-LD) and a semantic static content fallback into index.html for the home route.
 *  2. After the build, emits `<route>/index.html` for every route, `404.html`, and a
 *     data-driven `sitemap.xml`. React replaces the static fallback on mount.
 *
 * All data comes from src/seo/site.ts, the same module the runtime uses.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import type { Plugin, ResolvedConfig } from 'vite';
import {
  ROUTES,
  NOT_FOUND_ROUTE,
  SITE,
  abs,
  buildHead,
  buildSitemap,
  globalGraph,
  type RouteSeo,
} from './src/seo/site';
import { filmmaker } from './src/data/filmmaker';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const attrs = (o: Record<string, string>) =>
  Object.entries(o)
    .map(([k, v]) => `${k}="${esc(v)}"`)
    .join(' ');

const renderHead = (r: RouteSeo): string => {
  const { title, tags } = buildHead(r);
  const out = [`<title>${esc(title)}</title>`];
  for (const t of tags) {
    if (t.tag === 'script') {
      // "<" → \u003c keeps the JSON valid while making "</script>" injection impossible.
      out.push(`<script data-seo="${t.key}" ${attrs(t.attrs)}>${(t.text ?? '').replace(/</g, '\\u003c')}</script>`);
    } else {
      out.push(`<${t.tag} data-seo="${t.key}" ${attrs(t.attrs)} />`);
    }
  }
  return out.map((l) => `    ${l}`).join('\n');
};

const NAV = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/filmography', 'Filmography'],
  ['/production', 'Production'],
  ['/creative-vision', 'Creative Vision'],
  ['/gallery', 'Gallery'],
  ['/press-awards', 'Press & Awards'],
  ['/contact', 'Contact'],
] as const;

/**
 * Semantic, crawlable fallback shown until React mounts (and permanently to non-JS crawlers).
 * Same content users get, just unstyled by the app — never hidden text.
 */
const renderBody = (r: RouteSeo): string => {
  // display:none → real visitors never see an unstyled flash while JS loads (the page background is
  // already cinema-black from the CSS). The markup stays in the HTML for crawlers that don't run JS,
  // and the <noscript> rule below un-hides it for visitors who have JS disabled.
  const style =
    'display:none;max-width:880px;margin:0 auto;padding:48px 24px;color:#F5F0E8;font-family:Georgia,\'Times New Roman\',serif;line-height:1.7';
  const link = 'color:#E9B96E;text-decoration:none';
  const lists = (r.body.list ?? [])
    .map(
      (l) =>
        `<section><h2 style="font-weight:500">${esc(l.title)}</h2><ul>${l.items
          .map((i) => `<li>${i.href ? `<a href="${esc(i.href)}" style="${link}">${esc(i.text)}</a>` : esc(i.text)}</li>`)
          .join('')}</ul></section>`,
    )
    .join('');
  const social = Object.entries(filmmaker.social)
    .map(([name, href]) => `<a href="${esc(href)}" rel="me noopener" style="${link}">${esc(name)}</a>`)
    .join(' · ');

  return [
    '<noscript><style>[data-seo-static]{display:block!important}</style></noscript>',
    `<main data-seo-static style="${style}">`,
    `<header><p><a href="/" style="${link}">${esc(SITE.name)}</a> — ${esc(filmmaker.roles.join(' · ').toLowerCase())}</p>`,
    `<nav aria-label="Primary">${NAV.map(([h, n]) => `<a href="${h}" style="${link};margin-right:16px">${esc(n)}</a>`).join('')}</nav></header>`,
    `<h1 style="font-weight:500;font-size:2.2rem;line-height:1.2">${esc(r.heading)}</h1>`,
    ...r.body.paragraphs.map((p) => `<p>${esc(p)}</p>`),
    lists,
    `<footer><p>${esc(SITE.company)} · ${esc(filmmaker.location)} · <a href="mailto:${esc(filmmaker.email)}" style="${link}">${esc(filmmaker.email)}</a></p><p>${social}</p></footer>`,
    '</main>',
  ].join('');
};

const HEAD_RE = /<!--seo:head:start-->[\s\S]*?<!--seo:head:end-->/;
const BODY_RE = /<!--seo:body:start-->[\s\S]*?<!--seo:body:end-->/;
const TITLE_RE = /<title>[\s\S]*?<\/title>\s*/;

const compose = (template: string, r: RouteSeo): string =>
  template
    .replace(HEAD_RE, () => `<!--seo:head:start-->\n${renderHead(r)}\n    <!--seo:head:end-->`)
    .replace(BODY_RE, () => `<!--seo:body:start-->${renderBody(r)}<!--seo:body:end-->`);

export default function seoPlugin(): Plugin {
  let config: ResolvedConfig;
  const home = ROUTES[0];

  return {
    name: 'vk-seo',

    configResolved(c) {
      config = c;
    },

    // Dev + build: inject the home route so index.html is never empty.
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html
          .replace(TITLE_RE, '')
          .replace(
            '<!--seo:global-->',
            () =>
              `<script id="jsonld-global" type="application/ld+json">${JSON.stringify(globalGraph()).replace(/</g, '\\u003c')}</script>`,
          )
          .replace('<!--seo:head-->', () => `<!--seo:head:start-->\n${renderHead(home)}\n    <!--seo:head:end-->`)
          .replace('<!--seo:body-->', () => `<!--seo:body:start-->${renderBody(home)}<!--seo:body:end-->`);
      },
    },

    configureServer(server) {
      server.middlewares.use('/sitemap.xml', (_req, res) => {
        res.setHeader('Content-Type', 'application/xml; charset=utf-8');
        res.end(buildSitemap());
      });
    },

    closeBundle: {
      order: 'post',
      handler() {
        if (config.command !== 'build') return;
        const outDir = join(config.root, config.build.outDir);
        const template = readFileSync(join(outDir, 'index.html'), 'utf8');

        if (!HEAD_RE.test(template) || !BODY_RE.test(template)) {
          throw new Error('[vk-seo] SEO markers missing from built index.html');
        }

        const write = (rel: string, content: string) => {
          const file = join(outDir, rel);
          mkdirSync(dirname(file), { recursive: true });
          writeFileSync(file, content);
        };

        for (const r of ROUTES) {
          write(r.path === '/' ? 'index.html' : `${r.path.slice(1)}/index.html`, compose(template, r));
        }
        write('404.html', compose(template, NOT_FOUND_ROUTE));
        write('sitemap.xml', buildSitemap());

        config.logger.info(`[vk-seo] pre-rendered ${ROUTES.length} routes + 404.html + sitemap.xml for ${abs('/')}`);
      },
    },
  };
}
