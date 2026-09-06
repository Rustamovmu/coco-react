import axios from "axios";
import { serverApi } from "../../lib/config";
import {
  Order,
  OrderInquiry,
  OrderItemInput,
  OrderUpdateInput,
} from "../../lib/types/order";
import { CartItem } from "../../lib/types/search";

const imageUrl = (image?: string): string => {
  if (!image) return "/img/noimage-list.svg";
  if (/^(https?:)?\/\//.test(image) || image.startsWith("data:")) return image;
  return `${serverApi}/${image.replace(/^\//, "")}`;
};

const normalizeOrder = (order: Order): Order => ({
  ...order,
  createdAt: new Date(order.createdAt),
  updatedAt: new Date(order.updatedAt),
  orderItems: order.orderItems.map((item) => ({
    ...item,
    productImage: imageUrl(item.productImage),
  })),
});

class OrderService {
  private readonly path: string;

  constructor() {
    this.path = `${serverApi}/order`;
  }

  public async createOrder(cartItems: CartItem[]): Promise<Order> {
    const orderItems: OrderItemInput[] = cartItems.map((cartItem) => ({
      quantity: cartItem.quantity,
      unitPrice: cartItem.unitPrice,
      productId: cartItem.productId,
      selectedSize: cartItem.selectedSize,
      selectedColor: cartItem.selectedColor,
    }));

    const result = await axios.post<Order>(`${this.path}/create`, orderItems, {
      withCredentials: true,
    });

    return normalizeOrder(result.data);
  }

  public async getMyOrders(input: OrderInquiry): Promise<Order[]> {
    const params = new URLSearchParams({
      page: String(input.page),
      limit: String(input.limit),
    });

    if (input.orderStatus) params.set("orderStatus", input.orderStatus);

    const result = await axios.get<Order[]>(`${this.path}/all?${params.toString()}`, {
      withCredentials: true,
    });

    return result.data.map(normalizeOrder);
  }

  public async updateOrder(input: OrderUpdateInput): Promise<Order> {
    const result = await axios.post<Order>(`${this.path}/update`, input, {
      withCredentials: true,
    });

    return normalizeOrder(result.data);
  }
}

export default OrderService;
