'use server';

import { z } from 'zod';
import prisma from '@/lib/prismadb';
import { revalidatePath, revalidateTag } from 'next/cache';
import { getServerUser } from '@/lib/getServerUser';
import { TAGS } from '@/lib/constants';

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

    revalidateTag(TAGS.budget);
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

    revalidateTag(TAGS.budget);
  } catch (e) {
    console.log('ERROR create Budget:', e);
    return { message: 'Failed to create Budget!', isOk: true };
  }

  return { message: 'Create Budget success!', isOk: true };
}

export async function deleteBudget(budgetId: string) {
  try {
    await prisma.transaction.deleteMany({
      where: {
        budgetId,
      },
    });

    await prisma.budget.delete({
      where: {
        id: budgetId,
      },
    });

    revalidateTag(TAGS.all);
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
    return { message: 'Failed to parse data!' };
  }

  const data = parse.data;

  try {
    if (categoryId === 'addNew') {
      const transactionData: any = {
        owner: { connect: { id: user.id } },
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
      };
      if (data.budgetId !== 'undefined') {
        transactionData.budget = { connect: { id: data.budgetId } };
      }

      await prisma?.transaction.create({
        data: transactionData,
      });
    } else {
      try {
        const transactionData: any = {
          owner: { connect: { id: user.id } },
          category: { connect: { id: data.categoryId } },
          amount: data.amount,
          description: data.description || '',
        };
        if (data.budgetId !== 'undefined') {
          transactionData.budget = { connect: { id: data.budgetId } };
        }

        const t = await prisma?.transaction.create({
          data: transactionData,
        });
      } catch (error) {
        console.log('Prisma create transaction err:', error);
      }
    }

    revalidateTag(TAGS.all);
  } catch (error) {
    return { message: 'Fail to create Transaction! ' };
  }

  return { message: 'Create Transaction success!' };
}

export async function updateTransaction(
  prevState: { message: string },
  formData: FormData,
) {
  const user = await getServerUser();

  if (!user) return { message: '', isOk: false };

  const categoryId = formData.get('categoryId');
  const budgetId = formData.get('budgetId');
  const transactionId = formData.get('transactionId');

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
    transactionId: z.string(),
  });

  const parse = schema.safeParse({
    amount: amount,
    description: formData.get('description'),
    categoryId: categoryId,
    emoji: formData.get('emoji'),
    isIncome: isIncome,
    newCategoryName: formData.get('newCategory'),
    budgetId: budgetId,
    transactionId,
  });

  if (!parse.success) {
    return { message: 'Failed to parse data!', isOk: false };
  }

  const data = parse.data;

  try {
    if (categoryId === 'addNew') {
      await prisma?.transaction.update({
        where: { id: data.transactionId },
        data: {
          owner: { connect: { id: user.id } },
          budget: { connect: budgetId ? { id: data.budgetId } : undefined },
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
        const t = await prisma?.transaction.update({
          where: { id: data.transactionId },
          data: {
            owner: { connect: { id: user.id } },
            category: { connect: { id: data.categoryId } },
            budget: { connect: budgetId ? { id: data.budgetId } : undefined },
            amount: data.amount,
            description: data.description || '',
          },
        });
      } catch (error) {
        console.log('Prisma create transaction err:', error);
      }
    }

    revalidateTag(TAGS.all);
  } catch (error) {
    return { message: 'Fail to update Transaction!', isOk: false };
  }

  return { message: 'Update Transaction success!', isOk: true };
}

export const deleteTransaction = async (transactionId: string) => {
  try {
    await prisma.transaction.delete({ where: { id: transactionId } });

    revalidateTag(TAGS.all);
  } catch (error) {
    console.log('Err Delete transaction: ', error);

    return null;
  }
};

export async function createProject(
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
    return { message: 'Failed to parse project data!', isOk: false };
  }
  const data = parse.data;

  try {
    await prisma?.financialProject.create({
      data: {
        owner: { connect: { id: user.id } },
        name: data.name,
        targetAmount: data.targetAmount,
        description: data.description,
      },
    });

    revalidateTag(TAGS.project);
  } catch (e) {
    console.log('ERROR create Project:', e);
    return { message: 'Failed to create Project!', isOk: true };
  }

  return { message: 'Create Project success!', isOk: true };
}

export async function updateProject(
  prevState: { message: string; isOk: boolean },
  formData: FormData,
) {
  const user = await getServerUser();

  const schema = z.object({
    name: z.string(),
    projectId: z.string(),
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
    projectId: formData.get('projectId'),
  });

  if (!parse.success || !user?.email) {
    return { message: 'Failed parse Project data!', isOk: false };
  }
  const data = parse.data;

  try {
    await prisma?.financialProject.update({
      where: { id: data.projectId },
      data: {
        owner: { connect: { id: user.id } },
        name: data.name,
        targetAmount: data.targetAmount,
        description: data.description,
      },
    });

    revalidateTag(TAGS.project);
  } catch (e) {
    console.log('ERROR create Project:', e);
    return { message: 'Failed to update Project!', isOk: true };
  }

  return { message: 'Create Project success!', isOk: true };
}

export const deleteProject = async (projectId: string) => {
  try {
    await prisma.financialProject.delete({
      where: {
        id: projectId,
      },
    });

    revalidateTag(TAGS.project);
    return true;
  } catch (error) {
    console.log('Err delete Project', projectId);

    return false;
  }
};
