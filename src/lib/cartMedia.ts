import { MEDIA } from "./media";
import { CartItem } from "./types/search";

const legacyDemoIds = new Set([
  "classic-oversized-shirt", "tailored-wide-leg-pants", "minimal-leather-sneakers",
  "everyday-bucket-hat", "linen-blend-blazer", "relaxed-cargo-pants",
  "coco-city-sneakers", "structured-bucket-hat", "woven-weekender", "soft-knit-cardigan",
]);

// Repeatable media-only migration for persisted demo carts; merchant data stays intact.
export const normalizeLegacyCartMedia = (items: CartItem[]): CartItem[] => items.map((item) => {
  if (!item || !legacyDemoIds.has(item.productId)) return item;
  try {
    if (new URL(item.imageUrl).hostname === "images.unsplash.com") {
      return { ...item, imageUrl: MEDIA.icons.productUnavailable };
    }
  } catch {
    // Root-relative local files need no migration.
  }
  return item;
});
