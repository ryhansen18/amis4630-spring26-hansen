import type { Product } from "../types";

const API_BASE_URL = "http://localhost:5000";

function authHeaders(): HeadersInit {
  const token = localStorage.getItem("token");
  return token
    ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    : { "Content-Type": "application/json" };
}

// --- Product endpoints ---

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE_URL}/api/products`);
  if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
  return res.json();
}

export async function getProductById(id: number): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}/api/products/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch product ${id}: ${res.status}`);
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
  const res = await fetch(`${API_BASE_URL}/api/cart`, { headers: authHeaders() });
  if (!res.ok) throw new Error(`Failed to fetch cart: ${res.status}`);
  return res.json();
}

export async function addToCart(productId: number, quantity: number): Promise<CartResponse> {
  const res = await fetch(`${API_BASE_URL}/api/cart`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ productId, quantity }),
  });
  if (!res.ok) throw new Error(`Failed to add item to cart: ${res.status}`);
  return res.json();
}

export async function updateCartItem(cartItemId: number, quantity: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/cart/${cartItemId}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify({ quantity }),
  });
  if (!res.ok) throw new Error(`Failed to update your item(s): ${res.status}`);
}

export async function removeCartItem(cartItemId: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/cart/${cartItemId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(`Failed to remove your item: ${res.status}`);
}

export async function clearCart(): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/cart/clear`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(`Failed to clear your cart: ${res.status}`);
}

// --- Order endpoints ---

export async function createOrder(shippingAddress: string) {
  const res = await fetch(`${API_BASE_URL}/api/userorder`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ shippingAddress }),
  });
  if (!res.ok) throw new Error(`Failed to create order: ${res.status}`);
  return res.json();
}

export async function getMyOrders() {
  const res = await fetch(`${API_BASE_URL}/api/userorder/mine`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(`Failed to fetch orders: ${res.status}`);
  return res.json();
}