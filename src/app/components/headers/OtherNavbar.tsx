import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import StoreNavigation, { StoreNavigationProps } from "./StoreNavigation";
import LocalImage from "../media/LocalImage";
import { MEDIA } from "../../../lib/media";

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
        <LocalImage
          className="coco-inner-header__image"
          asset={MEDIA.images.boutique}
          sizes="100vw"
          loading="eager"
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
