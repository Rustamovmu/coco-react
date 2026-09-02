import React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { CartInterface } from "../../../lib/types/cart";
import { Member } from "../../../lib/types/member";
import ShoppingCart from "./ShoppingCart";
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
  return (
    <Box component="header" className={`coco-header${transparent ? " coco-header--transparent" : ""}`}>
      <Container maxWidth="lg">
        <Stack direction="row" alignItems="center" justifyContent="space-between" className="coco-header__inner">
          <NavLink to="/" className="coco-header__brand" aria-label="Coco home">COCO</NavLink>
          <Stack component="nav" direction="row" alignItems="center" className="coco-header__links">
            <NavLink exact to="/" activeClassName="coco-header__link--active">Home</NavLink>
            <NavLink to="/products" activeClassName="coco-header__link--active">Shop</NavLink>
            <NavLink to="/help" activeClassName="coco-header__link--active">Help</NavLink>
            {authMember && <NavLink to="/member-page" activeClassName="coco-header__link--active">Account</NavLink>}
          </Stack>
          <Stack direction="row" alignItems="center" className="coco-header__actions">
            {cart && <ShoppingCart cart={cart} onCheckout={onCheckout} />}
            {authMember ? (
              <Stack direction="row" alignItems="center" className="coco-header__account">
                <Typography>{authMember.memberName}</Typography>
                <Button onClick={onLogout}>Log out</Button>
              </Stack>
            ) : (
              <Stack direction="row" className="coco-header__auth">
                <Button onClick={onLogin}>Log in</Button>
                <Button variant="contained" onClick={onSignup}>Sign up</Button>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
