import { getServerSession } from 'next-auth';
import { Options } from '@/app/api/auth/[...nextauth]/route';

export async function getSession() {
  return await getServerSession(Options);
}

export async function getCurrentUser() {
  const session = await getSession();
  return session;
}
