import React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Link } from "react-router-dom";

interface NewArrival {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  sizes: string[];
  views: number;
}

const newArrivals: NewArrival[] = [
  {
    id: "linen-blend-blazer",
    name: "Linen Blend Blazer",
    category: "Clothing",
    price: 129,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=85",
    sizes: ["S", "M", "L", "XXL"],
    views: 126,
  },
  {
    id: "relaxed-cargo-pants",
    name: "Relaxed Cargo Pants",
    category: "Pants",
    price: 98,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=85",
    sizes: ["S", "M", "L"],
    views: 94,
  },
  {
    id: "coco-city-sneakers",
    name: "Coco City Sneakers",
    category: "Shoes",
    price: 118,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=85",
    sizes: ["38", "39", "40", "41", "42"],
    views: 173,
  },
  {
    id: "structured-bucket-hat",
    name: "Structured Bucket Hat",
    category: "Hats",
    price: 45,
    image: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=900&q=85",
    sizes: ["ONESIZE"],
    views: 81,
  },
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

export default function NewArrivals() {
  return (
    <Box component="section" className="new-arrivals">
      <Container maxWidth="lg">
        <Stack direction="row" alignItems="end" justifyContent="space-between" className="new-arrivals__header">
          <Box>
            <Typography className="new-arrivals__eyebrow">JUST DROPPED</Typography>
            <Typography component="h2" className="new-arrivals__title">New arrivals</Typography>
            <Typography className="new-arrivals__intro">
              Fresh silhouettes and everyday essentials, newly added to Coco.
            </Typography>
          </Box>
          <Button component={Link} to="/products" endIcon={<ArrowForwardIcon />}>
            Explore the collection
          </Button>
        </Stack>

        <Box className="new-arrivals__grid">
          {newArrivals.map((product, index) => (
            <Link
              to={`/products/${product.id}`}
              className={`new-arrival-card new-arrival-card--${index + 1}`}
              key={product.id}
            >
              <Box className="new-arrival-card__media">
                <img src={product.image} alt={product.name} loading="lazy" />
                <span className="new-arrival-card__badge">New</span>
                <span className="new-arrival-card__category">{product.category}</span>
                <span className="new-arrival-card__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="new-arrival-card__action">
                  View style <ArrowForwardIcon />
                </span>
              </Box>
              <Stack className="new-arrival-card__body" spacing={1}>
                <Stack direction="row" alignItems="start" justifyContent="space-between" spacing={1}>
                  <Typography className="new-arrival-card__name">{product.name}</Typography>
                  <Typography className="new-arrival-card__price">{formatPrice(product.price)}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography className="new-arrival-card__sizes">
                    {product.sizes.join(" · ")}
                  </Typography>
                  <Stack direction="row" alignItems="center" className="new-arrival-card__views">
                    <VisibilityOutlinedIcon /> {product.views}
                  </Stack>
                </Stack>
              </Stack>
            </Link>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
