import { describe, expect, it } from "vitest";
import type { CartItem } from "../types/cart.types";
import { calculateTotal } from "./calculate-total";

const item = (price: number, quantity: number, productId = 1): CartItem => ({
  productId,
  title: "Item",
  price,
  image: "/x.png",
  quantity,
});

describe("calculateTotal", () => {
  it("returns 0 for an empty cart", () => {
    expect(calculateTotal([])).toBe(0);
  });

  it("multiplies price by quantity and sums the lines", () => {
    expect(calculateTotal([item(10, 2, 1), item(5.5, 3, 2)])).toBe(36.5);
  });

  it("avoids floating point errors", () => {
    // 0.1 + 0.2 is 0.30000000000000004 in plain JavaScript
    expect(calculateTotal([item(0.1, 1, 1), item(0.2, 1, 2)])).toBe(0.3);
    expect(calculateTotal([item(19.99, 3)])).toBe(59.97);
  });
});