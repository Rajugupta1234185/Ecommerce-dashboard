import { beforeEach, describe, expect, it } from "vitest";
import type { Product } from "@/features/products/types/product.type";
import { MAX_ITEM_QUANTITY } from "../constants";
import { selectCartCount } from "./cart.selector";
import { useCartStore } from "./cart.store";

const product: Product = {
  id: 7,
  title: "Backpack",
  price: 25,
  description: "",
  category: "bags",
  image: "/bag.png",
  rating: { rate: 4, count: 5 },
};

const state = () => useCartStore.getState();

describe("cart store", () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] });
  });

  it("adds a new product with the chosen quantity", () => {
    state().addItem(product, 2);
    expect(state().items).toEqual([
      { productId: 7, title: "Backpack", price: 25, image: "/bag.png", quantity: 2 },
    ]);
  });

  it("merges the same product into one line", () => {
    state().addItem(product, 2);
    state().addItem(product, 3);
    expect(state().items).toHaveLength(1);
    expect(state().items[0].quantity).toBe(5);
  });

  it("never exceeds the maximum quantity", () => {
    state().addItem(product, MAX_ITEM_QUANTITY);
    state().addItem(product, 5);
    expect(state().items[0].quantity).toBe(MAX_ITEM_QUANTITY);
  });

  it("updates quantity and keeps it at least 1", () => {
    state().addItem(product, 2);
    state().updateQuantity(7, 4);
    expect(state().items[0].quantity).toBe(4);
    state().updateQuantity(7, 0);
    expect(state().items[0].quantity).toBe(1);
  });

  it("removes a product", () => {
    state().addItem(product);
    state().removeItem(7);
    expect(state().items).toEqual([]);
  });

  it("clears the cart", () => {
    state().addItem(product);
    state().clear();
    expect(state().items).toEqual([]);
  });

  it("counts the total number of units", () => {
    state().addItem(product, 2);
    state().addItem({ ...product, id: 8 }, 3);
    expect(selectCartCount(state())).toBe(5);
  });
});