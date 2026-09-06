import React from "react";
import { Box, Button, Container, Skeleton, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { selectNewArrivals } from "./selector";
import { formatPrice, getProductImage } from "../productsPage/catalog";

interface NewArrivalsProps {
  loading: boolean;
  error: string;
}

export default function NewArrivals({ loading, error }: NewArrivalsProps) {
  const products = useAppSelector(selectNewArrivals);

  return (
    <Box component="section" className="new-arrivals">
      <Container maxWidth="lg">
        <Stack direction="row" alignItems="end" justifyContent="space-between" className="new-arrivals__header">
          <Box><Typography className="new-arrivals__eyebrow">JUST DROPPED</Typography><Typography component="h2" className="new-arrivals__title">New arrivals</Typography><Typography className="new-arrivals__intro">Fresh silhouettes and everyday essentials, newly added to Coco.</Typography></Box>
          <Button component={Link} to="/products" endIcon={<ArrowForwardIcon />}>Explore the collection</Button>
        </Stack>

        {loading && <Box className="new-arrivals__grid">{[1, 2, 3, 4].map((item) => <Skeleton key={item} variant="rectangular" sx={{ aspectRatio: "3 / 4" }} />)}</Box>}
        {!loading && error && <Typography className="featured-products__message">{error}</Typography>}
        {!loading && !error && !products.length && <Typography className="featured-products__message">No new arrivals are available yet.</Typography>}
        {!loading && !error && products.length > 0 && <Box className="new-arrivals__grid">
          {products.map((product, index) => (
            <Link to={`/products/${product._id}`} className={`new-arrival-card new-arrival-card--${index + 1}`} key={product._id}>
              <Box className="new-arrival-card__media">
                <img src={getProductImage(product)} alt={product.productName} loading="lazy" />
                <span className="new-arrival-card__badge">New</span><span className="new-arrival-card__category">{product.productCollection}</span><span className="new-arrival-card__number">{String(index + 1).padStart(2, "0")}</span><span className="new-arrival-card__action">View style <ArrowForwardIcon /></span>
              </Box>
              <Stack className="new-arrival-card__body" spacing={1}>
                <Stack direction="row" alignItems="start" justifyContent="space-between" spacing={1}><Typography className="new-arrival-card__name">{product.productName}</Typography><Typography className="new-arrival-card__price">{formatPrice(product.productDiscountPrice ?? product.productPrice)}</Typography></Stack>
                <Stack direction="row" alignItems="center" justifyContent="space-between"><Typography className="new-arrival-card__sizes">{product.productSizes.join(" · ") || "One size"}</Typography><Stack direction="row" alignItems="center" className="new-arrival-card__views"><VisibilityOutlinedIcon /> {product.productViews}</Stack></Stack>
              </Stack>
            </Link>
          ))}
        </Box>}
      </Container>
    </Box>
  );
}
