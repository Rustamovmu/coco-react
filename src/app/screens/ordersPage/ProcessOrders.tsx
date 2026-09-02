import OrderList, { OrderPreview } from "./OrderList";

const orders: OrderPreview[] = [{
  id: "#CO-1045", date: "31 August 2026", status: "On the way", statusTone: "dark", progress: 72, total: 184,
  items: [
    { name: "Tailored Wide-Leg Pants", details: "Espresso · M · Qty 1", price: 96, image: "https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { name: "Soft Knit Scarf", details: "Oatmeal · One size · Qty 1", price: 88, image: "https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg?auto=compress&cs=tinysrgb&w=400" },
  ],
}];

export default function ProcessOrders() {
  return <OrderList orders={orders} emptyMessage="You have no orders in progress." />;
}
