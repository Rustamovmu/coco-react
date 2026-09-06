import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import OrderList from "./OrderList";
import { useAppSelector } from "../../hooks";
import { selectPendingOrders } from "./selector";

export default function PausedOrders({ onCancel, onComplete }: { onCancel: (orderId: string) => void; onComplete: (orderId: string) => void }) {
  const orders = useAppSelector(selectPendingOrders);
  return <Stack className="coco-paused-orders">
    {orders.length > 0 && <Stack direction="row" alignItems="center" className="coco-paused-orders__notice"><Box className="coco-paused-orders__notice-icon"><PaymentOutlinedIcon /></Box><Box className="coco-paused-orders__notice-copy"><Typography component="h2">Complete your order</Typography><Typography>Your pieces are reserved while we wait for payment confirmation.</Typography></Box></Stack>}
    <OrderList orders={orders} emptyMessage="You have no orders awaiting action." onCancel={onCancel} onComplete={onComplete} />
  </Stack>;
}
