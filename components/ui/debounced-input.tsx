"use client";

import { useEffect, useState, type InputHTMLAttributes } from "react";

type DebouncedInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
  value: string;
  onValueChange: (value: string) => void;
  delayMs?: number;
};

export function DebouncedInput({
  value,
  onValueChange,
  delayMs = 300,
  ...inputProps
}: DebouncedInputProps) {
  const [draft, setDraft] = useState(value);
  const [syncedValue, setSyncedValue] = useState(value);

  if (value !== syncedValue) {
    setSyncedValue(value);
    setDraft(value);
  }

  useEffect(() => {
    if (draft === value) return;
    const timer = setTimeout(() => onValueChange(draft), delayMs);
    return () => clearTimeout(timer);
  }, [draft, value, delayMs, onValueChange]);

  return <input {...inputProps} value={draft} onChange={(e) => setDraft(e.target.value)} />;
}