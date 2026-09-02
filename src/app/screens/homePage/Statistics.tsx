import React from "react";
import { Box, Container, Typography } from "@mui/material";

const statistics = [
  { value: "150+", label: "Curated styles" },
  { value: "5", label: "Collections" },
  { value: "48h", label: "Fast dispatch" },
  { value: "4.9/5", label: "Customer rating" },
];

export default function Statistics() {
  return (
    <Box component="section" className="coco-statistics" aria-label="Coco store highlights">
      <Container maxWidth="lg">
        <Box className="coco-statistics__grid">
          {statistics.map((statistic) => (
            <Box className="coco-statistics__item" key={statistic.label}>
              <Typography component="strong" className="coco-statistics__value">
                {statistic.value}
              </Typography>
              <Typography className="coco-statistics__label">
                {statistic.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
