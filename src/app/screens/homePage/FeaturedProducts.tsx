import React from "react";
import { Box, Button, Container, Skeleton, Stack, Typography } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { selectFeaturedProducts } from "./selector";
import { Product } from "../../../lib/types/product";
import { formatPrice, getProductImage } from "../productsPage/catalog";

interface FeaturedProductsProps {
  loading: boolean;
  error: string;
}

export default function FeaturedProducts({ loading, error }: FeaturedProductsProps) {
  const products = useAppSelector(selectFeaturedProducts);

  return (
    <Box component="section" className="featured-products">
      <Box className="featured-products__backdrop" aria-hidden="true"><span className="featured-products__shape" /><span className="featured-products__wordmark">FEATURED</span></Box>
      <Container maxWidth="lg">
        <Stack direction="row" justifyContent="space-between" alignItems="end" className="featured-products__header">
          <Box><Typography className="featured-products__eyebrow">Curated for COCO</Typography><Typography component="h2" className="featured-products__title">Featured products</Typography><Typography className="featured-products__intro">Everyday pieces selected for their form, feel, and lasting appeal.</Typography></Box>
          <Button component={Link} to="/products" className="featured-products__view-all" endIcon={<ArrowForwardRoundedIcon />}>Shop all</Button>
        </Stack>

        {loading && <Box className="featured-products__grid">{[1, 2, 3, 4].map((item) => <Skeleton key={item} variant="rectangular" className="featured-product-card__skeleton" />)}</Box>}
        {!loading && error && <Typography className="featured-products__message">{error}</Typography>}
        {!loading && !error && !products.length && <Typography className="featured-products__message">No featured products are available yet.</Typography>}
        {!loading && !error && products.length > 0 && <Box className="featured-products__grid">{products.map((product) => <ProductCard key={product._id} product={product} />)}</Box>}
      </Container>
    </Box>
  );
}

function ProductCard({ product }: { product: Product }) {
  const displayPrice = product.productDiscountPrice ?? product.productPrice;
  const hasDiscount = product.productDiscountPrice !== undefined && product.productDiscountPrice < product.productPrice;
  return (
    <Link to={`/products/${product._id}`} className="featured-product-card">
      <Box className="featured-product-card__media">
        <img src={getProductImage(product)} alt={product.productName} loading="lazy" />
        {hasDiscount && <span className="featured-product-card__badge">Sale</span>}
        <span className="featured-product-card__open" aria-hidden="true"><ArrowForwardRoundedIcon /></span>
      </Box>
      <Stack spacing={0.5} className="featured-product-card__content">
        <Stack direction="row" justifyContent="space-between" alignItems="start"><Typography className="featured-product-card__name">{product.productName}</Typography><Stack direction="row" alignItems="center" className="featured-product-card__views" aria-label={`${product.productViews} views`}><VisibilityOutlinedIcon aria-hidden="true" /> {product.productViews}</Stack></Stack>
        <Typography className="featured-product-card__collection">{product.productCollection.toLowerCase().replace("_", " ")}</Typography>
        <Stack direction="row" spacing={1} alignItems="center"><Typography className="featured-product-card__price">{formatPrice(displayPrice)}</Typography>{hasDiscount && <Typography className="featured-product-card__old-price">{formatPrice(product.productPrice)}</Typography>}</Stack>
      </Stack>
    </Link>
  );
}
