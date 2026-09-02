import React from "react";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export interface OrderPreview {
  id: string;
  date: string;
  status: string;
  statusTone: "warm" | "dark" | "success";
  progress: number;
  total: number;
  items: Array<{ name: string; details: string; price: number; image: string }>;
}

const formatPrice = (value: number) => `$${value.toFixed(2)}`;

export default function OrderList({ orders, emptyMessage }: { orders: OrderPreview[]; emptyMessage: string }) {
  if (!orders.length) return <Box className="coco-orders__empty">{emptyMessage}</Box>;

  return (
    <Stack className="coco-order-list">
      {orders.map((order) => (
        <Box component="article" className="coco-order-card" key={order.id}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" className="coco-order-card__top">
            <Box>
              <Typography component="h2">Order {order.id}</Typography>
              <Typography>Placed {order.date}</Typography>
            </Box>
            <Chip label={order.status} className={`coco-order-card__status coco-order-card__status--${order.statusTone}`} />
          </Stack>
          <Box className="coco-order-card__progress"><span style={{ width: `${order.progress}%` }} /></Box>
          <Stack className="coco-order-card__items">
            {order.items.map((item) => (
              <Stack direction="row" alignItems="center" className="coco-order-item" key={item.name}>
                <Box component="img" src={item.image} alt={item.name} />
                <Box className="coco-order-item__copy">
                  <Typography component="h3">{item.name}</Typography>
                  <Typography>{item.details}</Typography>
                </Box>
                <Typography className="coco-order-item__price">{formatPrice(item.price)}</Typography>
              </Stack>
            ))}
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center" className="coco-order-card__bottom">
            <Typography>Total <strong>{formatPrice(order.total)}</strong></Typography>
            <Button endIcon={<ArrowForwardIcon />}>Order details</Button>
          </Stack>
        </Box>
      ))}
    </Stack>
  );
}
