import { getServerSession } from 'next-auth';

export const getServerUser = async () => {
  const session = await getServerSession();

  if (!session?.user) return null;

  const user = await prisma?.user.findUnique({
    where: { email: session.user.email! },
  });

  if (!user) return null;

  const { password, ...userWithoutPassword } = user;

  return userWithoutPassword;
};
