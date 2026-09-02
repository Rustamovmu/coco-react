import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import StraightenOutlinedIcon from "@mui/icons-material/StraightenOutlined";
import { faq } from "../../../lib/data/faq";
import "../../../css/help.css";

const supportTopics = [
  { icon: <StraightenOutlinedIcon />, title: "Size & fit", text: "Find your best COCO fit." },
  { icon: <LocalShippingOutlinedIcon />, title: "Delivery", text: "Track timings and locations." },
  { icon: <ReplayOutlinedIcon />, title: "Returns", text: "Simple returns within 14 days." },
];

export function HelpPage() {
  return (
    <Box component="section" className="coco-help">
      <Container maxWidth="lg">
        <Box className="coco-help__topics">
          {supportTopics.map((topic) => (
            <Stack direction="row" alignItems="center" className="coco-help__topic" key={topic.title}>
              <Box className="coco-help__topic-icon">{topic.icon}</Box>
              <Box>
                <Typography component="h2">{topic.title}</Typography>
                <Typography>{topic.text}</Typography>
              </Box>
            </Stack>
          ))}
        </Box>

        <Box className="coco-help__layout">
          <Box className="coco-help__heading">
            <Typography className="coco-help__eyebrow">CUSTOMER CARE</Typography>
            <Typography component="h1">Questions,<br />answered.</Typography>
            <Typography>
              Everything you need to know about shopping with COCO, from choosing your size to receiving and returning an order.
            </Typography>
            <Box className="coco-help__contact-card">
              <Typography component="h2">Still need help?</Typography>
              <Typography>Our customer care team usually replies within one business day.</Typography>
              <a href="mailto:hello@coco.uz">hello@coco.uz</a>
              <a href="tel:+998901234567">+998 90 123 45 67</a>
            </Box>
          </Box>

          <Box className="coco-help__faq">
            {faq.map((item, index) => (
              <Accordion key={item.question} disableGutters elevation={0} defaultExpanded={index === 0}>
                <AccordionSummary expandIcon={<AddIcon />} aria-controls={`faq-${index}-content`} id={`faq-${index}-header`}>
                  <Typography>{item.question}</Typography>
                </AccordionSummary>
                <AccordionDetails id={`faq-${index}-content`}>
                  <Typography>{item.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
