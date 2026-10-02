import { env } from "@/lib/config/env";
import { ApiError } from "./api-error";

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  timeoutMs?: number;
  retries?: number;
  next?: NextFetchRequestConfig;
};

const RETRYABLE_STATUS = new Set([408, 429, 500, 502, 503, 504, 520, 521, 522, 523, 524]);
const RETRY_BASE_DELAY_MS = 300;

export async function httpClient<T>(
  path: string,
  { retries = 2, ...options }: RequestOptions = {},
): Promise<T> {
  const isGet = (options.method ?? "GET").toUpperCase() === "GET";
  const maxRetries = isGet ? retries : 0;

  for (let attempt = 0; ; attempt++) {
    try {
      return await request<T>(path, options);
    } catch (error) {
      const canRetry =
        attempt < maxRetries && error instanceof ApiError && isRetryable(error);
      if (!canRetry) throw error;
      await sleep(RETRY_BASE_DELAY_MS * 2 ** attempt);
    }
  }
}

async function request<T>(
  path: string,
  { body, timeoutMs = 8000, headers, ...init }: Omit<RequestOptions, "retries">,
): Promise<T> {
  const url = `${env.API_BASE_URL}${path}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...init,
      signal: controller.signal,
      headers: { "Content-Type": "application/json", ...headers },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new ApiError(getFriendlyMessage(response.status), response.status, url);
    }

    return (await parseBody(response, url)) as T;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[httpClient] request failed:", url, error);
    }

    if (error instanceof ApiError) throw error;

    if (error instanceof Error && error.name === "AbortError") {
      throw new ApiError("The request timed out. Please try again.", 408, url);
    }

    throw new ApiError("Network error. Please check your connection.", 0, url);
  } finally {
    clearTimeout(timer);
  }
}

function isRetryable(error: ApiError): boolean {
  return error.status === 0 || RETRYABLE_STATUS.has(error.status);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function parseBody(response: Response, url: string): Promise<unknown> {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    throw new ApiError("Received an invalid response from the server.", 502, url);
  }
}

function getFriendlyMessage(status: number): string {
  if (status === 400 || status === 401) return "Invalid request or credentials.";
  if (status === 404) return "We couldn't find what you were looking for.";
  if (status === 429) return "Too many requests. Please slow down.";
  if (status >= 500) return "The server is having trouble. Please try again shortly.";
  return "Something went wrong. Please try again.";
}