export const FREE_DELIVERY_THRESHOLD = 100;
export const STANDARD_DELIVERY_FEE = 5;

export const getDeliveryFee = (subtotal: number): number =>
  subtotal > 0 && subtotal < FREE_DELIVERY_THRESHOLD
    ? STANDARD_DELIVERY_FEE
    : 0;

export const getOrderTotal = (subtotal: number): number =>
  subtotal + getDeliveryFee(subtotal);
