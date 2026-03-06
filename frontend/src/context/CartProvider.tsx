import { useReducer, type ReactNode } from "react";
import { CartContext } from "./CartContext";
import { cartReducer, initialState } from "./cartReducer";

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}