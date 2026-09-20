import { Dispatch, SetStateAction, useEffect, useState } from "react";

// Mirrors useState's return shape ([value, setValue]) so it's a
// drop-in replacement anywhere you'd otherwise reach for useState —
// the only difference is the initial read and every write go through
// localStorage, so the value survives a refresh.
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      // Storage full/disabled — the app should still work in-memory.
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}