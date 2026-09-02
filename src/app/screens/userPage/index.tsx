import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Link } from "react-router-dom";
import { Settings } from "./Settings";
import "../../../css/userPage.css";

const accountLinks = [
  { label: "Profile details", icon: <PersonOutlineIcon />, active: true },
  { label: "My orders", icon: <Inventory2OutlinedIcon />, to: "/orders" },
  { label: "Saved pieces", icon: <FavoriteBorderIcon /> },
  { label: "Customer care", icon: <HelpOutlineIcon />, to: "/help" },
];

export function UserPage() {
  return (
    <Box className="coco-account">
      <Container maxWidth="lg">
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end" className="coco-account__heading">
          <Box>
            <Typography className="coco-account__eyebrow">YOUR COCO</Typography>
            <Typography component="h1">My account</Typography>
          </Box>
          <Typography>Manage your details and keep your COCO experience personal.</Typography>
        </Stack>

        <Box className="coco-account__layout">
          <Box component="aside" className="coco-account__sidebar">
            <Box className="coco-account__profile">
              <Box className="coco-account__avatar">M</Box>
              <Box>
                <Typography component="h2">Martin Robertson</Typography>
                <Typography>martin@example.com</Typography>
              </Box>
            </Box>

            <Box component="nav" className="coco-account__nav" aria-label="Account navigation">
              {accountLinks.map((item) => {
                const content = <>{item.icon}<span>{item.label}</span></>;
                return item.to ? (
                  <Link to={item.to} className="coco-account__nav-item" key={item.label}>{content}</Link>
                ) : (
                  <button type="button" className={`coco-account__nav-item${item.active ? " coco-account__nav-item--active" : ""}`} key={item.label}>{content}</button>
                );
              })}
            </Box>

            <Box className="coco-account__membership">
              <Typography>COCO MEMBER</Typography>
              <Typography component="strong">120 points</Typography>
              <Box><span /></Box>
              <Typography>80 points until your next reward</Typography>
            </Box>
          </Box>

          <Settings />
        </Box>
      </Container>
    </Box>
  );
}

export default UserPage;
