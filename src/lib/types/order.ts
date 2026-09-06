import { OrderStatus } from "../enums/order.enum";


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

    orderItems: OrderItem[];
}

export interface OrderItem {
    _id: string;
    quantity: number;
    unitPrice: number;
    orderId: string;
    productId: string;
    productName: string;
    productImage?: string;
    selectedSize: string;
    selectedColor?: string;
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
