import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = await getServerSession();

  console.log('user session', user);
  if (!user) redirect('/signin');

  return <h1>My Page</h1>;
}
