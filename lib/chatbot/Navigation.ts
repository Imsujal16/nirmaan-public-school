import type { ChatLink } from './types';

export function normalizeLinks(links: ChatLink[]) {
  const seen = new Set<string>();
  return links.filter((link) => {
    if (seen.has(link.href)) return false;
    seen.add(link.href);
    return true;
  });
}

export function navigateTo(link: ChatLink) {
  if (!link.href) return;
  window.location.href = link.href;
}
