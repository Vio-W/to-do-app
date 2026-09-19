import { useEffect, useState } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Generic over T so callers get real typing back, e.g.
// const { data } = useFetch<User[]>(url) → data: User[] | null
//
// `data` is nullable on purpose: TypeScript will refuse
// `data.map(...)` unless you first narrow with `if (!data) return`
// (or `data?.map`, or an early loading/error check). That's the
// whole point of the generic — it's not just typed, it forces the
// null check at compile time.
export function useFetch<T>(url: string): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        const json = (await res.json()) as T;

        if (cancelled) return;
        setData(json);
        setLoading(false);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Something went wrong");
        setData(null);
        setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return { data, loading, error };
}