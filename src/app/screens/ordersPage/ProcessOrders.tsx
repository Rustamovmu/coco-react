import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import OrderList, { OrderPreview } from "./OrderList";

const trackingSteps = [
  { label: "Confirmed", state: "complete" },
  { label: "Prepared", state: "complete" },
  { label: "Dispatched", state: "current" },
  { label: "Delivered", state: "upcoming" },
];

const processOrders: OrderPreview[] = [
  {
    id: "#CO-1045",
    date: "31 August 2026",
    status: "On the way",
    statusTone: "dark",
    progress: 72,
    total: 184,
    items: [
      {
        name: "Tailored Wide-Leg Pants",
        details: "Espresso · M · Qty 1",
        price: 96,
        image: "https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
      {
        name: "Soft Knit Scarf",
        details: "Oatmeal · One size · Qty 1",
        price: 88,
        image: "https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
    ],
  },
  {
    id: "#CO-1046",
    date: "01 September 2026",
    status: "Being prepared",
    statusTone: "warm",
    progress: 42,
    total: 129,
    items: [
      {
        name: "Classic Oversized Shirt",
        details: "Ivory · S · Qty 1",
        price: 129,
        image: "https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
    ],
  },
];

export default function ProcessOrders() {
  return (
    <Stack className="coco-process-orders">
      <Box className="coco-process-orders__tracker">
        <Stack direction="row" justifyContent="space-between" alignItems="center" className="coco-process-orders__tracker-head">
          <Stack direction="row" alignItems="center">
            <Box className="coco-process-orders__truck"><LocalShippingOutlinedIcon /></Box>
            <Box>
              <Typography component="h2">Your order is moving</Typography>
              <Typography>Tracking #COCO-59280417</Typography>
            </Box>
          </Stack>
          <Box className="coco-process-orders__eta">
            <Typography>Estimated arrival</Typography>
            <Typography component="strong">04 September</Typography>
          </Box>
        </Stack>

        <Box className="coco-process-orders__timeline">
          {trackingSteps.map((step) => (
            <Box className={`coco-process-orders__step coco-process-orders__step--${step.state}`} key={step.label}>
              <span />
              <Typography>{step.label}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <OrderList
        orders={processOrders}
        emptyMessage="You have no orders in progress."
        primaryAction="Track package"
        secondaryAction="Get help"
      />
    </Stack>
  );
}
