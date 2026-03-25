/* ── Cart Storage Utility ── */

export type CartItem = {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  image?: string;
  badge?: string;
  rating?: number;
  category?: string;
  quantity: number;
};

const CART_STORAGE_KEY = "heremba_cart";
const CART_UPDATE_EVENT = "heremba-cart-updated";

/**
 * Dispatch cart update event for listeners
 */
function dispatchCartUpdate(items: CartItem[]): void {
  if (typeof window === "undefined") return;
  const event = new CustomEvent(CART_UPDATE_EVENT, {
    detail: { items, count: getCartCount() },
  });
  window.dispatchEvent(event);
}

/**
 * Get cart from localStorage
 */
export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to parse cart from localStorage:", error);
    return [];
  }
}

/**
 * Save cart to localStorage
 */
export function saveCart(items: CartItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    dispatchCartUpdate(items);
  } catch (error) {
    console.error("Failed to save cart to localStorage:", error);
  }
}

/**
 * Add item to cart (increment quantity if exists)
 */
export function addToCart(item: Omit<CartItem, "quantity">): CartItem[] {
  const cart = getCart();
  const existingItem = cart.find((i) => i.id === item.id);

  if (existingItem) {
    existingItem.quantity = Math.min(10, existingItem.quantity + 1);
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  saveCart(cart);
  return cart;
}

/**
 * Remove item from cart
 */
export function removeFromCart(id: number): CartItem[] {
  const cart = getCart();
  const filtered = cart.filter((item) => item.id !== id);
  saveCart(filtered);
  return filtered;
}

/**
 * Update quantity
 */
export function updateQuantity(id: number, quantity: number): CartItem[] {
  const cart = getCart();
  const item = cart.find((i) => i.id === id);
  if (item) {
    item.quantity = Math.max(1, Math.min(10, quantity));
  }
  saveCart(cart);
  return cart;
}

/**
 * Clear cart
 */
export function clearCart(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CART_STORAGE_KEY);
  dispatchCartUpdate([]);
}

/**
 * Get total items count
 */
export function getCartCount(): number {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

/**
 * Listen for cart updates
 */
export function onCartUpdate(callback: (count: number) => void): () => void {
  if (typeof window === "undefined") return () => {};
  
  const handler = (event: Event) => {
    const customEvent = event as CustomEvent;
    callback(customEvent.detail?.count ?? getCartCount());
  };

  window.addEventListener(CART_UPDATE_EVENT, handler);
  
  return () => window.removeEventListener(CART_UPDATE_EVENT, handler);
}
