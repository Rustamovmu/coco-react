import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
// @ts-ignore: Allow side-effect CSS import without type declarations
import "../../../css/footer.css";

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com" },
  { label: "Facebook", href: "https://www.facebook.com" },
  { label: "TikTok", href: "https://www.tiktok.com" },
];

export default function Footer() {
  return (
    <Box component="footer" className="coco-footer">
      <Container maxWidth="lg">
        <Box className="coco-footer__support">
          <Typography>Need help with sizing, delivery, or returns?</Typography>
          <Link to="/help">Visit customer care <ArrowForwardIcon /></Link>
        </Box>

        <Box className="coco-footer__content">
          <Box className="coco-footer__brand">
            <Typography component="p" className="coco-footer__logo">COCO</Typography>
            <Typography className="coco-footer__description">
              Everyday pieces for a confident wardrobe. Discover clothing, shoes,
              and accessories selected for your style.
            </Typography>
            <Stack direction="row" className="coco-footer__socials">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
                  {social.label}
                </a>
              ))}
            </Stack>
          </Box>

          <Box className="coco-footer__section">
            <Typography component="h2" className="coco-footer__heading">Explore</Typography>
            <Stack className="coco-footer__links">
              <Link to="/">Home</Link>
              <Link to="/products">Shop</Link>
              <Link to="/help">Help</Link>
            </Stack>
          </Box>

          <Box className="coco-footer__section">
            <Typography component="h2" className="coco-footer__heading">Customer care</Typography>
            <Stack className="coco-footer__links">
              <Link to="/help">Size guide</Link>
              <Link to="/help">Delivery</Link>
              <Link to="/help">Returns</Link>
            </Stack>
          </Box>

          <Box className="coco-footer__section">
            <Typography component="h2" className="coco-footer__heading">Contact</Typography>
            <Stack className="coco-footer__contact">
              <span>Downtown, Tashkent</span>
              <a href="tel:+998901234567">+998 90 123 45 67</a>
              <a href="mailto:hello@coco.uz">hello@coco.uz</a>
            </Stack>
          </Box>
        </Box>

        <Box className="coco-footer__bottom">
          <Typography>© {new Date().getFullYear()} COCO. All rights reserved.</Typography>
          <Typography>Tashkent · Mon–Sun, 10:00–22:00</Typography>
        </Box>
      </Container>
    </Box>
  );
}
