import Header from '@/components/header';
import { Modal } from '@/components/modal';
import { getBudgetCategory } from '@/lib/query';

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
        <div className="md:grow">{children}</div>
      </div>
    </>
  );
}
