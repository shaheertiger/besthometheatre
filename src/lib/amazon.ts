import { SITE } from '../data/site';
import type { Product } from './types';

/** Affiliate URL for a product: /dp/ASIN when known, otherwise a tagged Amazon search. */
export function amazonUrl(p: Pick<Product, 'asin' | 'name' | 'amazonQuery'>): string {
  const tag = encodeURIComponent(SITE.amazonTag);
  if (p.asin) return `https://${SITE.amazonDomain}/dp/${p.asin}?tag=${tag}&linkCode=ll1`;
  const q = encodeURIComponent(p.amazonQuery || p.name);
  return `https://${SITE.amazonDomain}/s?k=${q}&tag=${tag}`;
}

/** Amazon product photo. Uses the image id when known, else Amazon's ASIN image endpoint. */
export function amazonImage(p: Pick<Product, 'asin' | 'imageId'>, size = 400): string | null {
  if (p.imageId) return `https://m.media-amazon.com/images/I/${p.imageId}._SL${size}_.jpg`;
  if (p.asin)
    return `https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=${p.asin}&Format=_SL${size}_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=${encodeURIComponent(SITE.amazonTag)}`;
  return null;
}

export const AFFILIATE_REL = 'sponsored nofollow noopener';
