import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import OrderList, { OrderPreview } from "./OrderList";

const pausedOrders: OrderPreview[] = [
  {
    id: "#CO-1048",
    date: "02 September 2026",
    status: "Payment required",
    statusTone: "warm",
    progress: 18,
    total: 206,
    items: [
      {
        name: "Everyday Trench Coat",
        details: "Stone · M · Qty 1",
        price: 118,
        image: "https://images.pexels.com/photos/6069552/pexels-photo-6069552.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
      {
        name: "Soft Knit Scarf",
        details: "Oatmeal · One size · Qty 1",
        price: 88,
        image: "https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
    ],
  },
];

export default function PausedOrders() {
  return (
    <Stack className="coco-paused-orders">
      <Stack direction="row" alignItems="center" className="coco-paused-orders__notice">
        <Box className="coco-paused-orders__notice-icon"><PaymentOutlinedIcon /></Box>
        <Box className="coco-paused-orders__notice-copy">
          <Typography component="h2">Complete your order</Typography>
          <Typography>Your pieces are reserved while we wait for payment confirmation.</Typography>
        </Box>
        <Stack direction="row" alignItems="center" className="coco-paused-orders__timer">
          <AccessTimeOutlinedIcon /> Reserved for 23:48
        </Stack>
      </Stack>

      <OrderList
        orders={pausedOrders}
        emptyMessage="You have no orders awaiting action."
        primaryAction="Continue checkout"
        secondaryAction="Cancel order"
      />
    </Stack>
  );
}
