import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import OrderList from "./OrderList";
import { useAppSelector } from "../../hooks";
import { selectProcessingOrders } from "./selector";

const trackingSteps = ["Confirmed", "Prepared", "Dispatched", "Delivered"];

export default function ProcessOrders() {
  const orders = useAppSelector(selectProcessingOrders);
  return <Stack className="coco-process-orders">
    {orders.length > 0 && <Box className="coco-process-orders__tracker"><Stack direction="row" justifyContent="space-between" alignItems="center" className="coco-process-orders__tracker-head"><Stack direction="row" alignItems="center"><Box className="coco-process-orders__truck"><LocalShippingOutlinedIcon /></Box><Box><Typography component="h2">Your order is moving</Typography><Typography>{orders.length} active {orders.length === 1 ? "order" : "orders"}</Typography></Box></Stack></Stack><Box className="coco-process-orders__timeline">{trackingSteps.map((label, index) => <Box className={`coco-process-orders__step coco-process-orders__step--${index === 0 ? "complete" : "upcoming"}`} key={label}><span /><Typography>{label}</Typography></Box>)}</Box></Box>}
    <OrderList orders={orders} emptyMessage="You have no orders in progress." />
  </Stack>;
}
