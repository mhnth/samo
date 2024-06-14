'use server';

import { unstable_cache } from 'next/cache';
import { getServerUser } from './getServerUser';
import { TAGS } from './query-tags';
import prisma from './prismadb';
import {
  getStartAndEndOfMonth,
  getStartAndEndOfWeek,
  getStartAndEndOfYear,
} from './utils';

export const getBudgetCategory = unstable_cache(
  async () => {
    const user = await getServerUser();

    if (!user?.email) return null;

    const data = await prisma?.user.findUnique({
      where: {
        email: user.email,
      },
      select: {
        budget: true,
        category: true,
      },
    });

    if (!data) return null;
    const { budget, category } = data;

    return { budget, category };
  },
  ['getBudgets'],
  { tags: [TAGS.budget_category] },
);

export const getTransactions = unstable_cache(
  async (filter: 'week' | 'month' | 'year' = 'week') => {
    const user = await getServerUser();
    if (!user) return null;

    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();

    const { startTime, endTime } =
      filter === 'week'
        ? getStartAndEndOfWeek()
        : filter === 'month'
          ? getStartAndEndOfMonth(year, month)
          : getStartAndEndOfYear(year);

    const data = await prisma?.transaction.findMany({
      where: {
        ownerId: user.id,
        createAt: {
          gte: startTime,
          lte: endTime,
        },
      },
      include: {
        category: {
          select: {
            emoji: true,
            name: true,
            isIncome: true,
          },
        },
        budget: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createAt: 'desc',
      },
    });

    return data;
  },
  ['get_transaction'],
  { tags: [TAGS.transactions] },
);
