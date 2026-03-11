/* ── Wishlist Storage Utility ── */

export type WishlistItem = {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  image?: string;
  rating?: number;
  category?: string;
  addedAt: string;
};

const WISHLIST_STORAGE_KEY = "heremba_wishlist";
const WISHLIST_UPDATE_EVENT = "heremba-wishlist-updated";

function dispatchWishlistUpdate(items: WishlistItem[]): void {
  if (typeof window === "undefined") return;
  const event = new CustomEvent(WISHLIST_UPDATE_EVENT, {
    detail: { items, count: items.length },
  });
  window.dispatchEvent(event);
}

export function getWishlist(): WishlistItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveWishlist(items: WishlistItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
    dispatchWishlistUpdate(items);
  } catch {
    // silently fail
  }
}

export function addToWishlist(item: Omit<WishlistItem, "addedAt">): WishlistItem[] {
  const list = getWishlist();
  if (list.some((i) => i.id === item.id)) return list;
  list.push({ ...item, addedAt: new Date().toISOString().split("T")[0] });
  saveWishlist(list);
  return list;
}

export function removeFromWishlist(id: number): WishlistItem[] {
  const list = getWishlist().filter((item) => item.id !== id);
  saveWishlist(list);
  return list;
}

export function isInWishlist(id: number): boolean {
  return getWishlist().some((item) => item.id === id);
}

export function toggleWishlist(item: Omit<WishlistItem, "addedAt">): boolean {
  if (isInWishlist(item.id)) {
    removeFromWishlist(item.id);
    return false;
  } else {
    addToWishlist(item);
    return true;
  }
}

export function clearWishlist(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(WISHLIST_STORAGE_KEY);
  dispatchWishlistUpdate([]);
}

export function getWishlistCount(): number {
  return getWishlist().length;
}

export function onWishlistUpdate(callback: (count: number) => void): () => void {
  if (typeof window === "undefined") return () => {};

  const handler = (event: Event) => {
    const customEvent = event as CustomEvent;
    callback(customEvent.detail?.count ?? getWishlistCount());
  };

  window.addEventListener(WISHLIST_UPDATE_EVENT, handler);
  return () => window.removeEventListener(WISHLIST_UPDATE_EVENT, handler);
}


