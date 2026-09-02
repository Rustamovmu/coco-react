import React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

const atelierSteps = [
  { number: "01", title: "The idea", detail: "Each silhouette begins with movement, purpose, and the woman who will wear it." },
  { number: "02", title: "The material", detail: "We select tactile fabrics for graceful drape, lasting comfort, and considered coverage." },
  { number: "03", title: "The finish", detail: "Every seam and detail is refined by hand before a piece becomes part of COCO." },
];

export default function Events() {
  return (
    <Box component="section" className="coco-atelier" aria-labelledby="atelier-title">
      <Container maxWidth="lg">
        <Box className="coco-atelier__layout">
          <Box className="coco-atelier__visual">
            <Box
              component="img"
              src="https://primadonsanddonnas.com/cdn/shop/articles/1771477863371_image.png?v=1771477917"
              alt="Designer developing a garment inside a light-filled fashion atelier"
              loading="lazy"
            />
            <Box className="coco-atelier__visual-shade" />
            <Typography className="coco-atelier__image-label">THE MAKING OF COCO · 2026</Typography>
            <Typography className="coco-atelier__image-number">01 / 03</Typography>
          </Box>

          <Box className="coco-atelier__story">
            <Typography className="coco-atelier__eyebrow">BEHIND THE SEAMS</Typography>
            <Typography component="h2" id="atelier-title" className="coco-atelier__title">
              Inside the<br />COCO atelier.
            </Typography>
            <Typography className="coco-atelier__intro">
              Thoughtful clothing takes time. From the first line on paper to the final stitch, our process is guided by restraint, precision, and respect for the material.
            </Typography>

            <Box className="coco-atelier__steps">
              {atelierSteps.map((step) => (
                <Stack direction="row" className="coco-atelier__step" key={step.number}>
                  <Typography className="coco-atelier__step-number">{step.number}</Typography>
                  <Box>
                    <Typography component="h3">{step.title}</Typography>
                    <Typography>{step.detail}</Typography>
                  </Box>
                </Stack>
              ))}
            </Box>

            <Stack direction="row" alignItems="center" className="coco-atelier__ending">
              <Box
                component="img"
                src="https://burst.shopifycdn.com/photos/scissors-cutting-fabric.jpg?exif=0&format=pjpg&iptc=0&width=925"
                alt="Tailor cutting fabric with precision"
                loading="lazy"
              />
              <Button component={Link} to="/products" endIcon={<ArrowForwardIcon />}>
                Discover the collection
              </Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
