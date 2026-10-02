import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ApiError } from "./api-error";
import { httpClient } from "./http-client";

const fetchMock = vi.fn();

function makeResponse(status: number, body = ""): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    text: async () => body,
  } as Response;
}

const jsonResponse = (data: unknown, status = 200) =>
  makeResponse(status, JSON.stringify(data));

async function getApiError(promise: Promise<unknown>): Promise<ApiError> {
  try {
    await promise;
  } catch (error) {
    if (error instanceof ApiError) return error;
    throw error;
  }
  throw new Error("Expected the request to fail, but it succeeded");
}

beforeEach(() => {
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  fetchMock.mockReset();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("httpClient", () => {
  it("returns parsed JSON and builds the URL from the base URL", async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse([{ id: 1 }]));

    await expect(httpClient("/products")).resolves.toEqual([{ id: 1 }]);
    expect(fetchMock.mock.calls[0][0]).toBe("https://api.test/products");
  });

  it("returns null for an empty body", async () => {
    fetchMock.mockResolvedValueOnce(makeResponse(200, ""));
    await expect(httpClient("/products/999")).resolves.toBeNull();
  });

  it("turns a 404 into an ApiError with a friendly message, without retrying", async () => {
    fetchMock.mockResolvedValueOnce(makeResponse(404));

    const error = await getApiError(httpClient("/products/1"));

    expect(error.status).toBe(404);
    expect(error.message).toMatch(/couldn't find/i);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("rejects a body that is not valid JSON", async () => {
    fetchMock.mockResolvedValueOnce(makeResponse(200, "<html>oops</html>"));

    const error = await getApiError(httpClient("/products", { retries: 0 }));

    expect(error.status).toBe(502);
  });

  it("retries temporary server errors and then succeeds", async () => {
    vi.useFakeTimers();
    fetchMock
      .mockResolvedValueOnce(makeResponse(503))
      .mockResolvedValueOnce(jsonResponse([1, 2]));

    const promise = httpClient<number[]>("/products");
    await vi.runAllTimersAsync();

    await expect(promise).resolves.toEqual([1, 2]);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("gives up after the retries are used", async () => {
    vi.useFakeTimers();
    fetchMock.mockImplementation(async () => makeResponse(503));

    const promise = getApiError(httpClient("/products"));
    await vi.runAllTimersAsync();
    const error = await promise;

    expect(error.status).toBe(503);
    expect(fetchMock).toHaveBeenCalledTimes(3); // 1 attempt + 2 retries
  });

  it("never retries a POST", async () => {
    fetchMock.mockImplementation(async () => makeResponse(503));

    const error = await getApiError(
      httpClient("/auth/login", {
        method: "POST",
        body: { username: "a", password: "b" },
      }),
    );

    expect(error.status).toBe(503);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("sends a POST body as JSON", async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ token: "t" }));

    await httpClient("/auth/login", { method: "POST", body: { username: "a" } });

    expect(fetchMock.mock.calls[0][1].body).toBe(JSON.stringify({ username: "a" }));
  });

  it("maps a network failure to an ApiError with status 0", async () => {
    fetchMock.mockRejectedValue(new TypeError("fetch failed"));

    const error = await getApiError(httpClient("/products", { retries: 0 }));

    expect(error.status).toBe(0);
  });

  it("maps a timeout to status 408", async () => {
    vi.useFakeTimers();
    fetchMock.mockImplementation(
      (_url: string, init: RequestInit) =>
        new Promise((_resolve, reject) => {
          init.signal?.addEventListener("abort", () =>
            reject(new DOMException("Aborted", "AbortError")),
          );
        }),
    );

    const promise = getApiError(httpClient("/products", { retries: 0, timeoutMs: 1000 }));
    await vi.advanceTimersByTimeAsync(1000);
    const error = await promise;

    expect(error.status).toBe(408);
  });
});