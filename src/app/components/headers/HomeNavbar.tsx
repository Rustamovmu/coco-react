import React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import StoreNavigation, { StoreNavigationProps } from "./StoreNavigation";
import BackgroundVideo from "../media/BackgroundVideo";
import { MEDIA } from "../../../lib/media";

export default function HomeNavbar(props: StoreNavigationProps) {
  return (
    <Box className="coco-home-header">
      <BackgroundVideo
        className="coco-home-header__video"
        src={MEDIA.hero.video}
        mobileSrc={MEDIA.hero.mobileVideo}
        poster={MEDIA.hero.poster}
        label="homepage background film"
      />
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
