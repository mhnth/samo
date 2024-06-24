import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  // const user = await getServerSession();

  // if (!user) redirect('/signin');

  return <h1>My Page</h1>;
}
