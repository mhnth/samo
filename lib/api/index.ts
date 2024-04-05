import { TAGS } from './constants';

type ExtractVariables<T> = T extends { variables: object }
  ? T['variables']
  : never;

type RequestMethod = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';

const isServer = typeof window === 'undefined';

const PREFIX_URL = (() => {
  if (process.env.NODE_ENV === 'development')
    return 'http://localhost:3000/api';
  if (isServer) return process.env.API_URL;
  return process.env.NEXT_PUBLIC_API_URL;
})();

export async function customFetch<T>({
  cache = 'force-cache',
  method = 'POST',
  headers,
  path,
  tags,
  body,
}: {
  cache?: RequestCache;
  method?: RequestMethod;
  headers?: HeadersInit;
  path?: string;
  tags?: string[];
  body?: T;
}) {
  try {
    const result = await fetch(`${PREFIX_URL}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(body),
      cache,
      ...(tags && { next: { tags } }),
    });

    const res = await result.json();

    if (res.error) {
      throw res.error;
    }

    return {
      status: result.status,
      res,
    };
  } catch (e) {
    throw {
      error: e,
      // query,
    };
  }
}

export type ShopifyMenuOperation = {
  data: {
    menu?: {
      items: {
        title: string;
        url: string;
      }[];
    };
  };
  variables: {
    handle: string;
    hey: string;
  };
};

export type CreateBudgetData = {
  name: string;
  targetAmount: string;
  description: string;
  startAt: string;
  endAt: string;
};

export type BudgetData = {
  id: string;
  name: string;
};

export async function createBudget(data: CreateBudgetData) {
  await customFetch<CreateBudgetData>({ path: '/budget', body: data });
}

export async function getBudgets(handle: string) {
  const res = await customFetch({
    method: 'GET',
    tags: [TAGS.budgets],
  });

  return res;
}
