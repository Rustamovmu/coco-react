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
              NEW SEASON · 2026
            </Typography>
            <Typography component="h1" className="coco-home-header__title">
              Dress with<br />intention.
            </Typography>
            <Typography className="coco-home-header__copy">
              Modern modestwear shaped by clean lines, graceful coverage, and
              pieces you will reach for season after season.
            </Typography>
            <Stack direction="row" className="coco-home-header__buttons">
              <Button component={Link} to="/products" variant="contained" endIcon={<ArrowForwardIcon />}>
                Explore collection
              </Button>
              <Button component={Link} to="/products" variant="outlined">
                View new arrivals
              </Button>
            </Stack>
          </Stack>

          <Box className="coco-home-header__note">
            <Typography className="coco-home-header__note-number">COCO / 01</Typography>
            <Typography component="h2">The quiet collection</Typography>
            <Typography>Natural tones · considered layers · timeless form</Typography>
          </Box>
          <Box className="coco-home-header__scroll" aria-hidden="true">
            <span /> Discover
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
