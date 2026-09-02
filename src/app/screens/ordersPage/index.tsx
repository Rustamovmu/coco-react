import { SyntheticEvent, useState } from "react";
import { Box, Container, Stack, Tab, Tabs, Typography } from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import "../../../css/order.css";

const tabs = [
  { value: "pending", label: "Pending", count: 1 },
  { value: "progress", label: "In progress", count: 2 },
  { value: "delivered", label: "Delivered", count: 1 },
];

export function OrdersPage() {
  const [value, setValue] = useState("progress");

  const handleChange = (_event: SyntheticEvent, nextValue: string) => setValue(nextValue);

  return (
    <Box className="coco-orders">
      <Container maxWidth="lg">
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end" className="coco-orders__heading">
          <Box>
            <Typography className="coco-orders__eyebrow">YOUR COCO</Typography>
            <Typography component="h1">My orders</Typography>
          </Box>
          <Typography>Follow your current pieces and revisit previous purchases.</Typography>
        </Stack>

        <Box className="coco-orders__layout">
          <Box className="coco-orders__main">
            <Tabs value={value} onChange={handleChange} className="coco-orders__tabs" aria-label="Order status">
              {tabs.map((tab) => <Tab key={tab.value} value={tab.value} label={<span>{tab.label}<b>{tab.count}</b></span>} />)}
            </Tabs>
            <Box className="coco-orders__content">
              {value === "pending" && <PausedOrders />}
              {value === "progress" && <ProcessOrders />}
              {value === "delivered" && <FinishedOrders />}
            </Box>
          </Box>

          <Box component="aside" className="coco-orders__aside">
            <Box className="coco-orders__member">
              <Box className="coco-orders__avatar">M</Box>
              <Box>
                <Typography component="h2">Martin</Typography>
                <Typography>COCO member</Typography>
              </Box>
            </Box>
            <Box className="coco-orders__address">
              <PlaceOutlinedIcon />
              <Box>
                <Typography component="h3">Delivery address</Typography>
                <Typography>Downtown, Tashkent</Typography>
              </Box>
            </Box>
            <Box className="coco-orders__delivery-note">
              <LocalShippingOutlinedIcon />
              <Typography component="h3">Complimentary delivery</Typography>
              <Typography>Free delivery is applied to orders over $150.</Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
