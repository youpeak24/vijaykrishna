/**
 * Single source of truth for all SEO output.
 *
 * This module is framework-free (no React / DOM) on purpose: it is imported by
 *  - the runtime <SEO /> component (keeps <head> correct on client navigation), and
 *  - the build-time Vite plugin (pre-renders per-route HTML, sitemap.xml, 404.html).
 * Both therefore always agree.
 */
import { getEnv } from '../config/env';
import { films, type Film } from '../data/films';
import { filmmaker } from '../data/filmmaker';
import { awards } from '../data/awards';
import { press } from '../data/press';
import { gallery } from '../data/gallery';

// ─── Site constants ──────────────────────────────────────────────────────────
export const SITE = {
  url: getEnv('VITE_SITE_URL', 'https://vijaykrishnan.in').replace(/\/+$/, ''),
  name: 'S Vijay Krishnan',
  title: 'S Vijay Krishnan — Tamil Film Director & Producer',
  company: 'VK Productions',
  lang: 'en-IN',
  locale: 'en_IN',
  themeColor: '#08080B',
  ogImage: '/og-image.jpg',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'S Vijay Krishnan — Tamil film director and producer, Chennai',
  /**
   * Bump when site content meaningfully changes. Used as <lastmod> in sitemap.xml.
   * (Google ignores lastmod when it is always "today", so keep this honest.)
   */
  lastModified: '2026-11-18',
} as const;

export const abs = (path: string): string => {
  if (/^https?:\/\//i.test(path)) return path;
  if (path === '/' || path === '') return `${SITE.url}/`;
  return `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`;
};

const ID = {
  person: `${SITE.url}/#person`,
  website: `${SITE.url}/#website`,
  org: `${SITE.url}/#organization`,
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
const titleCase = (s: string) =>
  s.toLowerCase().replace(/(^|\s)(\S)/g, (_, a: string, b: string) => a + b.toUpperCase());

export const filmTitle = (f: Film) => titleCase(f.title);

const clip = (s: string, max = 158): string => {
  const t = s.replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:\s-]+$/, '')}…`;
};

/** Unsplash images accept size params; ask for the 1.91:1 OG ratio. */
const ogSized = (url: string) =>
  url.includes('images.unsplash.com')
    ? url.replace(/w=\d+/, 'w=1200').replace(/&q=\d+/, '&h=630&q=80')
    : url;

const isoDuration = (runtime: string): string | undefined => {
  const m = runtime.match(/(\d+)\s*min/i);
  return m ? `PT${m[1]}M` : undefined;
};

const typeLabel: Record<Film['type'], string> = {
  feature: 'Feature Film',
  short: 'Short Film',
  commercial: 'Commercial',
};

// ─── Route model ─────────────────────────────────────────────────────────────
export interface Crumb {
  name: string;
  path: string;
}

export interface RouteSeo {
  /** Canonical path, no trailing slash (except "/"). */
  path: string;
  title: string;
  description: string;
  /** Visible H1 equivalent used for the static fallback content. */
  heading: string;
  ogType: 'website' | 'profile' | 'video.movie';
  image: string;
  imageAlt: string;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: number;
  noindex?: boolean;
  breadcrumbs: Crumb[];
  /** Page-specific JSON-LD nodes (the global Person/WebSite/Organization graph is added separately). */
  schema: Record<string, unknown>[];
  /** Plain-text/HTML-safe static content for crawlers that don't run JavaScript. */
  body: { paragraphs: string[]; list?: { title: string; items: { text: string; href?: string }[] }[] };
}

const home: Crumb = { name: 'Home', path: '/' };

const ownerRef = { '@id': ID.person };

const filmNode = (f: Film): Record<string, unknown> => {
  const url = abs(`/films/${f.slug}`);
  const directedByOwner = f.credits.director === titleCase(filmmaker.name);
  const node: Record<string, unknown> = {
    '@type': 'Movie',
    '@id': `${url}#movie`,
    url,
    name: filmTitle(f),
    description: f.synopsis,
    slogan: f.tagline,
    inLanguage: f.language === 'Tamil' ? 'ta' : f.language,
    genre: f.genre,
    image: ogSized(f.backdrop),
    thumbnailUrl: f.poster,
    countryOfOrigin: { '@type': 'Country', name: 'India' },
    productionCompany: { '@id': ID.org },
    director: f.credits.director
      ? directedByOwner
        ? ownerRef
        : { '@type': 'Person', name: f.credits.director }
      : undefined,
    producer: f.role.includes('Producer') ? ownerRef : undefined,
    actor: f.cast.map((c) => ({ '@type': 'Person', name: c.actor.replace(/\s*\(.*\)$/, '') })),
    musicBy: f.credits.music ? { '@type': 'Person', name: f.credits.music.replace(/^Original Score by /, '') } : undefined,
    award: f.awards.filter((a) => /^(Winner|Grand Jury|Special Jury)/i.test(a) && !/proposed/i.test(a)),
    datePublished: f.status === 'released' ? f.year : undefined,
    dateCreated: f.year,
    duration: isoDuration(f.runtime),
  };
  Object.keys(node).forEach((k) => node[k] === undefined && delete node[k]);
  return node;
};

