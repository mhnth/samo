import { EditBudget } from './edit-budget';

const initialState = {
  message: '',
  isOk: false,
};

export default async function AddBudgetPage({
  params,
  searchParams,
}: {
  params: { budgetId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const budgetId = params.budgetId;

  const data = await prisma?.budget.findUnique({ where: { id: budgetId } });

  if (!data) return <div>Không tìm thấy budget</div>;

  return <EditBudget budget={data} />;
}
