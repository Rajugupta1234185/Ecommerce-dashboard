import { httpClient } from "@/lib/api/http-client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { LoginCredentials, LoginResponse } from "../types/auth.types";

export function login(credentials: LoginCredentials): Promise<LoginResponse> {
  return httpClient<LoginResponse>(ENDPOINTS.login, {
    method: "POST",
    body: credentials,
    cache: "no-store", // never cache a login
  });
}