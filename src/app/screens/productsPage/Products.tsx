import ProductImage from "../../components/media/ProductImage";
import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, Container, IconButton, Pagination, Stack, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import TuneIcon from "@mui/icons-material/Tune";
import { Link, useLocation } from "react-router-dom";
import ProductService from "../../services/ProductService";
import { serverApi } from "../../../lib/config";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { CartInterface } from "../../../lib/types/cart";
import { Product } from "../../../lib/types/product";
import { catalogProducts, formatPrice, getProductImage } from "./catalog";
import { sweetErrorHandling } from "../../../lib/sweetAlert";

const PAGE_SIZE = 9;
type SortField = "createdAt" | "productPrice" | "productViews";
const collections: Array<{ value: ProductCollection | "ALL"; label: string }> = [
  { value: "ALL", label: "All products" }, { value: ProductCollection.CLOTHE, label: "Clothing" },
  { value: ProductCollection.PANTS, label: "Pants" }, { value: ProductCollection.SHOES, label: "Shoes" },
  { value: ProductCollection.HAT, label: "Hats" }, { value: ProductCollection.OTHERS, label: "Accessories" },
];

const getCollectionFromSearch = (search: string): ProductCollection | "ALL" => {
  const requested = new URLSearchParams(search).get("collection");
  return collections.some((item) => item.value === requested)
    ? requested as ProductCollection | "ALL"
    : "ALL";
};

export default function Products({ cart }: { cart: CartInterface }) {
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>(catalogProducts);
  const [search, setSearch] = useState("");
  const [collection, setCollection] = useState<ProductCollection | "ALL">(() => getCollectionFromSearch(location.search));
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortField, setSortField] = useState<SortField>("productViews");
  const [page, setPage] = useState(1);

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
    const minimum = minPrice === "" ? Number.NEGATIVE_INFINITY : Number(minPrice);
    const maximum = maxPrice === "" ? Number.POSITIVE_INFINITY : Number(maxPrice);
    return products
      .filter((product) => collection === "ALL" || product.productCollection === collection)
      .filter((product) => !query || product.productName.toLowerCase().includes(query))
      .filter((product) => {
        const price = product.productDiscountPrice ?? product.productPrice;
        return price >= minimum && price <= maximum;
      })
      .sort((a, b) => {
        const first = sortField === "createdAt" ? new Date(a.createdAt).getTime() : a[sortField];
        const second = sortField === "createdAt" ? new Date(b.createdAt).getTime() : b[sortField];
        return sortField === "productPrice" ? first - second : second - first;
      });
  }, [collection, maxPrice, minPrice, products, search, sortField]);

  useEffect(() => { setPage(1); }, [collection, maxPrice, minPrice, search, sortField]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageProducts = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const activeLabel = collections.find((item) => item.value === collection)?.label ?? "Products";
  const resetFilters = () => { setSearch(""); setCollection("ALL"); setMinPrice(""); setMaxPrice(""); };
  const toggleFavorite = async (id: string) => {
    try {
      const result = await new ProductService().toggleLike(id);
      setProducts((current) => current.map((product) => product._id === id ? { ...product, ...result } : product));
    } catch (error) {
      await sweetErrorHandling(error);
    }
  };

  return <Box component="section" className="products-page"><Container maxWidth="lg" className="products-page__container">
    <Stack direction="row" className="products-breadcrumb" alignItems="center"><Link to="/">Home</Link><ChevronRightIcon/><span>{activeLabel}</span></Stack>
    <Box className="products-layout">
      <Box component="aside" className="products-sidebar">
        <Stack direction="row" justifyContent="space-between" alignItems="center" className="products-sidebar__title"><Typography component="h2">Filters</Typography><TuneIcon/></Stack>
        <Box className="products-sidebar__search"><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products" aria-label="Search products"/><SearchIcon/></Box>
        <Box className="filter-section filter-section--categories">{collections.map((item) => <Button key={item.value} className={collection === item.value ? "is-active" : ""} onClick={() => setCollection(item.value)}>{item.label}<ChevronRightIcon/></Button>)}</Box>
        <Box className="filter-section"><Typography className="filter-section__label">Price</Typography><Box className="filter-price-inputs"><label><span>Minimum</span><Box><b>$</b><input type="number" min="0" step="1" inputMode="decimal" value={minPrice} onChange={(event) => setMinPrice(event.target.value)} placeholder="No minimum" aria-label="Minimum price" /></Box></label><label><span>Maximum</span><Box><b>$</b><input type="number" min="0" step="1" inputMode="decimal" value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} placeholder="No maximum" aria-label="Maximum price" /></Box></label></Box></Box>
        <Button className="products-sidebar__apply" onClick={resetFilters}>Reset filters</Button>
      </Box>
      <Box className="products-results">
        <Stack direction="row" justifyContent="space-between" alignItems="end" className="products-results__header"><Typography component="h1">{activeLabel}</Typography><Stack direction="row" alignItems="center" className="products-results__meta"><span>Showing {filtered.length ? (page - 1) * PAGE_SIZE + 1 : 0}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} products</span><label className="products-sort"><span>Sort by</span><select aria-label="Sort products" value={sortField} onChange={(event) => setSortField(event.target.value as SortField)}><option value="productViews">Most popular</option><option value="createdAt">Newest</option><option value="productPrice">Price: low to high</option></select></label></Stack></Stack>
        {pageProducts.length ? <Box className="products-page__grid">{pageProducts.map((product) => <ProductCard key={product._id} product={product} cart={cart} onLike={() => toggleFavorite(product._id)}/>)}</Box> : <Box className="products-page__empty"><Typography component="h3">No pieces found.</Typography><Button onClick={resetFilters}>Clear all filters</Button></Box>}
        {pageCount > 1 && <Pagination className="products-page__pagination" count={pageCount} page={page} onChange={(_, value) => setPage(value)} shape="rounded" showFirstButton showLastButton/>}
      </Box>
    </Box>
    <Stack direction="row" className="products-newsletter" alignItems="center" justifyContent="space-between"><Typography component="h2">Stay up to date about<br/>our latest offers</Typography><Box component="form" onSubmit={(event: React.FormEvent) => event.preventDefault()}><Box className="products-newsletter__input"><MailOutlineIcon/><input type="email" placeholder="Enter your email address" aria-label="Email address"/></Box><Button type="submit">Subscribe to newsletter</Button></Box></Stack>
  </Container></Box>;
}

