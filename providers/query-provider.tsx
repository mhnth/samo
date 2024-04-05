'use client';

import { PropsWithChildren, useState } from 'react';
import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from '@tanstack/react-query';

interface Props extends PropsWithChildren<any> {
  queryConfig?: QueryClientConfig;
}

export default function Provider({ children, queryConfig }: Props) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
