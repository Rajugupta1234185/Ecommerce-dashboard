export type SortOrder = "asc" | "desc";

export type ProductRating = {
  rate: number;
  count: number;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ProductRating;
};


export type ProductFilters = {
  search: string;
  category: string; 
  minPrice: number | null;
  maxPrice: number | null;
  page: number;
};