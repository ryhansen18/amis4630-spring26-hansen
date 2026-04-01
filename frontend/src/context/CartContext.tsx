import { createContext, type Dispatch } from "react";
import type { CartState, CartAction } from "./cartTypes";

export const CartContext = createContext<{
  state: CartState;
  dispatch: Dispatch<CartAction>;
  refreshCart: () => Promise<void>;
} | null>(null);