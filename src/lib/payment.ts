export interface PaymentMethod {
  cardholderName: string;
  lastFour: string;
  expiry: string;
}

const paymentKey = (memberId: string) => `cocoPaymentMethod:${memberId}`;

export const getPaymentMethod = (memberId: string): PaymentMethod | null => {
  try {
    const value = localStorage.getItem(paymentKey(memberId));
    return value ? JSON.parse(value) as PaymentMethod : null;
  } catch {
    return null;
  }
};

export const savePaymentMethod = (memberId: string, method: PaymentMethod) => {
  localStorage.setItem(paymentKey(memberId), JSON.stringify(method));
};
