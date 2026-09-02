import axios from "axios";
import { serverApi } from "../../lib/config";
import {
  Order,
  OrderInquiry,
  OrderItemInput,
  OrderUpdateInput,
} from "../../lib/types/order";
import { CartItem } from "../../lib/types/search";

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

    return result.data;
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

    return result.data;
  }

  public async updateOrder(input: OrderUpdateInput): Promise<Order> {
    const result = await axios.post<Order>(`${this.path}/update`, input, {
      withCredentials: true,
    });

    return result.data;
  }
}

export default OrderService;
