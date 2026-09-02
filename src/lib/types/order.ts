import { OrderStatus } from "../enums/order.enum";
import { Product } from "./product";


export interface OrderItemInput {
    quantity: number;
    unitPrice: number;
    productId: string;
    selectedSize: string;
    selectedColor?: string;
}

export interface Order {
    _id: string;
    orderSubtotal: number;
    orderShippingFee: number;
    orderTotal: number;
    orderStatus: OrderStatus;
    shippingAddress: string;
    createdAt: Date;
    updatedAt: Date;

    /**from Aggregate */
    orderItems: OrderItem[];
    productData: Product[];
}

export interface OrderItem {
    _id: string;
    quantity: number;
    unitPrice: number;
    orderId: string;
    productId: string;
    selectedSize: string;
    selectedColor?: string;
    createdAt: Date;
    updatedAt: Date;

}


export interface OrderInquiry {
    page: number;
    limit: number;
    orderStatus?: OrderStatus;
}

export interface OrderUpdateInput {
    orderId: string;
    orderStatus: OrderStatus;
}
