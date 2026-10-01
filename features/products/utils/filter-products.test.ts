import { describe, expect, it } from "vitest";
import type { Product } from "../types/product.type";
import { filterProducts } from "./filter-products";

function makeProduct(overrides: Partial<Product>): Product {
  return {
    id: 1,
    title: "Product",
    price: 10,
    description: "",
    category: "electronics",
    image: "/x.png",
    rating: { rate: 4, count: 10 },
    ...overrides,
  };
}

const products = [
  makeProduct({ id: 1, title: "Gold Ring", price: 50, category: "jewelery" }),
  makeProduct({ id: 2, title: "SSD Drive 1TB", price: 100, category: "electronics" }),
  makeProduct({ id: 3, title: "Rain Jacket", price: 30, category: "men's clothing" }),
];

const none = { search: "", category: "", minPrice: null, maxPrice: null };

describe("filterProducts", () => {
  it("returns everything when no filter is active", () => {
    expect(filterProducts(products, none)).toHaveLength(3);
  });

  it("searches by title, ignoring case and surrounding spaces", () => {
    const result = filterProducts(products, { ...none, search: "  gOLd " });
    expect(result.map((p) => p.id)).toEqual([1]);
  });

  it("filters by category", () => {
    const result = filterProducts(products, { ...none, category: "electronics" });
    expect(result.map((p) => p.id)).toEqual([2]);
  });

  it("treats the price range as inclusive", () => {
    const result = filterProducts(products, { ...none, minPrice: 30, maxPrice: 50 });
    expect(result.map((p) => p.id)).toEqual([1, 3]);
  });

  it("supports a minimum price only", () => {
    const result = filterProducts(products, { ...none, minPrice: 60 });
    expect(result.map((p) => p.id)).toEqual([2]);
  });

  it("supports a maximum price only", () => {
    const result = filterProducts(products, { ...none, maxPrice: 40 });
    expect(result.map((p) => p.id)).toEqual([3]);
  });

  it("combines all filters", () => {
    const result = filterProducts(products, {
      search: "ring",
      category: "jewelery",
      minPrice: 40,
      maxPrice: 60,
    });
    expect(result.map((p) => p.id)).toEqual([1]);
  });

  it("returns an empty array when nothing matches", () => {
    expect(filterProducts(products, { ...none, search: "zzzz" })).toEqual([]);
  });
});