const filmRoute = (f: Film): RouteSeo => {
  const name = filmTitle(f);
  const path = `/films/${f.slug}`;
  const verb = f.role.includes('Director') ? 'Directed' : 'Produced';
  return {
    path,
    title: `${name} (${f.year}) — ${f.language} ${typeLabel[f.type]} | ${SITE.name}`,
    description: (() => {
      const lead = `${name} (${f.year}), a ${f.language} ${typeLabel[f.type].toLowerCase()} ${verb.toLowerCase()} by ${SITE.name}. ${f.tagline}`;
      const full = `${lead} ${f.synopsis}`;
      // Prefer the richer synopsis when it fits a search snippet; otherwise stop on the tagline.
      return full.length <= 160 ? full : clip(lead);
    })(),
    heading: name,
    ogType: 'video.movie',
    image: ogSized(f.backdrop),
    imageAlt: `${name} — ${f.tagline}`,
    changefreq: 'monthly',
    priority: f.featured ? 0.8 : 0.7,
    breadcrumbs: [home, { name: 'Filmography', path: '/filmography' }, { name, path }],
    schema: [
      {
        '@type': 'WebPage',
        '@id': `${abs(path)}#webpage`,
        url: abs(path),
        name: `${name} (${f.year})`,
        isPartOf: { '@id': ID.website },
        mainEntity: { '@id': `${abs(path)}#movie` },
        inLanguage: SITE.lang,
      },
      filmNode(f),
    ],
    body: {
      paragraphs: [f.tagline, f.synopsis, `Director's note: ${f.directorNote}`],
      list: [
        {
          title: 'Details',
          items: [
            { text: `Year: ${f.year}` },
            { text: `Language: ${f.language}` },
            { text: `Genre: ${f.genre.join(', ')}` },
            { text: `Runtime: ${f.runtime}` },
            { text: `Status: ${f.status}` },
          ],
        },
        {
          title: 'Cast',
          items: f.cast.map((c) => ({ text: `${c.actor} as ${c.character}` })),
        },
        {
          title: 'Credits',
          items: Object.entries(f.credits).map(([k, v]) => ({
            text: `${k.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase())}: ${v}`,
          })),
        },
        { title: 'Awards & Festivals', items: f.awards.map((a) => ({ text: a })) },
      ],
    },
  };
};

const filmographyItemList = {
  '@type': 'ItemList',
  itemListElement: films.map((f, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: abs(`/films/${f.slug}`),
    name: filmTitle(f),
  })),
};

