"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { fieldStyles } from "@/components/ui/field-styles";
import { loginAction } from "../actions/auth.actions";
import type { LoginFormState } from "../types/auth.types";

type LoginFormProps = {
  redirectTo: string;
};

const initialState: LoginFormState = { error: null };

export function LoginForm({ redirectTo }: LoginFormProps) {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="next" value={redirectTo} />

      <label className="flex flex-col gap-1 text-sm">
        Username
        <input
          name="username"
          type="text"
          autoComplete="username"
          required
          className={fieldStyles}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Password
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={fieldStyles}
        />
      </label>

      {state.error && (
        <p role="alert" className="text-sm text-danger">
          {state.error}
        </p>
      )}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}