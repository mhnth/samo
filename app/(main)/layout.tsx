import type { Metadata } from 'next';
import AppLayoutClient from './layout.client';
import { getServerUser } from '@/lib/getServerUser';
import { redirect } from 'next/navigation';
import Header from '@/components/header';
import { Modal } from '@/components/modal';
import { Sidebar } from '@/components/sidebar';
import { getBudgetCategory } from '@/lib/queries';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getServerUser();

  if (!user) redirect('/signin');

  const data = await getBudgetCategory();
  return (
    <>
      <Modal budgets={data?.budget} categories={data?.category} />
      <Header />
      <div className="md:flex md:gap-4">
        <Sidebar />
        <div className="h-[calc(100vh-48px)] md:grow">{children}</div>
      </div>
    </>
  );
}
