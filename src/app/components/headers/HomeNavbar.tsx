import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import StoreNavigation, { StoreNavigationProps } from "./StoreNavigation";

export default function HomeNavbar(props: StoreNavigationProps) {
  return (
    <Box className="coco-home-header">
      <StoreNavigation {...props} transparent />
      <Container maxWidth="lg">
        <Stack className="coco-home-header__hero" justifyContent="center">
          <Typography component="p" className="coco-home-header__eyebrow">COCO COLLECTION</Typography>
          <Typography component="h1" className="coco-home-header__title">Wear what feels like you.</Typography>
          <Typography className="coco-home-header__copy">Modern essentials for every season and every side of you.</Typography>
        </Stack>
      </Container>
    </Box>
  );
}
