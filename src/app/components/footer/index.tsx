import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
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
        <Stack className="coco-footer__content">
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
            <Typography component="h2" className="coco-footer__heading">Contact</Typography>
            <Stack className="coco-footer__contact">
              <span>Downtown, Tashkent</span>
              <a href="tel:+998901234567">+998 90 123 45 67</a>
              <a href="mailto:hello@coco.uz">hello@coco.uz</a>
              <span>Mon–Sun, 10:00–22:00</span>
            </Stack>
          </Box>
        </Stack>

        <Box className="coco-footer__divider" />
        <Typography className="coco-footer__copyright">
          © {new Date().getFullYear()} COCO. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
