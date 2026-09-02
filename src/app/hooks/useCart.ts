import { useCallback, useEffect, useState } from "react";
import { CartItem } from "../../lib/types/search";

const CART_STORAGE_KEY = "cartData";

const getCartItemKey = (item: CartItem) =>
  `${item.productId}:${item.selectedSize}:${item.selectedColor ?? ""}`;

const readCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];

  try {
    const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);
    const parsedCart: unknown = storedCart ? JSON.parse(storedCart) : [];

    return Array.isArray(parsedCart) ? (parsedCart as CartItem[]) : [];
  } catch {
    return [];
  }
};

const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(readCart);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const onAdd = useCallback((input: CartItem) => {
    const quantityToAdd = Math.max(1, input.quantity);

    setCartItems((currentItems) => {
      const inputKey = getCartItemKey(input);
      const existingItem = currentItems.find(
        (item) => getCartItemKey(item) === inputKey,
      );

      if (!existingItem) {
        return [...currentItems, { ...input, quantity: quantityToAdd }];
      }

      return currentItems.map((item) =>
        getCartItemKey(item) === inputKey
          ? { ...item, quantity: item.quantity + quantityToAdd }
          : item,
      );
    });
  }, []);

  const onRemove = useCallback((input: CartItem) => {
    setCartItems((currentItems) => {
      const inputKey = getCartItemKey(input);
      const existingItem = currentItems.find(
        (item) => getCartItemKey(item) === inputKey,
      );

      if (!existingItem) return currentItems;

      if (existingItem.quantity <= 1) {
        return currentItems.filter((item) => getCartItemKey(item) !== inputKey);
      }

      return currentItems.map((item) =>
        getCartItemKey(item) === inputKey
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );
    });
  }, []);

  const onDelete = useCallback((input: CartItem) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => getCartItemKey(item) !== getCartItemKey(input)),
    );
  }, []);

  const onDeleteAll = useCallback(() => {
    setCartItems([]);
  }, []);

  return { cartItems, onAdd, onRemove, onDelete, onDeleteAll };
};

export default useCart;
