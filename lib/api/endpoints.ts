export const ENDPOINTS = {
  products: "/products",
  product: (id: number | string) => `/products/${id}`,
  categories: "/products/categories",
  login: "/auth/login",
} as const;