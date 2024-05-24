import BudgetUI from '@/components/budget';
import prisma from '@/lib/prismadb';

const getBudgets = async () => {
  const budgets = await prisma.user.findUnique({
    where: {
      email: 'a@gmail.com',
    },
    select: {
      budget: true,
    },
  });

  return budgets?.budget || null;
};

export default async function BudgetPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const budgets = await getBudgets();

  return <BudgetUI budgets={budgets} />;
}
