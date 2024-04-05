import { useState } from 'react';

export const useCreateBudget = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createBudget = async () => {};
};
