import { getBudgets } from '@/lib/api';
import { Budget } from '@prisma/client';
import { useEffect, useState } from 'react';

interface FetchState {
  data: Budget[] | null;
  loading: boolean;
  error: Error | null | string;
}

export function useGetCategories(): FetchState {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Budget[] | null>(null);

  const fetchBudgets = async () => {
    setLoading(true);
    try {
      const res = await getBudgets();
      console.log('hook', res);

      setData(res.budget);
    } catch (error) {
      setError(error as string);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  return { data, error, loading };
}
