import BudgetUI from '@/components/budget';
import { getBudgetWithTotals } from '@/lib/queries';

export default async function BudgetPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const data = await getBudgetWithTotals();

  return <BudgetUI budgets={data || null} />;
}
