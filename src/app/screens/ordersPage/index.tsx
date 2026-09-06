import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { Alert, Box, CircularProgress, Container, Stack, Tab, Tabs, Typography } from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import OrderService from "../../services/OrderService";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { resetOrders, setCompletedOrders, setPendingOrders, setProcessingOrders } from "./slice";
import { selectOrderCounts } from "./selector";
import { Member } from "../../../lib/types/member";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import "../../../css/order.css";

interface OrdersPageProps { authMember: Member | null; }

export function OrdersPage({ authMember }: OrdersPageProps) {
  const dispatch = useAppDispatch();
  const counts = useAppSelector(selectOrderCounts);
  const [value, setValue] = useState("progress");
  const [loading, setLoading] = useState(Boolean(authMember));
  const [error, setError] = useState("");

  const loadOrders = useCallback(async () => {
    if (!authMember) {
      dispatch(resetOrders());
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const orders = await new OrderService().getMyOrders({ page: 1, limit: 100 });
      dispatch(setPendingOrders(orders.filter((order) => order.orderStatus === OrderStatus.PENDING)));
      dispatch(setProcessingOrders(orders.filter((order) => [OrderStatus.PAID, OrderStatus.PROCESSING, OrderStatus.SHIPPED].includes(order.orderStatus))));
      dispatch(setCompletedOrders(orders.filter((order) => [OrderStatus.DELIVERED, OrderStatus.CANCELLED].includes(order.orderStatus))));
    } catch {
      setError("We could not load your orders right now.");
    } finally {
      setLoading(false);
    }
  }, [authMember, dispatch]);

  useEffect(() => { loadOrders(); }, [loadOrders]);

  const cancelOrder = async (orderId: string) => {
    try {
      await new OrderService().updateOrder({ orderId, orderStatus: OrderStatus.CANCELLED });
      await loadOrders();
    } catch (requestError) {
      await sweetErrorHandling(requestError);
    }
  };

  const tabs = [
    { value: "pending", label: "Pending", count: counts.pending },
    { value: "progress", label: "In progress", count: counts.processing },
    { value: "completed", label: "Completed", count: counts.completed },
  ];

  const handleChange = (_event: SyntheticEvent, nextValue: string) => setValue(nextValue);
  const initials = authMember?.memberNick.slice(0, 2).toUpperCase() || "CO";

  return (
    <Box className="coco-orders">
      <Container maxWidth="lg">
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end" className="coco-orders__heading"><Box><Typography className="coco-orders__eyebrow">YOUR COCO</Typography><Typography component="h1">My orders</Typography></Box><Typography>Follow your current pieces and revisit previous purchases.</Typography></Stack>
        {!authMember && <Alert severity="info">Please sign in to view your orders.</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {loading && <Stack alignItems="center" sx={{ py: 8 }}><CircularProgress size={30} /></Stack>}
        {!loading && authMember && <Box className="coco-orders__layout">
          <Box className="coco-orders__main">
            <Tabs value={value} onChange={handleChange} className="coco-orders__tabs" aria-label="Order status">{tabs.map((tab) => <Tab key={tab.value} value={tab.value} label={<span>{tab.label}<b>{tab.count}</b></span>} />)}</Tabs>
            <Box className="coco-orders__content">{value === "pending" && <PausedOrders onCancel={cancelOrder} />}{value === "progress" && <ProcessOrders />}{value === "completed" && <FinishedOrders />}</Box>
          </Box>
          <Box component="aside" className="coco-orders__aside">
            <Box className="coco-orders__member"><Box className="coco-orders__avatar">{initials}</Box><Box><Typography component="h2">{authMember.memberNick}</Typography><Typography>COCO member</Typography></Box></Box>
            <Box className="coco-orders__address"><PlaceOutlinedIcon /><Box><Typography component="h3">Delivery address</Typography><Typography>{authMember.memberAddress || "Add an address in your profile"}</Typography></Box></Box>
            <Box className="coco-orders__delivery-note"><LocalShippingOutlinedIcon /><Typography component="h3">Complimentary delivery</Typography><Typography>Free delivery is applied to orders over $150.</Typography></Box>
          </Box>
        </Box>}
      </Container>
    </Box>
  );
}
