import React from "react";
import { Box, Button, Container, IconButton, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { Link } from "react-router-dom";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { MEDIA } from "../../../lib/media";
import BackgroundVideo from "../../components/media/BackgroundVideo";
import LocalImage from "../../components/media/LocalImage";
import useMediaQuery from "../../hooks/useMediaQuery";

const campaignSlides = [
  {
    image: MEDIA.images.softTailoring,
    label: "Soft tailoring",
    number: "01",
  },
  {
    image: MEDIA.images.neutralEdit,
    label: "The neutral edit",
    number: "02",
  },
  {
    image: MEDIA.images.everydayLayers,
    label: "Everyday layers",
    number: "03",
  },
];

export default function Advertisement() {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  return (
    <Box component="section" className="coco-campaign" aria-labelledby="campaign-title">
      <Container maxWidth="lg">
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end" className="coco-campaign__header">
          <Box>
            <Typography className="coco-campaign__eyebrow">COCO STORIES · VOLUME 01</Typography>
            <Typography component="h2" id="campaign-title" className="coco-campaign__title">
              More than what you wear.
            </Typography>
          </Box>
          <Typography className="coco-campaign__intro">
            A study in movement, texture, and the quiet confidence of dressing for yourself.
          </Typography>
        </Stack>

        <Box className="coco-campaign__layout">
          <Box className="coco-campaign__film">
            <BackgroundVideo src={MEDIA.campaign.video} mobileSrc={MEDIA.campaign.mobileVideo} poster={MEDIA.campaign.poster} label="campaign background film" lazy />
            <Box className="coco-campaign__film-shade" />
            <Box className="coco-campaign__film-copy">
              <Stack direction="row" alignItems="center" className="coco-campaign__watch">
                <Box className="coco-campaign__play"><PlayArrowRoundedIcon /></Box>
                <Box>
                  <Typography>Campaign film</Typography>
                  <Typography>COCO / AW 2026</Typography>
                </Box>
              </Stack>
              <Typography component="h3">Clothes made<br />to move with you.</Typography>
            </Box>
          </Box>

          <Box className="coco-campaign__gallery">
            <Swiper
              className="coco-campaign__swiper"
              modules={[Autoplay, Navigation, Pagination]}
              slidesPerView={1}
              loop
              grabCursor
              autoplay={reducedMotion ? false : { delay: 4500, disableOnInteraction: false }}
              speed={reducedMotion ? 0 : 300}
              navigation={{ prevEl: ".coco-campaign__previous", nextEl: ".coco-campaign__next" }}
              pagination={{ clickable: true }}
            >
              {campaignSlides.map((slide) => (
                <SwiperSlide key={slide.number}>
                  <Box className="coco-campaign__slide">
                    <LocalImage asset={slide.image} alt={slide.label} sizes="(max-width: 900px) 100vw, 45vw" />
                    <Box className="coco-campaign__slide-shade" />
                    <Typography className="coco-campaign__slide-number">{slide.number}</Typography>
                    <Typography className="coco-campaign__slide-label">{slide.label}</Typography>
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>

            <Stack direction="row" justifyContent="space-between" alignItems="center" className="coco-campaign__footer">
              <Stack direction="row" className="coco-campaign__controls">
                <IconButton className="coco-campaign__previous" aria-label="Previous campaign image">
                  <ArrowBackIcon />
                </IconButton>
                <IconButton className="coco-campaign__next" aria-label="Next campaign image">
                  <ArrowForwardIcon />
                </IconButton>
              </Stack>
              <Button component={Link} to="/products" endIcon={<ArrowForwardIcon />}>
                Shop the story
              </Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
