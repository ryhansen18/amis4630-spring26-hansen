export interface CartItem {
  productId: number;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export type CartAction =
  | { type: "ADD_TO_CART"; payload: Omit<CartItem, "quantity"> }
  | { type: "REMOVE_FROM_CART"; payload: { productId: number } }
  | { type: "CLEAR_CART" };

export interface CartState {
  items: CartItem[];
}
