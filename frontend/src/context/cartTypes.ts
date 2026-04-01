export interface CartItem {
  cartItemId: number;
  productId: number;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export type CartAction =
  | { type: "SET_CART"; payload: CartItem[] }
  | { type: "CLEAR_CART" };

export interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}