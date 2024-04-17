'use server';

import { getServerSession } from 'next-auth';
import { z } from 'zod';
import prisma from '@/lib/prismadb';
import { revalidatePath } from 'next/cache';

export async function createBudget(
  prevState: { message: string },
  formData: FormData,
) {
  const user = await getServerSession();

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

  if (!parse.success || !user?.user?.email) {
    return { message: 'Failed to create Budget!' };
  }
  const data = parse.data;

  try {
    await prisma?.user.update({
      where: {
        email: user.user.email,
      },
      data: {
        budget: {
          create: {
            name: data.name,
            targetAmount: data.targetAmount,
            description: data.description,
          },
        },
      },
    });

    revalidatePath('/');
  } catch (e) {
    console.log('ERROR create Budget:', e);
    return { message: 'Failed to create Budget!' };
  }

  return { message: 'Create Budget success! ' };
}
