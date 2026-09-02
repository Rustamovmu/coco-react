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

const campaignSlides = [
  {
    image: "https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=1400",
    label: "Soft tailoring",
    number: "01",
  },
  {
    image: "https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg?auto=compress&cs=tinysrgb&w=1400",
    label: "The neutral edit",
    number: "02",
  },
  {
    image: "https://images.pexels.com/photos/6069552/pexels-photo-6069552.jpeg?auto=compress&cs=tinysrgb&w=1400",
    label: "Everyday layers",
    number: "03",
  },
];

export default function Advertisement() {
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
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="https://images.pexels.com/videos/7667427/pexels-photo-7667427.jpeg?auto=compress&dpr=1&h=750&w=1260"
              aria-label="COCO fashion campaign film"
            >
              <source
                src="https://videos.pexels.com/video-files/7667427/7667427-uhd_4096_2160_25fps.mp4"
                type="video/mp4"
              />
            </video>
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
              autoplay={{ delay: 4500, disableOnInteraction: false }}
              navigation={{ prevEl: ".coco-campaign__previous", nextEl: ".coco-campaign__next" }}
              pagination={{ clickable: true }}
            >
              {campaignSlides.map((slide) => (
                <SwiperSlide key={slide.number}>
                  <Box className="coco-campaign__slide">
                    <Box component="img" src={slide.image} alt={slide.label} loading="lazy" />
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
