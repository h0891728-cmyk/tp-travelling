// src/hooks/useMeta.ts
// Dynamic meta tag management without react-helmet
import { useEffect } from 'react';

interface MetaOptions {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
}

const DEFAULT_IMAGE = 'https://raw.githubusercontent.com/h0891728-cmyk/images/main/KEDARNATH/7.jpeg';
const SITE_NAME = 'Travelling Partners';
const BASE_URL = 'https://travellingpartners.in';

export function useMeta({ title, description, image, url, type = 'website' }: MetaOptions) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const fullImage = image || DEFAULT_IMAGE;
  const fullUrl = url ? `${BASE_URL}${url}` : BASE_URL;

  useEffect(() => {
    // Title
    document.title = fullTitle;

    const setMeta = (name: string, content: string, attr = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Standard
    setMeta('description', description);
    setMeta('robots', 'index, follow');

    // Open Graph
    setMeta('og:title', fullTitle, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:image', fullImage, 'property');
    setMeta('og:url', fullUrl, 'property');
    setMeta('og:type', type, 'property');
    setMeta('og:site_name', SITE_NAME, 'property');

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', fullImage);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);

    return () => {
      // Reset to default on unmount
      document.title = `${SITE_NAME} | Himalayan Treks, Pilgrimages & Expeditions`;
    };
  }, [fullTitle, description, fullImage, fullUrl, type]);
}
