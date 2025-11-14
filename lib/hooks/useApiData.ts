import { useState, useEffect } from "react";

interface UseApiDataOptions<T> {
  endpoint: string;
  fallback: T;
  cache?: boolean;
  cacheTTL?: number;
}

interface UseApiDataReturn<T> {
  data: T;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
  setData: (data: T) => void;
}

/**
 * Custom hook for fetching data from API with built-in caching, error handling, and fallback support.
 * Reduces code duplication across components and provides consistent fetch logic.
 *
 * @example
 * const { data: heroData, isLoading, error } = useApiData({
 *   endpoint: '/api/hero-data',
 *   fallback: DEFAULT_HERO,
 * });
 */
export function useApiData<T>({
  endpoint,
  fallback,
  cache = true,
  cacheTTL = 5 * 60 * 1000, // 5 minutes default
}: UseApiDataOptions<T>): UseApiDataReturn<T> {
  const [data, setData] = useState<T>(fallback);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Check cache first
      if (cache) {
        const cacheKey = `cache_${endpoint}`;
        const cachedEntry = localStorage.getItem(cacheKey);

        if (cachedEntry) {
          try {
            const { data: cachedData, timestamp } = JSON.parse(cachedEntry);
            if (Date.now() - timestamp < cacheTTL) {
              setData(cachedData);
              setIsLoading(false);
              return;
            }
          } catch {
            // Invalid cache, continue with fetch
          }
        }
      }

      // Fetch from API
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const result = (await response.json()) as T;
      setData(result);

      // Store in cache
      if (cache) {
        try {
          localStorage.setItem(
            `cache_${endpoint}`,
            JSON.stringify({
              data: result,
              timestamp: Date.now(),
            })
          );
        } catch {
          // Cache write failed, continue anyway
        }
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      setData(fallback);
      console.error(`Error fetching ${endpoint}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  return { data, isLoading, error, refetch: fetchData, setData };
}
