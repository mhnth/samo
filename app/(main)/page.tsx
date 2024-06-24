import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const user = await getServerSession();

  if (user) redirect('/dashboard');

  return <h1>My Page</h1>;
}
