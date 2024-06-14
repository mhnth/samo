import BudgetUI from '@/components/budget';
import { getBudgetCategory } from '@/lib/query';

export default async function BudgetPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const data = await getBudgetCategory();

  return <BudgetUI budgets={data?.budget || null} />;
}
