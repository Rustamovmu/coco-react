import React, { useState } from "react";
import { Avatar, Box, Button, Container, IconButton, ListItemIcon, Menu, MenuItem, Stack, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink } from "react-router-dom";
import { CartInterface } from "../../../lib/types/cart";
import { Member } from "../../../lib/types/member";
import ShoppingCart from "./ShoppingCart";
import { serverApi } from "../../../lib/config";
import "../../../css/navbar.css";

export interface StoreNavigationProps {
  authMember?: Member | null;
  cart?: CartInterface;
  onLogin?: () => void;
  onSignup?: () => void;
  onLogout?: () => void;
  onCheckout?: () => void;
  transparent?: boolean;
}

export default function StoreNavigation({ authMember, cart, onLogin, onSignup, onLogout, onCheckout, transparent = false }: StoreNavigationProps) {
  const [accountAnchor, setAccountAnchor] = useState<HTMLElement | null>(null);
  const memberName = authMember?.memberName || "Member";
  const memberImage = authMember?.memberImage
    ? (authMember.memberImage.startsWith("http") ? authMember.memberImage : `${serverApi}/${authMember.memberImage}`)
    : "/icons/default-user.svg";

  return (
    <Box component="header" className={`coco-header${transparent ? " coco-header--transparent" : ""}`}>
      <Container maxWidth="lg">
        <Stack direction="row" alignItems="center" justifyContent="space-between" className="coco-header__inner">
          <NavLink to="/" className="coco-header__brand" aria-label="Coco home">COCO</NavLink>
          <Stack component="nav" direction="row" alignItems="center" className="coco-header__links">
            <NavLink exact to="/" activeClassName="coco-header__link--active">Home</NavLink>
            <NavLink to="/products" activeClassName="coco-header__link--active">Shop</NavLink>
            {authMember && <NavLink to="/orders" activeClassName="coco-header__link--active">Orders</NavLink>}
            <NavLink to="/help" activeClassName="coco-header__link--active">Help</NavLink>
            {authMember && <NavLink to="/member-page" activeClassName="coco-header__link--active">Account</NavLink>}
          </Stack>
          <Stack direction="row" alignItems="center" className="coco-header__actions">
            {cart && <ShoppingCart cart={cart} onCheckout={onCheckout} />}
            {authMember ? (
              <Stack direction="row" alignItems="center" className="coco-header__account">
                <Typography className="coco-header__member-name">{memberName}</Typography>
                <IconButton
                  className="coco-header__avatar-button"
                  aria-label="Open account menu"
                  aria-controls={accountAnchor ? "coco-account-menu" : undefined}
                  aria-expanded={accountAnchor ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={(event) => setAccountAnchor(event.currentTarget)}
                >
                  <Avatar src={memberImage} alt={memberName}>{memberName.charAt(0)}</Avatar>
                </IconButton>
                <Menu
                  anchorEl={accountAnchor}
                  id="coco-account-menu"
                  open={Boolean(accountAnchor)}
                  onClose={() => setAccountAnchor(null)}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                >
                  <MenuItem
                    onClick={() => {
                      setAccountAnchor(null);
                      onLogout?.();
                    }}
                  >
                    <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
                    Log out
                  </MenuItem>
                </Menu>
              </Stack>
            ) : (
              <Stack direction="row" className="coco-header__auth">
                {onLogin && <Button onClick={onLogin}>Log in</Button>}
                <Button variant="contained" onClick={onSignup}>Sign up</Button>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
