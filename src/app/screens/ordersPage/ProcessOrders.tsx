import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import OrderList from "./OrderList";
import { useAppSelector } from "../../hooks";
import { selectProcessingOrders } from "./selector";
import { OrderStatus } from "../../../lib/enums/order.enum";

const trackingSteps = ["Confirmed", "Prepared", "Dispatched", "Delivered"];
const statusStep: Record<OrderStatus.PAID | OrderStatus.PROCESSING | OrderStatus.SHIPPED, number> = {
  [OrderStatus.PAID]: 0,
  [OrderStatus.PROCESSING]: 1,
  [OrderStatus.SHIPPED]: 2,
};

export default function ProcessOrders() {
  const orders = useAppSelector(selectProcessingOrders);
  const trackedOrder = orders[0];
  const currentStep = trackedOrder ? statusStep[trackedOrder.orderStatus as keyof typeof statusStep] : 0;
  return <Stack className="coco-process-orders">
    {trackedOrder && <Box className="coco-process-orders__tracker"><Stack direction="row" justifyContent="space-between" alignItems="center" className="coco-process-orders__tracker-head"><Stack direction="row" alignItems="center"><Box className="coco-process-orders__truck"><LocalShippingOutlinedIcon /></Box><Box><Typography component="h2">Your order is moving</Typography><Typography>Tracking order #{trackedOrder._id.slice(-8).toUpperCase()}</Typography></Box></Stack><Typography className="coco-process-orders__active-count">{orders.length} active {orders.length === 1 ? "order" : "orders"}</Typography></Stack><Box className="coco-process-orders__timeline">{trackingSteps.map((label, index) => { const state = index < currentStep ? "complete" : index === currentStep ? "current" : "upcoming"; return <Box className={`coco-process-orders__step coco-process-orders__step--${state}`} key={label}><span /><Typography>{label}</Typography></Box>; })}</Box></Box>}
    <OrderList orders={orders} emptyMessage="You have no orders in progress." />
  </Stack>;
}
