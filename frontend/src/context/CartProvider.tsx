import { useReducer, useEffect, useCallback, type ReactNode } from "react";
import { CartContext } from "./CartContext";
import { cartReducer, initialState } from "./cartReducer";
import { getCart } from "../services/api";

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const refreshCart = useCallback(async () => {
    try {
      const cart = await getCart();
      dispatch({ type: "SET_CART", payload: cart.items });
    } catch (err) {
      console.error("Failed to load cart:", err);
    }
  }, []);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  return (
    <CartContext.Provider value={{ state, dispatch, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
}