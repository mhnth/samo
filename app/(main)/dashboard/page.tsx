import Charts from '@/components/chart';
import { getDashboardData, getTransactions } from '@/lib/queries';
import { cx, formatDate } from '@/lib/utils';

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const dataChart = await getDashboardData();
  const transaction = await getTransactions();

  return (
    <div className="h-[calc(100vh-58px)] p-4">
      {dataChart?.props.expenseByCategory &&
        dataChart.props.incomeExpenseByMonth && (
          <Charts
            expenseByCategory={dataChart.props.expenseByCategory}
            incomeExpenseByMonth={dataChart.props.incomeExpenseByMonth}
          />
        )}
      {transaction && (
        <div
          className="relative mx-auto mt-4 h-2/5 overflow-y-scroll bg-white px-2 shadow-md 
        md:max-h-[450px] md:max-w-7xl"
        >
          <span className="sticky top-0 block bg-white p-2 text-xl">
            Giao dịch gần đây
          </span>
          {transaction.map((t, i) => {
            return (
              <div className="border-b border-b-gray-100 py-2" key={i}>
                <div className="flex justify-between">
                  <span>{t.category.emoji + ' ' + t.category.name}</span>
                  <span
                    className={cx(
                      t.category.isIncome ? 'text-green-500' : 'text-red-500',
                      'mt-1 block',
                    )}
                  >
                    {t.category.isIncome ? '+' + t.amount : '-' + t.amount}
                  </span>
                </div>
                <span>{formatDate(t.createAt)}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
