import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { Alert, Box, CircularProgress, Container, Dialog, DialogContent, DialogTitle, IconButton, Stack, Tab, Tabs, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import PaymentDetailsForm from "../../components/payment/PaymentDetailsForm";
import { getPaymentMethod, PaymentMethod, savePaymentMethod } from "../../../lib/payment";
import "../../../css/order.css";

interface OrdersPageProps { authMember: Member | null; }

export function OrdersPage({ authMember }: OrdersPageProps) {
  const dispatch = useAppDispatch();
  const counts = useAppSelector(selectOrderCounts);
  const [value, setValue] = useState("progress");
  const [loading, setLoading] = useState(Boolean(authMember));
  const [error, setError] = useState("");
  const [paymentOrderId, setPaymentOrderId] = useState<string | null>(null);
  const [completing, setCompleting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(() => authMember ? getPaymentMethod(authMember._id) : null);

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

  const completeOrder = async (orderId: string, method: PaymentMethod) => {
    if (!authMember) return;
    setCompleting(true);
    try {
      savePaymentMethod(authMember._id, method);
      setPaymentMethod(method);
      await new OrderService().updateOrder({ orderId, orderStatus: OrderStatus.PAID });
      setPaymentOrderId(null);
      setValue("progress");
      await loadOrders();
      await sweetTopSmallSuccessAlert("Order completed successfully");
    } catch (requestError) {
      await sweetErrorHandling(requestError);
    } finally {
      setCompleting(false);
    }
  };

  const beginCompleteOrder = (orderId: string) => {
    if (paymentMethod) void completeOrder(orderId, paymentMethod);
    else setPaymentOrderId(orderId);
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
            <Box className="coco-orders__content">{value === "pending" && <PausedOrders onCancel={cancelOrder} onComplete={beginCompleteOrder} />}{value === "progress" && <ProcessOrders />}{value === "completed" && <FinishedOrders />}</Box>
          </Box>
          <Box component="aside" className="coco-orders__aside">
            <Box className="coco-orders__member"><Box className="coco-orders__avatar">{initials}</Box><Box><Typography component="h2">{authMember.memberNick}</Typography><Typography>COCO member</Typography></Box></Box>
            <Box className="coco-orders__address"><PlaceOutlinedIcon /><Box><Typography component="h3">Delivery address</Typography><Typography>{authMember.memberAddress || "Add an address in your profile"}</Typography></Box></Box>
            <Box className="coco-orders__delivery-note"><LocalShippingOutlinedIcon /><Typography component="h3">Complimentary delivery</Typography><Typography>Free delivery is applied to orders over $150.</Typography></Box>
          </Box>
        </Box>}
        <Dialog open={Boolean(paymentOrderId)} onClose={() => !completing && setPaymentOrderId(null)} fullWidth maxWidth="sm">
          <DialogTitle>Complete your order<IconButton aria-label="Close" onClick={() => setPaymentOrderId(null)} disabled={completing} sx={{ position: "absolute", right: 10, top: 10 }}><CloseIcon /></IconButton></DialogTitle>
          <DialogContent><Typography sx={{ mb: 2, color: "text.secondary" }}>Enter your payment information to confirm this demo order.</Typography><PaymentDetailsForm savedMethod={paymentMethod} submitting={completing} submitLabel="Complete order" onSubmit={(method) => { if (paymentOrderId) return completeOrder(paymentOrderId, method); }} /></DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
}
