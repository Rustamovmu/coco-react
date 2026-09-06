import OrderList from "./OrderList";
import { useAppSelector } from "../../hooks";
import { selectCompletedOrders } from "./selector";

export default function FinishedOrders() {
  const orders = useAppSelector(selectCompletedOrders);
  return <OrderList orders={orders} emptyMessage="You have no completed orders yet." />;
}
