import 'server-only';

import { cache } from 'react';
import { type User } from '@prisma/client';
import prisma from './prismadb';
import { getServerSession } from 'next-auth';

export const getUser = cache(async (): Promise<User | null> => {
  const session = await getServerSession();

  if (!session?.user?.email) return null;

  const email = session.user.email;

  const user = await prisma.user.findUnique({ where: { email } });

  return user;
});