function ProductCard({ product, cart, onLike }: { product: Product; cart: CartInterface; onLike: () => void }) {
  const price = product.productDiscountPrice ?? product.productPrice;
  const hasDiscount = price < product.productPrice;
  const rating = 3.5 + (product.productViews % 4) * 0.5;
  const stop = (event: React.MouseEvent<HTMLButtonElement>, action: () => void) => { event.preventDefault(); event.stopPropagation(); action(); };
  const addToBag = () => cart.onAdd({ productId: product._id, productName: product.productName, unitPrice: price, quantity: 1, imageUrl: getProductImage(product), selectedSize: product.productSizes[0] ?? "ONESIZE" });
  return <Link className="catalog-product-card" to={`/products/${product._id}`}><Box className="catalog-product-card__media"><ProductImage src={getProductImage(product)} alt={product.productName} loading="lazy"/><IconButton className={`catalog-product-card__like${product.isLiked ? " is-liked" : ""}`} onClick={(event) => stop(event, onLike)} aria-label={product.isLiked ? `Unlike ${product.productName}` : `Like ${product.productName}`}>{product.isLiked ? <FavoriteIcon/> : <FavoriteBorderIcon/>}</IconButton><Button className="catalog-product-card__add" onClick={(event) => stop(event, addToBag)}><ShoppingBagOutlinedIcon/> Add to bag</Button></Box><Box className="catalog-product-card__content"><Typography className="catalog-product-card__name">{product.productName}</Typography><Stack direction="row" alignItems="center" className="catalog-product-card__rating"><span>{[1, 2, 3, 4, 5].map((star) => <StarRoundedIcon key={star} className={star > Math.round(rating) ? "is-empty" : ""}/>)}</span><small>{rating.toFixed(1)}/5</small><small>{product.productLikes} likes</small></Stack><Stack direction="row" alignItems="center" className="catalog-product-card__prices"><strong>{formatPrice(price)}</strong>{hasDiscount && <><del>{formatPrice(product.productPrice)}</del><span>-{Math.round((1 - price / product.productPrice) * 100)}%</span></>}</Stack></Box></Link>;
}
