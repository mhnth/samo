'use server';

import { unstable_cache } from 'next/cache';
import { getServerUser } from './getServerUser';
import prisma from './prismadb';
import {
  getStartAndEndOfMonth,
  getStartAndEndOfWeek,
  getStartAndEndOfYear,
} from './utils';
import { TAGS } from './constants';

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
  { tags: [TAGS.budget_category, TAGS.budget, TAGS.category, TAGS.all] },
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
  { tags: [TAGS.all, TAGS.transactions] },
);

export const getBudgetWithTotals = unstable_cache(
  async () => {
    const user = await getServerUser();

    if (!user?.email) return null;
    const budgets = await prisma.budget.findMany({
      where: {
        ownerId: user.id,
      },
      include: {
        transaction: {
          include: {
            category: true,
          },
        },
      },
    });

    const budgetWithTotals = budgets.map((budget) => {
      const totalIncome = budget.transaction
        .filter((transaction) => transaction.category.isIncome === 1)
        .reduce((sum, transaction) => sum + transaction.amount, 0);

      const totalExpense = budget.transaction
        .filter((transaction) => transaction.category.isIncome === 0)
        .reduce((sum, transaction) => sum + transaction.amount, 0);

      return {
        ...budget,
        totalIncome,
        totalExpense,
      };
    });

    return budgetWithTotals;
  },
  ['get_budget_with_total'],
  { tags: [TAGS.all, TAGS.budgetWithTotals, TAGS.budget] },
);

export const getTransaction = unstable_cache(
  async (transactionId: string) => {
    const transaction = await prisma?.transaction.findUnique({
      where: { id: transactionId },
    });

    return transaction;
  },
  ['transactionId'],
  { tags: [TAGS.all, 'transactionId'] },
);

export const getProjects = async () => {
  const user = await getServerUser();

  if (!user) return null;

  try {
    const projects = await prisma.financialProject.findMany({
      where: {
        ownerId: user.id,
      },
      include: {
        Contribution: true,
      },
    });

    const projectsWithContribution = projects.map((p) => {
      const fund = p.Contribution.reduce((sum, c) => sum + c.amount, 0);

      return {
        ...p,
        fund,
      };
    });

    return projectsWithContribution;
  } catch (error) {
    console.log('Err fetch Projects:', error);
  }
};

export const getDashboardData = unstable_cache(
  async () => {
    const user = await getServerUser();
    if (!user) return null;

    // Truy vấn dữ liệu từ cơ sở dữ liệu
    const transactions = await prisma.transaction.findMany({
      where: { ownerId: user.id },
      include: {
        category: true,
      },
    });

    // Tính tổng chi tiêu theo danh mục
    const expenseByCategory = transactions.reduce(
      (acc, transaction) => {
        if (transaction.category.isIncome === 0) {
          acc[transaction.category.name] =
            (acc[transaction.category.name] || 0) + transaction.amount;
        }
        return acc;
      },
      {} as { [key: string]: number },
    );

    // Tính tổng thu nhập và chi tiêu theo tháng
    const incomeExpenseByMonth = transactions.reduce(
      (acc, transaction) => {
        const month = transaction.createAt.toISOString().slice(0, 7); // Lấy năm-tháng
        if (!acc[month]) {
          acc[month] = { income: 0, expense: 0 };
        }
        if (transaction.category.isIncome === 1) {
          acc[month].income += transaction.amount;
        } else {
          acc[month].expense += transaction.amount;
        }
        return acc;
      },
      {} as { [key: string]: { income: number; expense: number } },
    );

    return {
      props: {
        expenseByCategory,
        incomeExpenseByMonth,
      },
    };
  },
  ['dashboard'],
  {
    tags: [TAGS.all],
  },
);
