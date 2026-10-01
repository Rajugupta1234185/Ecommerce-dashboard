import { describe, expect, it } from "vitest";
import { paginate } from "./paginate";

const items = Array.from({ length: 20 }, (_, index) => index + 1);

describe("paginate", () => {
  it("returns the first page", () => {
    const result = paginate(items, 1, 8);
    expect(result.items).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(result.totalPages).toBe(3);
    expect(result.totalItems).toBe(20);
  });

  it("returns a partial last page", () => {
    expect(paginate(items, 3, 8).items).toEqual([17, 18, 19, 20]);
  });

  it("clamps a page number that is too high", () => {
    expect(paginate(items, 99, 8).currentPage).toBe(3);
  });

  it("clamps a page number that is too low", () => {
    expect(paginate(items, 0, 8).currentPage).toBe(1);
    expect(paginate(items, -5, 8).currentPage).toBe(1);
  });

  it("handles an empty list with one page", () => {
    const result = paginate([], 1, 8);
    expect(result.items).toEqual([]);
    expect(result.totalPages).toBe(1);
    expect(result.totalItems).toBe(0);
  });
});