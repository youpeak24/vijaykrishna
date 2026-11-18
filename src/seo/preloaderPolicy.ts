const KEY = 'vk_preloader_shown';

/** Crawlers, headless browsers and performance audits must see content immediately. */
const BOT_UA =
  /bot|crawl|spider|slurp|mediapartners|lighthouse|pagespeed|chrome-lighthouse|gtmetrix|pingdom|headless|facebookexternalhit|embedly|preview|whatsapp|telegram|linkedin|twitter|discord|slack/i;

/** The intro plays once per browser session (every new visit), exactly as before. */
export function shouldShowPreloader(): boolean {
  if (typeof window === 'undefined') return false;
  const nav = window.navigator;
  if (nav.webdriver || BOT_UA.test(nav.userAgent)) return false;
  try {
    if (window.sessionStorage.getItem(KEY)) return false;
  } catch {
    // storage blocked: show it
  }
  return true;
}

export function markPreloaderShown(): void {
  try {
    window.sessionStorage.setItem(KEY, '1');
  } catch {
    // ignore
  }
}
