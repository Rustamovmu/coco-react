import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, Container, IconButton, Pagination, Slider, Stack, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import TuneIcon from "@mui/icons-material/Tune";
import { Link } from "react-router-dom";
import ProductService from "../../services/ProductService";
import { serverApi } from "../../../lib/config";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { CartInterface } from "../../../lib/types/cart";
import { Product } from "../../../lib/types/product";
import { catalogProducts, formatPrice, getProductImage } from "./catalog";

const PAGE_SIZE = 9;
const FAVORITES_KEY = "cocoFavoriteProducts";
type SortField = "createdAt" | "productPrice" | "productViews";
const collections: Array<{ value: ProductCollection | "ALL"; label: string }> = [
  { value: "ALL", label: "All products" }, { value: ProductCollection.CLOTHE, label: "Clothing" },
  { value: ProductCollection.PANTS, label: "Pants" }, { value: ProductCollection.SHOES, label: "Shoes" },
  { value: ProductCollection.HAT, label: "Hats" }, { value: ProductCollection.OTHERS, label: "Accessories" },
];
const sizes = ["S", "M", "L", "XXL", "ONESIZE", "38", "39", "40", "41", "42"];
const colors = [
  { name: "Ivory", hex: "#fffff0" }, { name: "Stone", hex: "#a49d91" },
  { name: "Black", hex: "#111111" }, { name: "Sand", hex: "#d7bd94" },
  { name: "Olive", hex: "#758052" }, { name: "Clay", hex: "#bd7155" },
];

const readFavorites = (): string[] => {
  try {
    const value = JSON.parse(localStorage.getItem(FAVORITES_KEY) ?? "[]");
    return Array.isArray(value) ? value : [];
  } catch { return []; }
};

export default function Products({ cart }: { cart: CartInterface }) {
  const [products, setProducts] = useState<Product[]>(catalogProducts);
  const [search, setSearch] = useState("");
  const [collection, setCollection] = useState<ProductCollection | "ALL">("ALL");
  const [maxPrice, setMaxPrice] = useState(200);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [sortField, setSortField] = useState<SortField>("productViews");
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState<string[]>(readFavorites);

  useEffect(() => {
    if (!serverApi || serverApi === "undefined") return;
    let active = true;
    new ProductService().getProducts({ page: 1, limit: 100 }).then((response) => {
      if (active && response.length) setProducts(response);
    }).catch(() => undefined);
    return () => { active = false; };
  }, []);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products
      .filter((product) => collection === "ALL" || product.productCollection === collection)
      .filter((product) => !query || product.productName.toLowerCase().includes(query))
      .filter((product) => (product.productDiscountPrice ?? product.productPrice) <= maxPrice)
      .filter((product) => !selectedSize || product.productSizes.some((size) => size === selectedSize))
      .filter((product) => !selectedColor || product.productColors.includes(selectedColor))
      .sort((a, b) => {
        const first = sortField === "createdAt" ? new Date(a.createdAt).getTime() : a[sortField];
        const second = sortField === "createdAt" ? new Date(b.createdAt).getTime() : b[sortField];
        return sortField === "productPrice" ? first - second : second - first;
      });
  }, [collection, maxPrice, products, search, selectedColor, selectedSize, sortField]);

  useEffect(() => { setPage(1); }, [collection, maxPrice, search, selectedColor, selectedSize, sortField]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageProducts = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const activeLabel = collections.find((item) => item.value === collection)?.label ?? "Products";
  const resetFilters = () => { setSearch(""); setCollection("ALL"); setMaxPrice(200); setSelectedSize(""); setSelectedColor(""); };
  const toggleFavorite = (id: string) => setFavorites((current) => {
    const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
    return next;
  });

  return <Box component="section" className="products-page"><Container maxWidth="lg" className="products-page__container">
    <Stack direction="row" className="products-breadcrumb" alignItems="center"><Link to="/">Home</Link><ChevronRightIcon/><span>{activeLabel}</span></Stack>
    <Box className="products-layout">
      <Box component="aside" className="products-sidebar">
        <Stack direction="row" justifyContent="space-between" alignItems="center" className="products-sidebar__title"><Typography component="h2">Filters</Typography><TuneIcon/></Stack>
        <Box className="products-sidebar__search"><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products" aria-label="Search products"/><SearchIcon/></Box>
        <Box className="filter-section filter-section--categories">{collections.map((item) => <Button key={item.value} className={collection === item.value ? "is-active" : ""} onClick={() => setCollection(item.value)}>{item.label}<ChevronRightIcon/></Button>)}</Box>
        <Box className="filter-section"><Typography className="filter-section__label">Price</Typography><Slider value={maxPrice} onChange={(_, value) => setMaxPrice(value as number)} min={40} max={200} aria-label="Maximum price"/><Stack direction="row" justifyContent="space-between" className="filter-section__range"><span>$40</span><strong>Up to ${maxPrice}</strong><span>$200</span></Stack></Box>
        <Box className="filter-section"><Typography className="filter-section__label">Colors</Typography><Box className="filter-colors">{colors.map((color) => <button key={color.name} type="button" title={color.name} aria-label={`Filter by ${color.name}`} className={selectedColor === color.name ? "is-active" : ""} style={{ backgroundColor: color.hex }} onClick={() => setSelectedColor(selectedColor === color.name ? "" : color.name)}/>)}</Box></Box>
        <Box className="filter-section"><Typography className="filter-section__label">Size</Typography><Box className="filter-sizes">{sizes.map((size) => <Button key={size} className={selectedSize === size ? "is-active" : ""} onClick={() => setSelectedSize(selectedSize === size ? "" : size)}>{size}</Button>)}</Box></Box>
        <Button className="products-sidebar__apply" onClick={resetFilters}>Reset filters</Button>
      </Box>
      <Box className="products-results">
        <Stack direction="row" justifyContent="space-between" alignItems="end" className="products-results__header"><Typography component="h1">{activeLabel}</Typography><Stack direction="row" alignItems="center" className="products-results__meta"><span>Showing {filtered.length ? (page - 1) * PAGE_SIZE + 1 : 0}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} products</span><label>Sort by: <select value={sortField} onChange={(event) => setSortField(event.target.value as SortField)}><option value="productViews">Most popular</option><option value="createdAt">Newest</option><option value="productPrice">Price: low to high</option></select></label></Stack></Stack>
        {pageProducts.length ? <Box className="products-page__grid">{pageProducts.map((product) => <ProductCard key={product._id} product={product} cart={cart} liked={favorites.includes(product._id)} onLike={() => toggleFavorite(product._id)}/>)}</Box> : <Box className="products-page__empty"><Typography component="h3">No pieces found.</Typography><Button onClick={resetFilters}>Clear all filters</Button></Box>}
        {pageCount > 1 && <Pagination className="products-page__pagination" count={pageCount} page={page} onChange={(_, value) => setPage(value)} shape="rounded" showFirstButton showLastButton/>}
      </Box>
    </Box>
    <Stack direction="row" className="products-newsletter" alignItems="center" justifyContent="space-between"><Typography component="h2">Stay up to date about<br/>our latest offers</Typography><Box component="form" onSubmit={(event: React.FormEvent) => event.preventDefault()}><Box className="products-newsletter__input"><MailOutlineIcon/><input type="email" placeholder="Enter your email address" aria-label="Email address"/></Box><Button type="submit">Subscribe to newsletter</Button></Box></Stack>
  </Container></Box>;
}

