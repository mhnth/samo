import { getServerSession } from 'next-auth';

export const getServerUser = async () => {
  const session = await getServerSession();

  if (!session) return null;

  return session.user;
};
