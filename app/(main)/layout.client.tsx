import Header from '@/components/header';
import { Modal } from '@/components/modal';
import { Sidebar } from '@/components/sidebar';
import { getBudgetCategory } from '@/lib/queries';

export default async function AppLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
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
