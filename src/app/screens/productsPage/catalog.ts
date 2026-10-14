import { ProductCollection, ProductShoeSize, ProductSize, ProductStatus } from "../../../lib/enums/product.enum";
import { Product } from "../../../lib/types/product";

import { MEDIA } from "../../../lib/media";

// Demo fixtures have no verified merchant photography. Show an honest local status icon.
// Live product uploads are supplied by ProductService, never replaced with stock photos.

const createProduct = (product: Omit<Product, "productStatus" | "createdAt" | "updatedAt" | "productLikes" | "isLiked">, date: string): Product => ({
  ...product,
  productStatus: ProductStatus.PROCESS,
  productLikes: 0,
  isLiked: false,
  createdAt: new Date(date),
  updatedAt: new Date(date),
});

export const catalogProducts: Product[] = [
  createProduct({ _id: "classic-oversized-shirt", productName: "Classic Oversized Shirt", productCollection: ProductCollection.CLOTHE, productPrice: 79, productStock: 14, productSizes: [ProductSize.S, ProductSize.M, ProductSize.L, ProductSize.XXL], productColors: ["Ivory", "Stone"], productImages: [], productViews: 428, productDesc: "A relaxed cotton shirt with a clean collar and an easy, softly structured drape." }, "2026-08-27"),
  createProduct({ _id: "tailored-wide-leg-pants", productName: "Tailored Wide-Leg Pants", productCollection: ProductCollection.PANTS, productPrice: 110, productDiscountPrice: 89, productStock: 9, productSizes: [ProductSize.S, ProductSize.M, ProductSize.L], productColors: ["Black", "Oat"], productImages: [], productViews: 365, productDesc: "Fluid wide-leg tailoring that moves easily from the weekday to the weekend." }, "2026-08-21"),
  createProduct({ _id: "minimal-leather-sneakers", productName: "Minimal Leather Sneakers", productCollection: ProductCollection.SHOES, productPrice: 145, productStock: 7, productSizes: [ProductShoeSize.EU_38, ProductShoeSize.EU_39, ProductShoeSize.EU_40, ProductShoeSize.EU_41, ProductShoeSize.EU_42], productColors: ["Clay", "White"], productImages: [], productViews: 512, productDesc: "Streamlined leather sneakers finished with a supportive, low-profile sole." }, "2026-08-15"),
  createProduct({ _id: "everyday-bucket-hat", productName: "Everyday Bucket Hat", productCollection: ProductCollection.HAT, productPrice: 42, productStock: 18, productSizes: [ProductSize.ONESIZE], productColors: ["Camel", "Black"], productImages: [], productViews: 284, productDesc: "A lightweight bucket hat with a quietly polished finish." }, "2026-08-11"),
  createProduct({ _id: "linen-blend-blazer", productName: "Linen Blend Blazer", productCollection: ProductCollection.CLOTHE, productPrice: 129, productStock: 11, productSizes: [ProductSize.S, ProductSize.M, ProductSize.L], productColors: ["Sand", "Black"], productImages: [], productViews: 126, productDesc: "Breathable linen-blend tailoring with a relaxed, layer-friendly fit." }, "2026-08-30"),
  createProduct({ _id: "relaxed-cargo-pants", productName: "Relaxed Cargo Pants", productCollection: ProductCollection.PANTS, productPrice: 98, productStock: 12, productSizes: [ProductSize.S, ProductSize.M, ProductSize.L], productColors: ["Olive", "Graphite"], productImages: [], productViews: 94, productDesc: "Relaxed cargo pants with functional pockets and a refined silhouette." }, "2026-08-25"),
  createProduct({ _id: "coco-city-sneakers", productName: "Coco City Sneakers", productCollection: ProductCollection.SHOES, productPrice: 118, productStock: 6, productSizes: [ProductShoeSize.EU_38, ProductShoeSize.EU_39, ProductShoeSize.EU_40, ProductShoeSize.EU_41, ProductShoeSize.EU_42], productColors: ["White", "Mushroom"], productImages: [], productViews: 173, productDesc: "Everyday sneakers built for city walks and longer days." }, "2026-08-23"),
  createProduct({ _id: "structured-bucket-hat", productName: "Structured Bucket Hat", productCollection: ProductCollection.HAT, productPrice: 45, productStock: 15, productSizes: [ProductSize.ONESIZE], productColors: ["Cream", "Espresso"], productImages: [], productViews: 81, productDesc: "A softly structured accessory for considered sun coverage." }, "2026-08-20"),
  createProduct({ _id: "woven-weekender", productName: "Woven Weekender", productCollection: ProductCollection.OTHERS, productPrice: 86, productStock: 8, productSizes: [ProductSize.ONESIZE], productColors: ["Tobacco"], productImages: [], productViews: 204, productDesc: "A roomy woven carryall for days away and every in-between plan." }, "2026-08-17"),
  createProduct({ _id: "soft-knit-cardigan", productName: "Soft Knit Cardigan", productCollection: ProductCollection.CLOTHE, productPrice: 96, productStock: 10, productSizes: [ProductSize.S, ProductSize.M, ProductSize.L], productColors: ["Mushroom", "Ink"], productImages: [], productViews: 191, productDesc: "A fine knit layer with an easy line and a tactile finish." }, "2026-08-08"),
];

export const getProductImage = (product: Product) => product.productImages[0] || MEDIA.icons.productUnavailable;

export const formatPrice = (price: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);
