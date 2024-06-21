import { getBudgetCategory } from '@/lib/queries';
import { EditTransaction } from './edit-transaction';
import { getTransaction } from '@/lib/queries';

const initialState = {
  message: '',
  isOk: false,
};

export default async function EditTransactionPage({
  params,
  searchParams,
}: {
  params: { transactionId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const transactionId = params.transactionId;

  const transaction = await getTransaction(transactionId);

  const data = await getBudgetCategory();

  if (!transaction) return <div>Không tìm thấy Giao dịch này</div>;

  return (
    <EditTransaction
      budgets={data?.budget}
      categories={data?.category}
      transaction={transaction}
    />
  );
}