export const ROUTES: RouteSeo[] = [
  {
    path: '/',
    title: 'S Vijay Krishnan — Tamil Film Director & Producer | Chennai',
    description:
      'Official website of S Vijay Krishnan, award-winning Tamil film director and producer from Chennai. Explore his films, awards, gallery and VK Productions.',
    heading: 'S Vijay Krishnan — Tamil Film Director & Producer',
    ogType: 'website',
    image: SITE.ogImage,
    imageAlt: SITE.ogImageAlt,
    changefreq: 'weekly',
    priority: 1.0,
    breadcrumbs: [home],
    schema: [
      {
        '@type': 'WebPage',
        '@id': `${abs('/')}#webpage`,
        url: abs('/'),
        name: 'S Vijay Krishnan — Tamil Film Director & Producer',
        isPartOf: { '@id': ID.website },
        about: ownerRef,
        primaryImageOfPage: { '@type': 'ImageObject', url: abs(SITE.ogImage) },
        inLanguage: SITE.lang,
      },
    ],
    body: {
      paragraphs: [filmmaker.tagline, filmmaker.bio, filmmaker.philosophy],
      list: [
        {
          title: 'Films',
          items: films.map((f) => ({ text: `${filmTitle(f)} (${f.year}) — ${f.tagline}`, href: `/films/${f.slug}` })),
        },
        {
          title: 'Highlights',
          items: filmmaker.stats.map((s) => ({ text: `${s.number} ${s.label}` })),
        },
      ],
    },
  },
  {
    path: '/about',
    title: 'About S Vijay Krishnan — Indian Film Director & Producer',
    description:
      'Meet S Vijay Krishnan: Chennai-based Tamil film director and producer with 12+ years in Indian cinema. His journey, directing philosophy and creative process.',
    heading: 'About S Vijay Krishnan',
    ogType: 'profile',
    image: SITE.ogImage,
    imageAlt: SITE.ogImageAlt,
    changefreq: 'monthly',
    priority: 0.9,
    breadcrumbs: [home, { name: 'About', path: '/about' }],
    schema: [
      {
        '@type': 'ProfilePage',
        '@id': `${abs('/about')}#webpage`,
        url: abs('/about'),
        name: 'About S Vijay Krishnan',
        isPartOf: { '@id': ID.website },
        mainEntity: ownerRef,
        dateModified: SITE.lastModified,
        inLanguage: SITE.lang,
      },
    ],
    body: {
      paragraphs: [filmmaker.bio, filmmaker.bioExtended],
      list: [
        {
          title: 'Awards',
          items: filmmaker.awards.map((a) => ({ text: `${a.title} — ${a.festival} (${a.year}), ${a.project}` })),
        },
      ],
    },
  },
  {
    path: '/filmography',
    title: 'Filmography — Films by S Vijay Krishnan | Tamil Cinema',
    description:
      'Complete filmography of S Vijay Krishnan: Nilavil Ondru, Kaadu Kuyil, Ratchagan Rises, Mazhai, Vaanam Thiranthu and Nila Kavithai. Tamil features and shorts.',
    heading: 'Filmography of S Vijay Krishnan',
    ogType: 'website',
    image: SITE.ogImage,
    imageAlt: SITE.ogImageAlt,
    changefreq: 'weekly',
    priority: 0.9,
    breadcrumbs: [home, { name: 'Filmography', path: '/filmography' }],
    schema: [
      {
        '@type': 'CollectionPage',
        '@id': `${abs('/filmography')}#webpage`,
        url: abs('/filmography'),
        name: 'Filmography — Films by S Vijay Krishnan',
        isPartOf: { '@id': ID.website },
        about: ownerRef,
        mainEntity: filmographyItemList,
        inLanguage: SITE.lang,
      },
    ],
    body: {
      paragraphs: ['Feature films and short films directed and produced by S Vijay Krishnan.'],
      list: [
        {
          title: 'Films',
          items: films.map((f) => ({
            text: `${filmTitle(f)} (${f.year}) — ${f.genre.join(', ')}. ${f.synopsis}`,
            href: `/films/${f.slug}`,
          })),
        },
      ],
    },
  },
  {
    path: '/production',
    title: 'Film Production Services — VK Productions, Chennai',
    description:
      'VK Productions, the independent banner of S Vijay Krishnan: creative development, line production, post-production and OTT distribution for Indian cinema.',
    heading: 'VK Productions — Film Production Services',
    ogType: 'website',
    image: SITE.ogImage,
    imageAlt: SITE.ogImageAlt,
    changefreq: 'monthly',
    priority: 0.8,
    breadcrumbs: [home, { name: 'Production', path: '/production' }],
    schema: [
      {
        '@type': 'WebPage',
        '@id': `${abs('/production')}#webpage`,
        url: abs('/production'),
        name: 'Film Production Services — VK Productions',
        isPartOf: { '@id': ID.website },
        about: { '@id': ID.org },
        inLanguage: SITE.lang,
      },
    ],
    body: {
      paragraphs: [
        'VK Productions is a modern independent production banner committed to cinematic ambition, fiscal integrity and auteur storytelling, founded by S Vijay Krishnan in Chennai.',
        'Services: creative development, on-set direction, line production, post-production and OTT distribution for Indian and international films.',
      ],
    },
  },
  {
    path: '/creative-vision',
    title: 'Creative Vision & Filmmaking Philosophy | S Vijay Krishnan',
    description:
      "The artistic manifesto, visual principles and director's notebook of Tamil filmmaker S Vijay Krishnan: how light, sound and silence shape his cinema.",
    heading: 'Creative Vision & Filmmaking Philosophy',
    ogType: 'website',
    image: SITE.ogImage,
    imageAlt: SITE.ogImageAlt,
    changefreq: 'monthly',
    priority: 0.7,
    breadcrumbs: [home, { name: 'Creative Vision', path: '/creative-vision' }],
    schema: [
      {
        '@type': 'WebPage',
        '@id': `${abs('/creative-vision')}#webpage`,
        url: abs('/creative-vision'),
        name: 'Creative Vision & Filmmaking Philosophy',
        isPartOf: { '@id': ID.website },
        about: ownerRef,
        inLanguage: SITE.lang,
      },
    ],
    body: { paragraphs: [filmmaker.philosophy, "The artistic manifesto, visual principles and director's notebook of S Vijay Krishnan."] },
  },
  {
    path: '/gallery',
    title: 'Gallery — On-Set Photos & Film Stills | S Vijay Krishnan',
    description:
      'Behind-the-scenes photography, on-set frames, film stills and festival moments from the films of Tamil director S Vijay Krishnan.',
    heading: 'Visual Archive & Gallery',
    ogType: 'website',
    image: SITE.ogImage,
    imageAlt: SITE.ogImageAlt,
    changefreq: 'weekly',
    priority: 0.7,
    breadcrumbs: [home, { name: 'Gallery', path: '/gallery' }],
    schema: [
      {
        '@type': 'ImageGallery',
        '@id': `${abs('/gallery')}#webpage`,
        url: abs('/gallery'),
        name: 'Visual Archive & Gallery — S Vijay Krishnan',
        isPartOf: { '@id': ID.website },
        about: ownerRef,
        inLanguage: SITE.lang,
      },
    ],
    body: {
      paragraphs: ['Behind-the-scenes photography, on-set frames, film stills and festival moments.'],
      list: [{ title: 'Frames', items: gallery.map((g) => ({ text: `${g.caption}${g.project ? ` — ${g.project}` : ''} (${g.year})` })) }],
    },
  },
  {
    path: '/press-awards',
    title: 'Press & Awards — Festival Laurels | S Vijay Krishnan',
    description:
      'Festival laurels, jury awards and press coverage for Tamil director S Vijay Krishnan, including Best Director at Chennai International Film Festival.',
    heading: 'Press & Awards',
    ogType: 'website',
    image: SITE.ogImage,
    imageAlt: SITE.ogImageAlt,
    changefreq: 'weekly',
    priority: 0.7,
    breadcrumbs: [home, { name: 'Press & Awards', path: '/press-awards' }],
    schema: [
      {
        '@type': 'CollectionPage',
        '@id': `${abs('/press-awards')}#webpage`,
        url: abs('/press-awards'),
        name: 'Press & Awards — S Vijay Krishnan',
        isPartOf: { '@id': ID.website },
        about: ownerRef,
        inLanguage: SITE.lang,
      },
    ],
    body: {
      paragraphs: ['Official festival laurels, awards and critical press for director and producer S Vijay Krishnan.'],
      list: [
        { title: 'Awards', items: awards.map((a) => ({ text: `${a.title} — ${a.festival} (${a.year}), ${a.project}${a.type === 'nomination' ? ' [nomination]' : ''}` })) },
        { title: 'Press', items: press.map((p) => ({ text: p.headline })) },
      ],
    },
  },
  {
    path: '/contact',
    title: 'Contact S Vijay Krishnan — Film Direction & Production',
    description:
      'Contact S Vijay Krishnan and VK Productions in Chennai, Tamil Nadu for film direction, production partnerships, press and collaboration enquiries.',
    heading: 'Contact S Vijay Krishnan',
    ogType: 'website',
    image: SITE.ogImage,
    imageAlt: SITE.ogImageAlt,
    changefreq: 'monthly',
    priority: 0.8,
    breadcrumbs: [home, { name: 'Contact', path: '/contact' }],
    schema: [
      {
        '@type': 'ContactPage',
        '@id': `${abs('/contact')}#webpage`,
        url: abs('/contact'),
        name: 'Contact S Vijay Krishnan',
        isPartOf: { '@id': ID.website },
        about: ownerRef,
        inLanguage: SITE.lang,
      },
    ],
    body: {
      paragraphs: [`Studio: ${filmmaker.location}.`, `Email: ${filmmaker.email}`],
    },
  },
  ...films.map(filmRoute),
];

