import { useState, useEffect } from 'react';

type FetchFunction<T> = (param?: any) => Promise<T>;

function useQuery<T>(
  fetchFunction: FetchFunction<T>,
  param?: any,
): {
  data: T | null;
  loading: boolean;
  error: Error | null;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null | any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchFunction(param);
        setData(result);
        setError(null);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      // cleanup code, if necessary
    };
  }, [fetchFunction, param]);

  return { data, loading, error };
}

export default useQuery;
