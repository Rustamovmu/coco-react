import React, { useState } from "react";
import { Badge, Box, Button, IconButton, Menu, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { CartInterface } from "../../../lib/types/cart";
import { CartItem } from "../../../lib/types/search";

interface ShoppingCartProps {
  cart: CartInterface;
  onCheckout?: () => void;
}

const formatPrice = (price: number) => `$${price.toFixed(2)}`;

export default function ShoppingCart({ cart, onCheckout }: ShoppingCartProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const itemCount = cart.cartItems.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.cartItems.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0,
  );

  const closeCart = () => setAnchorEl(null);

  return (
    <Box>
      <IconButton
        aria-label="Open shopping cart"
        aria-controls={anchorEl ? "shopping-cart-menu" : undefined}
        aria-expanded={anchorEl ? "true" : undefined}
        aria-haspopup="true"
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <Badge badgeContent={itemCount} color="primary">
          <ShoppingBagOutlinedIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="shopping-cart-menu"
        open={Boolean(anchorEl)}
        onClose={closeCart}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        PaperProps={{ className: "coco-cart-menu" }}
      >
        <Stack className="coco-cart-menu__content">
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography className="coco-cart-menu__title">Your bag</Typography>
            {cart.cartItems.length > 0 && (
              <Button size="small" onClick={cart.onDeleteAll}>Clear</Button>
            )}
          </Stack>

          {cart.cartItems.length === 0 ? (
            <Typography className="coco-cart-menu__empty">Your bag is empty.</Typography>
          ) : (
            <>
              <Stack className="coco-cart-menu__items">
                {cart.cartItems.map((item) => (
                  <CartRow key={`${item.productId}-${item.selectedSize}-${item.selectedColor ?? ""}`} item={item} cart={cart} />
                ))}
              </Stack>
              <Stack direction="row" justifyContent="space-between" className="coco-cart-menu__subtotal">
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </Stack>
              <Button
                variant="contained"
                onClick={() => {
                  closeCart();
                  onCheckout?.();
                }}
              >
                Checkout
              </Button>
            </>
          )}
        </Stack>
      </Menu>
    </Box>
  );
}

function CartRow({ item, cart }: { item: CartItem; cart: CartInterface }) {
  return (
    <Stack direction="row" spacing={1.5} alignItems="center">
      <img className="coco-cart-menu__image" src={item.imageUrl} alt={item.productName} />
      <Box className="coco-cart-menu__item-details">
        <Typography>{item.productName}</Typography>
        <Typography variant="caption">
          {item.selectedSize}{item.selectedColor ? ` · ${item.selectedColor}` : ""}
        </Typography>
        <Typography variant="body2">{formatPrice(item.unitPrice)}</Typography>
      </Box>
      <Stack direction="row" alignItems="center" className="coco-cart-menu__quantity">
        <Button aria-label={`Remove one ${item.productName}`} onClick={() => cart.onRemove(item)}>-</Button>
        <span>{item.quantity}</span>
        <Button
          aria-label={`Add one ${item.productName}`}
          onClick={() => cart.onAdd({ ...item, quantity: 1 })}
        >
          +
        </Button>
      </Stack>
      <IconButton aria-label={`Remove ${item.productName}`} size="small" onClick={() => cart.onDelete(item)}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
}