/** Served with HTTP 404 by the host; must never be indexed. */
export const NOT_FOUND_ROUTE: RouteSeo = {
  path: '/404',
  title: 'Page Not Found | S Vijay Krishnan',
  description: 'The page you are looking for does not exist. Return to the official website of Tamil film director S Vijay Krishnan.',
  heading: 'Page Not Found',
  ogType: 'website',
  image: SITE.ogImage,
  imageAlt: SITE.ogImageAlt,
  changefreq: 'yearly',
  priority: 0,
  noindex: true,
  breadcrumbs: [],
  schema: [],
  body: { paragraphs: ['The page you are looking for does not exist.'], list: [{ title: 'Explore', items: [{ text: 'Home', href: '/' }, { text: 'Filmography', href: '/filmography' }, { text: 'Contact', href: '/contact' }] }] },
};

export const getRoute = (pathname: string): RouteSeo | undefined => {
  const p = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return ROUTES.find((r) => r.path === p);
};

// ─── Global JSON-LD graph (Person + Organization + WebSite) ──────────────────
export const globalGraph = (): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': ID.person,
      name: SITE.name,
      url: abs('/'),
      description: filmmaker.bio,
      jobTitle: ['Film Director', 'Film Producer'],
      nationality: { '@type': 'Country', name: 'India' },
      homeLocation: {
        '@type': 'Place',
        address: { '@type': 'PostalAddress', addressLocality: 'Chennai', addressRegion: 'Tamil Nadu', addressCountry: 'IN' },
      },
      knowsAbout: ['Tamil cinema', 'Indian cinema', 'Film direction', 'Film production', 'Screenwriting', 'Cinematography'],
      knowsLanguage: ['ta', 'en'],
      worksFor: { '@id': ID.org },
      award: filmmaker.awards.map((a) => `${a.title} — ${a.festival} (${a.year})`),
      sameAs: Object.values(filmmaker.social),
      mainEntityOfPage: abs('/about'),
    },
    {
      '@type': 'Organization',
      '@id': ID.org,
      name: SITE.company,
      alternateName: 'VK Films',
      url: abs('/production'),
      logo: { '@type': 'ImageObject', url: abs('/icon-512.png'), width: 512, height: 512 },
      founder: ownerRef,
      areaServed: 'IN',
      address: { '@type': 'PostalAddress', addressLocality: 'Chennai', addressRegion: 'Tamil Nadu', addressCountry: 'IN' },
      sameAs: Object.values(filmmaker.social),
    },
    {
      '@type': 'WebSite',
      '@id': ID.website,
      url: abs('/'),
      name: SITE.name,
      alternateName: ['S Vijay Krishnan Films', 'Vijay Krishnan Films', 'vijaykrishnan.in'],
      description: 'Official website of S Vijay Krishnan, Tamil film director and producer.',
      inLanguage: SITE.lang,
      publisher: ownerRef,
    },
  ],
});

