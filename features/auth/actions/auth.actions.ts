"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ApiError } from "@/lib/api/api-error";
import { AUTH_COOKIE, AUTH_COOKIE_MAX_AGE_SECONDS } from "../constants";
import { login } from "../services/auth.service";
import type { LoginFormState } from "../types/auth.types";

function getSafeRedirect(value: FormDataEntryValue | null): string {
  const path = typeof value === "string" ? value : "";
  return path.startsWith("/") && !path.startsWith("//") ? path : "/products";
}

export async function loginAction(
  _previousState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const redirectTo = getSafeRedirect(formData.get("next"));

  if (!username || !password) {
    return { error: "Please enter your username and password." };
  }

  try {
    const { token } = await login({ username, password });

    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: AUTH_COOKIE_MAX_AGE_SECONDS,
    });
  } catch (error) {
    if (error instanceof ApiError) return { error: error.message };
    return { error: "Something went wrong. Please try again." };
  }


  redirect(redirectTo);
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);
  redirect("/login");
}