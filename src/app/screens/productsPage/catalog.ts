import { ProductCollection, ProductShoeSize, ProductSize, ProductStatus } from "../../../lib/enums/product.enum";
import { Product } from "../../../lib/types/product";

const image = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=85`;

const createProduct = (product: Omit<Product, "productStatus" | "createdAt" | "updatedAt">, date: string): Product => ({
  ...product,
  productStatus: ProductStatus.PROCESS,
  createdAt: new Date(date),
  updatedAt: new Date(date),
});

export const catalogProducts: Product[] = [
  createProduct({ _id: "classic-oversized-shirt", productName: "Classic Oversized Shirt", productCollection: ProductCollection.CLOTHE, productPrice: 79, productStock: 14, productSizes: [ProductSize.S, ProductSize.M, ProductSize.L, ProductSize.XXL], productColors: ["Ivory", "Stone"], productImages: [image("photo-1521572163474-6864f9cf17ab"), image("photo-1512436991641-6745cdb1723f")], productViews: 428, productDesc: "A relaxed cotton shirt with a clean collar and an easy, softly structured drape." }, "2026-08-27"),
  createProduct({ _id: "tailored-wide-leg-pants", productName: "Tailored Wide-Leg Pants", productCollection: ProductCollection.PANTS, productPrice: 110, productDiscountPrice: 89, productStock: 9, productSizes: [ProductSize.S, ProductSize.M, ProductSize.L], productColors: ["Black", "Oat"], productImages: [image("photo-1594633312681-425c7b97ccd1"), image("photo-1506629905607-d9c297d3d9bc")], productViews: 365, productDesc: "Fluid wide-leg tailoring that moves easily from the weekday to the weekend." }, "2026-08-21"),
  createProduct({ _id: "minimal-leather-sneakers", productName: "Minimal Leather Sneakers", productCollection: ProductCollection.SHOES, productPrice: 145, productStock: 7, productSizes: [ProductShoeSize.EU_38, ProductShoeSize.EU_39, ProductShoeSize.EU_40, ProductShoeSize.EU_41, ProductShoeSize.EU_42], productColors: ["Clay", "White"], productImages: [image("photo-1542291026-7eec264c27ff"), image("photo-1552346154-21d32810aba3")], productViews: 512, productDesc: "Streamlined leather sneakers finished with a supportive, low-profile sole." }, "2026-08-15"),
  createProduct({ _id: "everyday-bucket-hat", productName: "Everyday Bucket Hat", productCollection: ProductCollection.HAT, productPrice: 42, productStock: 18, productSizes: [ProductSize.ONESIZE], productColors: ["Camel", "Black"], productImages: [image("photo-1521369909029-2afed882baee")], productViews: 284, productDesc: "A lightweight bucket hat with a quietly polished finish." }, "2026-08-11"),
  createProduct({ _id: "linen-blend-blazer", productName: "Linen Blend Blazer", productCollection: ProductCollection.CLOTHE, productPrice: 129, productStock: 11, productSizes: [ProductSize.S, ProductSize.M, ProductSize.L], productColors: ["Sand", "Black"], productImages: [image("photo-1591047139829-d91aecb6caea")], productViews: 126, productDesc: "Breathable linen-blend tailoring with a relaxed, layer-friendly fit." }, "2026-08-30"),
  createProduct({ _id: "relaxed-cargo-pants", productName: "Relaxed Cargo Pants", productCollection: ProductCollection.PANTS, productPrice: 98, productStock: 12, productSizes: [ProductSize.S, ProductSize.M, ProductSize.L], productColors: ["Olive", "Graphite"], productImages: [image("photo-1624378439575-d8705ad7ae80")], productViews: 94, productDesc: "Relaxed cargo pants with functional pockets and a refined silhouette." }, "2026-08-25"),
  createProduct({ _id: "coco-city-sneakers", productName: "Coco City Sneakers", productCollection: ProductCollection.SHOES, productPrice: 118, productStock: 6, productSizes: [ProductShoeSize.EU_38, ProductShoeSize.EU_39, ProductShoeSize.EU_40, ProductShoeSize.EU_41, ProductShoeSize.EU_42], productColors: ["White", "Mushroom"], productImages: [image("photo-1549298916-b41d501d3772")], productViews: 173, productDesc: "Everyday sneakers built for city walks and longer days." }, "2026-08-23"),
  createProduct({ _id: "structured-bucket-hat", productName: "Structured Bucket Hat", productCollection: ProductCollection.HAT, productPrice: 45, productStock: 15, productSizes: [ProductSize.ONESIZE], productColors: ["Cream", "Espresso"], productImages: [image("photo-1534215754734-18e55d13e346")], productViews: 81, productDesc: "A softly structured accessory for considered sun coverage." }, "2026-08-20"),
  createProduct({ _id: "woven-weekender", productName: "Woven Weekender", productCollection: ProductCollection.OTHERS, productPrice: 86, productStock: 8, productSizes: [ProductSize.ONESIZE], productColors: ["Tobacco"], productImages: [image("photo-1553062407-98eeb64c6a62")], productViews: 204, productDesc: "A roomy woven carryall for days away and every in-between plan." }, "2026-08-17"),
  createProduct({ _id: "soft-knit-cardigan", productName: "Soft Knit Cardigan", productCollection: ProductCollection.CLOTHE, productPrice: 96, productStock: 10, productSizes: [ProductSize.S, ProductSize.M, ProductSize.L], productColors: ["Mushroom", "Ink"], productImages: [image("photo-1576566588028-4147f3842f27")], productViews: 191, productDesc: "A fine knit layer with an easy line and a tactile finish." }, "2026-08-08"),
];

export const getProductImage = (product: Product) => product.productImages[0] || "/img/noimage-list.svg";

export const formatPrice = (price: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);