// ─── Head model ──────────────────────────────────────────────────────────────
export interface HeadTag {
  tag: 'meta' | 'link' | 'script';
  /** Stable key → data-seo attribute; lets the runtime upsert instead of duplicate. */
  key: string;
  attrs: Record<string, string>;
  /** Inner text for script tags. */
  text?: string;
}

export interface HeadModel {
  title: string;
  tags: HeadTag[];
}

export const buildHead = (r: RouteSeo): HeadModel => {
  const url = abs(r.path === '/404' ? '/' : r.path);
  const img = abs(r.image);
  const isDefaultImage = r.image === SITE.ogImage;
  const tags: HeadTag[] = [
    { tag: 'meta', key: 'description', attrs: { name: 'description', content: r.description } },
    {
      tag: 'meta',
      key: 'robots',
      attrs: {
        name: 'robots',
        content: r.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      },
    },
  ];

  // Search-console ownership tokens (optional; set in .env / Vercel env vars)
  const google = getEnv('VITE_GOOGLE_SITE_VERIFICATION');
  const bing = getEnv('VITE_BING_SITE_VERIFICATION');
  if (google) tags.push({ tag: 'meta', key: 'google-site-verification', attrs: { name: 'google-site-verification', content: google } });
  if (bing) tags.push({ tag: 'meta', key: 'msvalidate.01', attrs: { name: 'msvalidate.01', content: bing } });

  if (!r.noindex) {
    tags.push(
      { tag: 'link', key: 'canonical', attrs: { rel: 'canonical', href: url } },
      { tag: 'link', key: 'hreflang-en-in', attrs: { rel: 'alternate', hreflang: 'en-IN', href: url } },
      { tag: 'link', key: 'hreflang-x-default', attrs: { rel: 'alternate', hreflang: 'x-default', href: url } },
    );
  }

  tags.push(
    { tag: 'meta', key: 'og:type', attrs: { property: 'og:type', content: r.ogType } },
    { tag: 'meta', key: 'og:site_name', attrs: { property: 'og:site_name', content: SITE.name } },
    { tag: 'meta', key: 'og:locale', attrs: { property: 'og:locale', content: SITE.locale } },
    { tag: 'meta', key: 'og:url', attrs: { property: 'og:url', content: url } },
    { tag: 'meta', key: 'og:title', attrs: { property: 'og:title', content: r.title } },
    { tag: 'meta', key: 'og:description', attrs: { property: 'og:description', content: r.description } },
    { tag: 'meta', key: 'og:image', attrs: { property: 'og:image', content: img } },
    { tag: 'meta', key: 'og:image:alt', attrs: { property: 'og:image:alt', content: r.imageAlt } },
    { tag: 'meta', key: 'twitter:card', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
    { tag: 'meta', key: 'twitter:title', attrs: { name: 'twitter:title', content: r.title } },
    { tag: 'meta', key: 'twitter:description', attrs: { name: 'twitter:description', content: r.description } },
    { tag: 'meta', key: 'twitter:image', attrs: { name: 'twitter:image', content: img } },
    { tag: 'meta', key: 'twitter:image:alt', attrs: { name: 'twitter:image:alt', content: r.imageAlt } },
  );

  if (isDefaultImage) {
    tags.push(
      { tag: 'meta', key: 'og:image:type', attrs: { property: 'og:image:type', content: 'image/jpeg' } },
      { tag: 'meta', key: 'og:image:width', attrs: { property: 'og:image:width', content: String(SITE.ogImageWidth) } },
      { tag: 'meta', key: 'og:image:height', attrs: { property: 'og:image:height', content: String(SITE.ogImageHeight) } },
    );
  } else {
    tags.push(
      { tag: 'meta', key: 'og:image:width', attrs: { property: 'og:image:width', content: '1200' } },
      { tag: 'meta', key: 'og:image:height', attrs: { property: 'og:image:height', content: '630' } },
    );
  }

  if (r.ogType === 'profile') {
    tags.push(
      { tag: 'meta', key: 'profile:first_name', attrs: { property: 'profile:first_name', content: 'S Vijay' } },
      { tag: 'meta', key: 'profile:last_name', attrs: { property: 'profile:last_name', content: 'Krishnan' } },
    );
  }

  const nodes: Record<string, unknown>[] = [...r.schema];
  if (r.breadcrumbs.length > 1) {
    nodes.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: r.breadcrumbs.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        item: abs(c.path),
      })),
    });
  }
  if (nodes.length) {
    tags.push({
      tag: 'script',
      key: 'jsonld-page',
      attrs: { type: 'application/ld+json' },
      text: JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes }),
    });
  }

  return { title: r.title, tags };
};

// ─── Sitemap ─────────────────────────────────────────────────────────────────
const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export const buildSitemap = (): string => {
  const urls = ROUTES.map((r) =>
    [
      '  <url>',
      `    <loc>${esc(abs(r.path))}</loc>`,
      `    <lastmod>${SITE.lastModified}</lastmod>`,
      `    <changefreq>${r.changefreq}</changefreq>`,
      `    <priority>${r.priority.toFixed(1)}</priority>`,
      '  </url>',
    ].join('\n'),
  );

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n');
};
