import OrderList, { OrderPreview } from "./OrderList";

const orders: OrderPreview[] = [{
  id: "#CO-1048", date: "02 September 2026", status: "Awaiting confirmation", statusTone: "warm", progress: 18, total: 118,
  items: [{ name: "Everyday Trench Coat", details: "Stone · M · Qty 1", price: 118, image: "https://images.pexels.com/photos/6069552/pexels-photo-6069552.jpeg?auto=compress&cs=tinysrgb&w=400" }],
}];

export default function PausedOrders() {
  return <OrderList orders={orders} emptyMessage="You have no pending orders." />;
}
