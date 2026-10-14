import { normalizeLegacyCartMedia } from "./cartMedia";
import { MEDIA } from "./media";
import { CartItem } from "./types/search";

const demo: CartItem = {
  productId: "classic-oversized-shirt", productName: "Classic Oversized Shirt",
  quantity: 3, unitPrice: 79, selectedSize: "M", selectedColor: "Ivory",
  imageUrl: ["https:", "", "images.unsplash.com", "legacy-photo"].join("/"),
};

test("migrates old demo cart photos without changing the purchased selection", () => {
  const migrated = normalizeLegacyCartMedia([demo]);
  expect(migrated).toEqual([{ ...demo, imageUrl: MEDIA.icons.productUnavailable }]);
  expect(demo.quantity).toBe(3);
  expect(normalizeLegacyCartMedia(migrated)).toEqual(migrated);
});

test("preserves merchant images and genuine local photos even for a demo ID", () => {
  const merchant = { ...demo, productId: "6a8ed616609e7477889f2133" };
  const local = { ...demo, imageUrl: "/uploads/products/verified-photo.jpg" };
  expect(normalizeLegacyCartMedia([merchant, local])).toEqual([merchant, local]);
});
