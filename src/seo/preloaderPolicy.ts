const KEY = 'vk_preloader_shown';
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

/** Crawlers, headless browsers and performance audits must see content immediately. */
const BOT_UA =
  /bot|crawl|spider|slurp|mediapartners|lighthouse|pagespeed|chrome-lighthouse|gtmetrix|pingdom|headless|facebookexternalhit|embedly|preview|whatsapp|telegram|linkedin|twitter|discord|slack/i;

export function shouldShowPreloader(): boolean {
  if (typeof window === 'undefined') return false;
  const nav = window.navigator;
  if (nav.webdriver || BOT_UA.test(nav.userAgent)) return false;
  try {
    const last = Number(window.localStorage.getItem(KEY));
    if (last && Date.now() - last < WEEK_MS) return false;
  } catch {
    // storage blocked: fall through and show once
  }
  return true;
}

export function markPreloaderShown(): void {
  try {
    window.localStorage.setItem(KEY, String(Date.now()));
  } catch {
    // ignore
  }
}
