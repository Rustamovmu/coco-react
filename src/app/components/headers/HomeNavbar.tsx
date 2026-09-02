import React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import StoreNavigation, { StoreNavigationProps } from "./StoreNavigation";

export default function HomeNavbar(props: StoreNavigationProps) {
  return (
    <Box className="coco-home-header">
      <video
        className="coco-home-header__video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="https://images.pexels.com/photos/6069552/pexels-photo-6069552.jpeg?auto=compress&cs=tinysrgb&w=1600"
        aria-hidden="true"
      >
        <source
          src="https://videos.pexels.com/video-files/8306453/8306453-uhd_4096_2160_25fps.mp4"
          type="video/mp4"
        />
      </video>
      <Box className="coco-home-header__video-overlay" />
      <StoreNavigation {...props} transparent />
      <Container maxWidth="lg">
        <Box className="coco-home-header__hero">
          <Stack className="coco-home-header__content" justifyContent="center">
            <Typography component="p" className="coco-home-header__eyebrow">
              THE COCO EDIT
            </Typography>
            <Typography component="h1" className="coco-home-header__title">
              Quiet confidence,<br />thoughtfully worn.
            </Typography>
            <Typography className="coco-home-header__copy">
              Refined silhouettes, comfortable layers, and timeless pieces
              designed for an effortless modest wardrobe.
            </Typography>
            <Stack direction="row" className="coco-home-header__buttons">
              <Button component={Link} to="/products" variant="contained" endIcon={<ArrowForwardIcon />}>
                Shop collection
              </Button>
              <Button component={Link} to="/help" variant="text">
                Our approach
              </Button>
            </Stack>
          </Stack>

          <Box className="coco-home-header__note">
            <Typography className="coco-home-header__note-number">01</Typography>
            <Typography component="h2">Considered essentials</Typography>
            <Typography>
              Soft structure, graceful coverage, and a neutral palette made to
              move through every season.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
