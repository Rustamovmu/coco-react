import React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Link } from "react-router-dom";
import { ProductCollection } from "../../../lib/enums/product.enum";

interface FeaturedProduct {
  _id: string;
  productName: string;
  productCollection: ProductCollection;
  productPrice: number;
  productDiscountPrice?: number;
  productImage: string;
  productViews: number;
}

const featuredProducts: FeaturedProduct[] = [
  {
    _id: "classic-oversized-shirt",
    productName: "Classic Oversized Shirt",
    productCollection: ProductCollection.CLOTHE,
    productPrice: 79,
    productImage: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
    productViews: 428,
  },
  {
    _id: "tailored-wide-leg-pants",
    productName: "Tailored Wide-Leg Pants",
    productCollection: ProductCollection.PANTS,
    productPrice: 110,
    productDiscountPrice: 89,
    productImage: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=85",
    productViews: 365,
  },
  {
    _id: "minimal-leather-sneakers",
    productName: "Minimal Leather Sneakers",
    productCollection: ProductCollection.SHOES,
    productPrice: 145,
    productImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
    productViews: 512,
  },
  {
    _id: "everyday-bucket-hat",
    productName: "Everyday Bucket Hat",
    productCollection: ProductCollection.HAT,
    productPrice: 42,
    productImage: "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=85",
    productViews: 284,
  },
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(price);

export default function FeaturedProducts() {
  return (
    <Box component="section" className="featured-products">
      <Box className="featured-products__backdrop" aria-hidden="true">
        <span className="featured-products__shape" />
        <span className="featured-products__wordmark">FEATURED</span>
      </Box>
      <Container maxWidth="lg">
        <Stack direction="row" justifyContent="space-between" alignItems="end" className="featured-products__header">
          <Box>
            <Typography className="featured-products__eyebrow">Curated for COCO</Typography>
            <Typography component="h2" className="featured-products__title">Featured products</Typography>
            <Typography className="featured-products__intro">
              Everyday pieces selected for their form, feel, and lasting appeal.
            </Typography>
          </Box>
          <Button
            component={Link}
            to="/products"
            className="featured-products__view-all"
            endIcon={<ArrowForwardRoundedIcon />}
          >
            Shop all
          </Button>
        </Stack>

        <Box className="featured-products__grid">
          {featuredProducts.map((product) => <ProductCard key={product._id} product={product} />)}
        </Box>
      </Container>
    </Box>
  );
}

function ProductCard({ product }: { product: FeaturedProduct }) {
  const displayPrice = product.productDiscountPrice ?? product.productPrice;
  const hasDiscount = product.productDiscountPrice !== undefined && product.productDiscountPrice < product.productPrice;

  return (
    <Link to={`/products/${product._id}`} className="featured-product-card">
      <Box className="featured-product-card__media">
        <img src={product.productImage} alt={product.productName} loading="lazy" />
        {hasDiscount && <span className="featured-product-card__badge">Sale</span>}
        <span className="featured-product-card__open" aria-hidden="true">
          <ArrowForwardRoundedIcon />
        </span>
      </Box>
      <Stack spacing={0.5} className="featured-product-card__content">
        <Stack direction="row" justifyContent="space-between" alignItems="start">
          <Typography className="featured-product-card__name">{product.productName}</Typography>
          <Stack direction="row" alignItems="center" className="featured-product-card__views" aria-label={`${product.productViews} views`}>
            <VisibilityOutlinedIcon aria-hidden="true" /> {product.productViews}
          </Stack>
        </Stack>
        <Typography className="featured-product-card__collection">
          {product.productCollection.toLowerCase().replace("_", " ")}
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography className="featured-product-card__price">{formatPrice(displayPrice)}</Typography>
          {hasDiscount && <Typography className="featured-product-card__old-price">{formatPrice(product.productPrice)}</Typography>}
        </Stack>
      </Stack>
    </Link>
  );
}
