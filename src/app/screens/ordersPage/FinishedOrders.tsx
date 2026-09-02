import OrderList, { OrderPreview } from "./OrderList";

const orders: OrderPreview[] = [{
  id: "#CO-1029", date: "16 August 2026", status: "Delivered", statusTone: "success", progress: 100, total: 145,
  items: [{ name: "Classic Oversized Shirt", details: "Ivory · S · Qty 1", price: 145, image: "https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg?auto=compress&cs=tinysrgb&w=400" }],
}];

export default function FinishedOrders() {
  return <OrderList orders={orders} emptyMessage="You have no delivered orders yet." />;
}
