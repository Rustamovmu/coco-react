import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import StoreNavigation, { StoreNavigationProps } from "./StoreNavigation";

const pageCopy = {
  products: { eyebrow: "THE COCO COLLECTION", title: "Shop" },
  orders: { eyebrow: "YOUR COCO", title: "Orders" },
  "member-page": { eyebrow: "YOUR COCO", title: "My account" },
  help: { eyebrow: "COCO CARE", title: "How can we help?" },
};

export default function OtherNavbar(props: StoreNavigationProps) {
  const { pathname } = useLocation();
  const routeName = pathname.split("/").filter(Boolean)[0] as keyof typeof pageCopy;
  const copy = pageCopy[routeName] ?? {
    eyebrow: "COCO",
    title: "Quiet confidence, thoughtfully worn.",
  };

  return (
    <Box className="coco-inner-header">
      <StoreNavigation {...props} />
      <Box className="coco-inner-header__banner">
        <Box
          component="img"
          className="coco-inner-header__image"
          src="https://cdn.prod.website-files.com/62cdfaa90f276b83c68133c3/670770605779fbd1e74d651d_hans-isaacson-ioRyX4xxnWw-unsplash.jpg"
          alt="Neutral clothing displayed inside a modern boutique"
        />
        <Box className="coco-inner-header__shade" />
        <Container maxWidth="lg" className="coco-inner-header__content">
          <Typography component="p" className="coco-inner-header__eyebrow">
            {copy.eyebrow}
          </Typography>
          <Typography component="h1" className="coco-inner-header__title">
            {copy.title}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
