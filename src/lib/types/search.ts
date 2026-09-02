export interface CartItem {
    productId: string;
    productName: string;
    unitPrice: number;
    quantity: number;
    imageUrl: string;
    selectedSize: string;
    selectedColor?: string;
}
