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
    } catch {
      // Not logged in or cart empty — just clear state silently
      dispatch({ type: "CLEAR_CART" });
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