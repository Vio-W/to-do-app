import { useEffect, useRef, useState } from "react";

// Returns `value`, but only after it's stopped changing for `delay`ms.
export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setDebounced(value);
    }, delay);

    // Cleanup: cancels the PREVIOUS pending timer whenever `value`
    // changes again before it fires (or on unmount). Without this,
    // every keystroke would schedule another timer that all eventually
    // fire and overwrite `debounced` with stale, out-of-order values.
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [value, delay]);

  return debounced;
}