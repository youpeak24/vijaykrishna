import { useLayoutEffect } from 'react';
import { buildHead, getRoute, NOT_FOUND_ROUTE, SITE } from './site';

/**
 * Keeps <head> in sync with the current route on client-side navigation.
 *
 * The build step pre-renders identical tags (marked with data-seo="<key>") into each
 * route's HTML, so on first load this *updates those elements in place* rather than
 * adding duplicates, and on navigation it swaps their values.
 */
export function useSeo(pathname: string): void {
  useLayoutEffect(() => {
    const route = getRoute(pathname) ?? NOT_FOUND_ROUTE;
    const { title, tags } = buildHead(route);
    const head = document.head;

    document.title = title;
    document.documentElement.lang = SITE.lang;

    const live = new Set<string>();
    for (const t of tags) {
      live.add(t.key);
      let el = head.querySelector<HTMLElement>(`[data-seo="${t.key}"]`);
      if (!el) {
        el = document.createElement(t.tag);
        el.setAttribute('data-seo', t.key);
        head.appendChild(el);
      }
      for (const [k, v] of Object.entries(t.attrs)) {
        if (el.getAttribute(k) !== v) el.setAttribute(k, v);
      }
      if (t.text !== undefined && el.textContent !== t.text) el.textContent = t.text;
    }

    // Remove tags that belonged to a previous route but not this one
    head.querySelectorAll('[data-seo]').forEach((el) => {
      if (!live.has(el.getAttribute('data-seo') ?? '')) el.remove();
    });
  }, [pathname]);
}
