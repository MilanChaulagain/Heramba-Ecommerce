# Mock API to Real API - Migration Guide

This guide explains how the HEREMBA frontend project is configured to use a Mock API and how to switch to a Real API when ready.

---

## 📁 Project Structure

```
src/
├── config/
│   └── api.config.ts          # API configuration (SWITCH HERE!)
├── data/
│   └── mockProducts.ts         # Mock product data
├── services/
│   └── productService.ts       # API service layer (handles both mock & real)
├── components/
│   ├── ProductSection.tsx      # Uses productService
│   ├── FlashDeals.tsx          # Uses productService
│   └── ProductCard.tsx
└── app/
    ├── products/
    │   ├── page.tsx            # Uses productService
    │   └── [id]/page.tsx       # Uses productService
    └── ...
```

---

## 🔧 Current Configuration (MOCK API)

Currently, the project is set to use **MOCK API** by default. All API calls return data from `src/data/mockProducts.ts` with a simulated delay.

### How it works:

1. **Configuration**: `src/config/api.config.ts`
   - `USE_MOCK_API = true` (default)
   - Returns mock data instantly with simulated network delay

2. **Mock Data**: `src/data/mockProducts.ts`
   - Contains 16 sample products
   - Includes helper functions for filtering

3. **Service Layer**: `src/services/productService.ts`
   - Checks `USE_MOCK_API` flag
   - Routes to mock data or real API accordingly

4. **Components**: All product components use `productService`
   - ProductSection → `productService.getFeaturedProducts()`
   - FlashDeals → `productService.getFlashDeals()`
   - Products Page → `productService.getAllProducts()`
   - Product Detail → `productService.getProductById()`

---

## 🚀 How to Switch to REAL API

### **Option 1: Using Environment Variables (Recommended)**

1. Create a `.env.local` file in the root directory:

```bash
# .env.local
NEXT_PUBLIC_USE_MOCK_API=false
NEXT_PUBLIC_API_URL=https://your-api.heremba.com
```

2. Restart your Next.js development server:

```bash
npm run dev
```

That's it! The app will now use your real API.

---

### **Option 2: Directly in Code**

Edit `src/config/api.config.ts`:

```typescript
export const API_CONFIG = {
  // Change this to false
  USE_MOCK_API: false,
  
  // Set your real API URL
  API_BASE_URL: 'https://your-api.heremba.com',
  
  // ... rest of config
};
```

---

## 🔌 Real API Requirements

Your backend API should provide the following endpoints:

### **1. Get All Products**
```
GET /api/products
Response: Product[]
```

### **2. Get Product by ID**
```
GET /api/products/:id
Response: Product
```

### **3. Get Featured Products**
```
GET /api/products/featured?limit=8
Response: Product[]
```

### **4. Get Flash Deals**
```
GET /api/products/flash-deals?limit=4
Response: Product[]
```

### **Product Type Structure**
```typescript
type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  image?: string;
  badge?: string;
  rating?: number;
  category?: string;
  ageGroup?: string;
  stock?: number;
  featured?: boolean;
  flashDeal?: boolean;
}
```

---

## 🧪 Testing Your API

1. **Start with Mock API** (default):
   - Verify all features work with mock data
   - Test filtering, sorting, wishlist, cart

2. **Test Real API Endpoints**:
   - Use tools like Postman or curl
   - Verify response format matches Product type
   - Test all endpoints before switching

3. **Switch to Real API**:
   - Set `NEXT_PUBLIC_USE_MOCK_API=false`
   - Set `NEXT_PUBLIC_API_URL` to your backend
   - Restart dev server
   - Test all pages and features

4. **Handle Errors**:
   - The service layer already includes error handling
   - Check browser console for API errors
   - Verify CORS is enabled on your backend

---

## 🔍 Troubleshooting

### Issue: App still uses mock data after switching

**Solutions:**
1. Restart Next.js dev server (`npm run dev`)
2. Clear browser cache
3. Check `.env.local` file exists in root directory
4. Verify environment variable names (must start with `NEXT_PUBLIC_`)

### Issue: API calls fail with CORS error

**Solution:** Enable CORS on your backend:
```javascript
// Example for Express.js
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true
}));
```

### Issue: Data format mismatch

**Solution:** Ensure your API returns data matching the `Product` type defined in `src/services/productService.ts`

---

## 📝 Additional Configuration

### Custom API Delay (Mock API only)
```typescript
// src/config/api.config.ts
MOCK_API_DELAY: 500, // milliseconds
```

### Custom Endpoints
```typescript
// src/config/api.config.ts
ENDPOINTS: {
  PRODUCTS: '/api/products',
  PRODUCT_BY_ID: (id: number) => `/api/products/${id}`,
  // Add more as needed
}
```

---

## ✅ Checklist for Production

- [ ] Real API is deployed and accessible
- [ ] All endpoints return correct data format
- [ ] CORS is configured properly
- [ ] Environment variables are set in production
- [ ] `.env.local` is added to `.gitignore`
- [ ] Error handling is tested
- [ ] Loading states work correctly
- [ ] Remove or clean up mock data files (optional)

---

## 📚 File References

- **Main Config**: [src/config/api.config.ts](src/config/api.config.ts)
- **Product Service**: [src/services/productService.ts](src/services/productService.ts)
- **Mock Data**: [src/data/mockProducts.ts](src/data/mockProducts.ts)

---

## 💡 Tips

1. **Keep Mock API for Development**: Even after deploying with real API, you can keep mock API for local development
2. **Version Control**: Don't commit `.env.local` to git
3. **Environment-based Config**: Use different `.env` files for development, staging, and production
4. **API Documentation**: Document your real API endpoints for team members

---

## 🎯 Quick Switch Commands

**Switch to Mock API:**
```bash
# In .env.local
NEXT_PUBLIC_USE_MOCK_API=true
```

**Switch to Real API:**
```bash
# In .env.local
NEXT_PUBLIC_USE_MOCK_API=false
NEXT_PUBLIC_API_URL=https://your-api.heremba.com
```

**Restart Server:**
```bash
npm run dev
```

---

Need help? Check the service layer implementation in `src/services/productService.ts` to see how API calls are handled.
