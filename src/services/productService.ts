/**
 * Product API Service
 * This service layer abstracts all product-related API calls
 * It automatically switches between MOCK API and REAL API based on configuration
 */

import { API_CONFIG, isMockAPI } from '@/config/api.config';
import { 
  mockProducts, 
  getFeaturedProducts, 
  getFlashDeals, 
  getProductById as getMockProductById,
  type Product 
} from '@/data/mockProducts';

/**
 * Simulates network delay for mock API
 */
const simulateDelay = (ms: number = API_CONFIG.MOCK_API_DELAY) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Generic API fetch wrapper
 */
async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const url = `${API_CONFIG.API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw error;
  }
}

/**
 * Product API Service
 */
export const productService = {
  /**
   * Get all products
   */
  async getAllProducts(): Promise<Product[]> {
    if (isMockAPI()) {
      await simulateDelay();
      return mockProducts;
    }
    
    return apiFetch<Product[]>(API_CONFIG.ENDPOINTS.PRODUCTS);
  },

  /**
   * Get a single product by ID
   */
  async getProductById(id: number): Promise<Product | null> {
    if (isMockAPI()) {
      await simulateDelay();
      const product = getMockProductById(id);
      return product || null;
    }
    
    try {
      return await apiFetch<Product>(API_CONFIG.ENDPOINTS.PRODUCT_BY_ID(id));
    } catch (error) {
      return null;
    }
  },

  /**
   * Get featured products
   */
  async getFeaturedProducts(limit?: number): Promise<Product[]> {
    if (isMockAPI()) {
      await simulateDelay();
      return getFeaturedProducts(limit);
    }
    
    const endpoint = limit 
      ? `${API_CONFIG.ENDPOINTS.FEATURED_PRODUCTS}?limit=${limit}`
      : API_CONFIG.ENDPOINTS.FEATURED_PRODUCTS;
    
    return apiFetch<Product[]>(endpoint);
  },

  /**
   * Get flash deal products
   */
  async getFlashDeals(limit?: number): Promise<Product[]> {
    if (isMockAPI()) {
      await simulateDelay();
      return getFlashDeals(limit);
    }
    
    const endpoint = limit 
      ? `${API_CONFIG.ENDPOINTS.FLASH_DEALS}?limit=${limit}`
      : API_CONFIG.ENDPOINTS.FLASH_DEALS;
    
    return apiFetch<Product[]>(endpoint);
  },

  /**
   * Search products by query
   */
  async searchProducts(query: string): Promise<Product[]> {
    if (isMockAPI()) {
      await simulateDelay();
      const lowerQuery = query.toLowerCase();
      return mockProducts.filter(p => 
        p.title.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.category?.toLowerCase().includes(lowerQuery)
      );
    }
    
    return apiFetch<Product[]>(`${API_CONFIG.ENDPOINTS.PRODUCTS}?search=${encodeURIComponent(query)}`);
  },

  /**
   * Filter products
   */
  async filterProducts(filters: {
    category?: string;
    ageGroup?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
  }): Promise<Product[]> {
    if (isMockAPI()) {
      await simulateDelay();
      return mockProducts.filter(p => {
        if (filters.category && p.category !== filters.category) return false;
        if (filters.ageGroup && p.ageGroup !== filters.ageGroup) return false;
        if (filters.minPrice && p.price < filters.minPrice) return false;
        if (filters.maxPrice && p.price > filters.maxPrice) return false;
        if (filters.minRating && (p.rating || 0) < filters.minRating) return false;
        return true;
      });
    }
    
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.ageGroup) params.append('ageGroup', filters.ageGroup);
    if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    if (filters.minRating) params.append('minRating', filters.minRating.toString());
    
    return apiFetch<Product[]>(`${API_CONFIG.ENDPOINTS.PRODUCTS}?${params.toString()}`);
  },
};

// Export Product type for use in components
export type { Product };
