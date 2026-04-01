import type { Product } from "../types";

const API_BASE_URL = "http://localhost:5000";

// --- Product endpoints ---

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE_URL}/api/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function getProductById(id: number): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}/api/products/${id}`);
  if (!res.ok) throw new Error("Product not found");
  return res.json();
}

// --- Cart types ---

export interface CartItemResponse {
  cartItemId: number;
  productId: number;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export interface CartResponse {
  cartId: number;
  userId: string;
  items: CartItemResponse[];
  total: number;
}

// --- Cart endpoints ---

export async function getCart(): Promise<CartResponse> {
  const res = await fetch(`${API_BASE_URL}/api/cart`);
  if (!res.ok) throw new Error("Failed to fetch cart");
  return res.json();
}

export async function addToCart(productId: number, quantity: number): Promise<CartResponse> {
  const res = await fetch(`${API_BASE_URL}/api/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, quantity }),
  });
  if (!res.ok) throw new Error("Failed to add item to cart");
  return res.json();
}

export async function updateCartItem(cartItemId: number, quantity: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/cart/${cartItemId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
  });
  if (!res.ok) throw new Error("Failed to update cart item");
}

export async function removeCartItem(cartItemId: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/cart/${cartItemId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to remove cart item");
}

export async function clearCart(): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/cart/clear`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to clear cart");
}