function ProductCard({ product, cart, liked, onLike }: { product: Product; cart: CartInterface; liked: boolean; onLike: () => void }) {
  const price = product.productDiscountPrice ?? product.productPrice;
  const hasDiscount = price < product.productPrice;
  const rating = 3.5 + (product.productViews % 4) * 0.5;
  const stop = (event: React.MouseEvent<HTMLButtonElement>, action: () => void) => { event.preventDefault(); event.stopPropagation(); action(); };
  const addToBag = () => cart.onAdd({ productId: product._id, productName: product.productName, unitPrice: price, quantity: 1, imageUrl: getProductImage(product), selectedSize: product.productSizes[0] ?? "ONESIZE" });
  return <Link className="catalog-product-card" to={`/products/${product._id}`}><Box className="catalog-product-card__media"><img src={getProductImage(product)} alt={product.productName} loading="lazy"/><IconButton className={`catalog-product-card__like${liked ? " is-liked" : ""}`} onClick={(event) => stop(event, onLike)} aria-label={liked ? `Unlike ${product.productName}` : `Like ${product.productName}`}>{liked ? <FavoriteIcon/> : <FavoriteBorderIcon/>}</IconButton><Button className="catalog-product-card__add" onClick={(event) => stop(event, addToBag)}><ShoppingBagOutlinedIcon/> Add to bag</Button></Box><Box className="catalog-product-card__content"><Typography className="catalog-product-card__name">{product.productName}</Typography><Stack direction="row" alignItems="center" className="catalog-product-card__rating"><span>{[1, 2, 3, 4, 5].map((star) => <StarRoundedIcon key={star} className={star > Math.round(rating) ? "is-empty" : ""}/>)}</span><small>{rating.toFixed(1)}/5</small></Stack><Stack direction="row" alignItems="center" className="catalog-product-card__prices"><strong>{formatPrice(price)}</strong>{hasDiscount && <><del>{formatPrice(product.productPrice)}</del><span>-{Math.round((1 - price / product.productPrice) * 100)}%</span></>}</Stack></Box></Link>;
}
