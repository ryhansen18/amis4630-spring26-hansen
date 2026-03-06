import type { CartState, CartAction } from "./cartTypes";

export const initialState: CartState = { items: [] };

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.items.find(
        (item) => item.productId === action.payload.productId
      );
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.productId === action.payload.productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case "REMOVE_FROM_CART":
      return {
        items: state.items.filter(
          (item) => item.productId !== action.payload.productId
        ),
      };
    case "CLEAR_CART":
      return { items: [] };
  }
}
