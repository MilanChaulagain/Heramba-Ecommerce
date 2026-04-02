/**
 * API Configuration
 * This file controls whether the app uses MOCK API or REAL API
 * 
 * To switch between MOCK and REAL API:
 * 1. Change USE_MOCK_API to false when you have a real backend
 * 2. Set NEXT_PUBLIC_API_URL in your .env.local file
 * 
 * Example .env.local:
 * NEXT_PUBLIC_API_URL=https://api.heremba.com
 * NEXT_PUBLIC_USE_MOCK_API=false
 */

// Read from environment variables or use defaults
export const API_CONFIG = {
  // Set to true for MOCK API, false for REAL API
  USE_MOCK_API: process.env.NEXT_PUBLIC_USE_MOCK_API === 'true' ? false : true,
  
  // Real API base URL (used when USE_MOCK_API is false)
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  
  // Simulate network delay for mock API (in milliseconds)
  MOCK_API_DELAY: 500,
  
  // API endpoints
  ENDPOINTS: {
    PRODUCTS: '/api/products',
    PRODUCT_BY_ID: (id: number) => `/api/products/${id}`,
    FEATURED_PRODUCTS: '/api/products/featured',
    FLASH_DEALS: '/api/products/flash-deals',
    CATEGORIES: '/api/categories',
  }
};

// Helper to check if we're using mock API
export const isMockAPI = () => API_CONFIG.USE_MOCK_API;

// Helper to get full API URL
export const getApiUrl = (endpoint: string) => {
  if (API_CONFIG.USE_MOCK_API) {
    return endpoint; // Mock API doesn't need base URL
  }
  return `${API_CONFIG.API_BASE_URL}${endpoint}`;
};
