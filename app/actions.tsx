'use server';

import { z } from 'zod';
import prisma from '@/lib/prismadb';
import { revalidatePath, revalidateTag } from 'next/cache';
import { getServerUser } from '@/lib/getServerUser';
import { TAGS } from '@/lib/query-tags';

export async function createBudget(
  prevState: { message: string; isOk: boolean },
  formData: FormData,
) {
  const user = await getServerUser();

  const schema = z.object({
    name: z.string(),
    targetAmount: z.number(),
    description: z.string().optional().or(z.literal('')),
  });

  const targetAmountString = formData.get('targetAmount');
  const targetAmount = targetAmountString
    ? parseFloat(targetAmountString as string)
    : undefined;

  const parse = schema.safeParse({
    name: formData.get('name'),
    targetAmount: targetAmount,
    description: formData.get('description'),
  });

  if (!parse.success || !user?.email) {
    return { message: 'Failed to create Budget!', isOk: false };
  }
  const data = parse.data;

  try {
    await prisma?.budget.create({
      data: {
        owner: { connect: { id: user.id } },
        name: data.name,
        targetAmount: data.targetAmount,
        description: data.description,
      },
    });

    revalidateTag(TAGS.budget_category);
  } catch (e) {
    console.log('ERROR create Budget:', e);
    return { message: 'Failed to create Budget!', isOk: true };
  }

  return { message: 'Create Budget success!', isOk: true };
}

export async function updateBudget(
  prevState: { message: string; isOk: boolean },
  formData: FormData,
) {
  const user = await getServerUser();

  const schema = z.object({
    name: z.string(),
    budgetId: z.string(),
    targetAmount: z.number(),
    description: z.string().optional().or(z.literal('')),
    isActive: z.boolean(),
  });

  const targetAmountString = formData.get('targetAmount');
  const targetAmount = targetAmountString
    ? parseFloat(targetAmountString as string)
    : undefined;

  const isActive = formData.get('isActive') === 'true';

  const parse = schema.safeParse({
    name: formData.get('name'),
    targetAmount: targetAmount,
    description: formData.get('description'),
    budgetId: formData.get('budgetId'),
    isActive: isActive,
  });

  if (!parse.success || !user?.email) {
    return { message: 'Failed to create Budget!', isOk: false };
  }
  const data = parse.data;

  try {
    await prisma?.budget.update({
      where: { id: data.budgetId },
      data: {
        owner: { connect: { id: user.id } },
        name: data.name,
        targetAmount: data.targetAmount,
        description: data.description,
        isActive,
      },
    });

    revalidateTag(TAGS.budget_category);
  } catch (e) {
    console.log('ERROR create Budget:', e);
    return { message: 'Failed to create Budget!', isOk: true };
  }

  return { message: 'Create Budget success!', isOk: true };
}

export async function deactivateBudget(
  prevState: {
    message: string;
    isOk: boolean;
  },
  formData: FormData,
) {
  const schema = z.object({
    id: z.string().min(1),
  });
  const data = schema.parse({
    id: formData.get('id'),
  });

  try {
    await prisma.budget.update({
      where: {
        id: data.id,
      },
      data: {
        isActive: false,
      },
    });

    revalidatePath('/');
    return { message: `Deactivated budget!`, isOk: true };
  } catch (e) {
    console.log(`Error Deactivate budget:`, e);

    return { message: 'Failed to deactivated budget', isOk: false };
  }
}

export async function createTransaction(
  prevState: { message: string },
  formData: FormData,
) {
  const user = await getServerUser();

  if (!user) return { message: '' };

  const categoryId = formData.get('categoryId');
  const budgetId = formData.get('budgetId');

  const isIncomeString = formData.get('isIncome');
  const isIncome = isIncomeString ? parseFloat(isIncomeString as string) : 0;

  const amountString = formData.get('amount');
  const amount = amountString ? parseFloat(amountString as string) : NaN;

  const schema = z.object({
    amount: z.number(),
    description: z.string().optional().or(z.literal('')),
    categoryId: z.string(),
    emoji: z.string(),
    isIncome: z.number(),
    newCategoryName: z.string(),
    budgetId: z.string(),
  });

  const parse = schema.safeParse({
    amount: amount,
    description: formData.get('description'),
    categoryId: categoryId,
    emoji: formData.get('emoji'),
    isIncome: isIncome,
    newCategoryName: formData.get('newCategory'),
    budgetId: budgetId,
  });

  if (!parse.success) {
    return { message: 'Failed to create Budget!' };
  }

  const data = parse.data;

  try {
    if (categoryId === 'addNew') {
      await prisma?.transaction.create({
        data: {
          owner: { connect: { id: user.id } },
          budget: { connect: { id: data.budgetId } },
          category: {
            create: {
              name: data.newCategoryName,
              emoji: data.emoji,
              isIncome: data.isIncome,
              owner: { connect: { id: user.id } },
            },
          },
          amount: data.amount,
          description: data.description || '',
        },
      });
    } else {
      try {
        const t = await prisma?.transaction.create({
          data: {
            owner: { connect: { id: user.id } },
            category: { connect: { id: data.categoryId } },
            budget: { connect: { id: data.budgetId } },
            amount: data.amount,
            description: data.description || '',
          },
        });
      } catch (error) {
        console.log('Prisma create transaction err:', error);
      }
    }

    revalidateTag(TAGS.budget_category);
    revalidateTag(TAGS.transactions);
  } catch (error) {
    return { message: 'Fail to create Transaction! ' };
  }

  return { message: 'Create Transaction success!' };
}
