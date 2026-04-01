import type { CartState, CartAction } from "./cartTypes";

export const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "SET_CART":
      return { ...state, items: action.payload, loading: false, error: null };
    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      return state;
  }
}