import React from "react";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { Order } from "../../../lib/types/order";

const formatPrice = (value: number) => `$${value.toFixed(2)}`;
const statusMeta: Record<OrderStatus, { label: string; tone: "warm" | "dark" | "success"; progress: number }> = {
  [OrderStatus.PENDING]: { label: "Payment required", tone: "warm", progress: 18 },
  [OrderStatus.PAID]: { label: "Confirmed", tone: "dark", progress: 30 },
  [OrderStatus.PROCESSING]: { label: "Being prepared", tone: "dark", progress: 50 },
  [OrderStatus.SHIPPED]: { label: "On the way", tone: "dark", progress: 75 },
  [OrderStatus.DELIVERED]: { label: "Delivered", tone: "success", progress: 100 },
  [OrderStatus.CANCELLED]: { label: "Cancelled", tone: "warm", progress: 100 },
};

interface OrderListProps {
  orders: Order[];
  emptyMessage: string;
  onCancel?: (orderId: string) => void;
}

export default function OrderList({ orders, emptyMessage, onCancel }: OrderListProps) {
  if (!orders.length) return <Box className="coco-orders__empty">{emptyMessage}</Box>;

  return <Stack className="coco-order-list">{orders.map((order) => {
    const meta = statusMeta[order.orderStatus];
    return <Box component="article" className="coco-order-card" key={order._id}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" className="coco-order-card__top"><Box><Typography component="h2">Order #{order._id.slice(-8).toUpperCase()}</Typography><Typography>Placed {new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "long", year: "numeric" }).format(order.createdAt)}</Typography></Box><Chip label={meta.label} className={`coco-order-card__status coco-order-card__status--${meta.tone}`} /></Stack>
      <Box className="coco-order-card__progress"><span style={{ width: `${meta.progress}%` }} /></Box>
      <Stack className="coco-order-card__items">{order.orderItems.map((item) => <Stack direction="row" alignItems="center" className="coco-order-item" key={item._id}><Box component="img" src={item.productImage} alt={item.productName} /><Box className="coco-order-item__copy"><Typography component="h3">{item.productName}</Typography><Typography>{[item.selectedColor, item.selectedSize, `Qty ${item.quantity}`].filter(Boolean).join(" · ")}</Typography></Box><Typography className="coco-order-item__price">{formatPrice(item.unitPrice * item.quantity)}</Typography></Stack>)}</Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center" className="coco-order-card__bottom"><Typography>Total <strong>{formatPrice(order.orderTotal)}</strong>{order.orderShippingFee > 0 && <small> incl. {formatPrice(order.orderShippingFee)} delivery</small>}</Typography>{onCancel && order.orderStatus === OrderStatus.PENDING && <Button className="coco-order-card__secondary" onClick={() => onCancel(order._id)}>Cancel order</Button>}</Stack>
    </Box>;
  })}</Stack>;
}
