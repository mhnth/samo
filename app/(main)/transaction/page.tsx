import { getTransactions } from '@/lib/queries';
import { AddTransactionButton } from './add-transaction-btn';
import { cx, formatCurrency, formatDate } from '@/lib/utils';
import Link from 'next/link';

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const filter = searchParams.filter || 'week';
  const [transaction] = await Promise.all([await getTransactions()]);

  return (
    <div className="mx-auto h-full max-w-2xl p-2 px-4 md:w-2/3">
      <div className="mt-3 flex justify-between">
        <h4 className="text-lg">Giao dịch</h4>
        <AddTransactionButton />
      </div>
      <div className="mt-4 flex items-baseline justify-between bg-gray-100">
        <span className="opacity- text-base font-semibold text-gray-500">
          Lịch sử
        </span>
        <div className="flex gap-2 rounded-md bg-gray-100">
          <Link
            className={cx('px-4', filter === 'week' && 'bg-gray-300')}
            href={'/transaction?filter=week'}
          >
            W
          </Link>
          <Link
            className={cx('px-4', filter === 'month' && 'bg-gray-300')}
            href={'/transaction?filter=month'}
          >
            M
          </Link>
          <Link
            className={cx('px-4', filter === 'year' && 'bg-gray-300')}
            href={'/transaction?filter=year'}
          >
            Y
          </Link>
        </div>
      </div>

      <div className="md:h-5/6 md:overflow-y-scroll">
        {transaction
          ? transaction.map((t, i) => {
              return (
                <Link
                  className="mt-1 block border-b border-gray-200 p-2"
                  key={i}
                  href={`/transaction/${t.id}/edit`}
                >
                  <div className="flex justify-between font-semibold">
                    <div className="">
                      {t.category.emoji}
                      <span>{t.category.name}</span>
                    </div>
                    <span>{formatCurrency(t.amount)}</span>
                  </div>

                  <div className="mt-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-sm text-gray-600">Thời gian:</span>
                      <span></span>
                      {formatDate(t.createAt)}
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-sm text-gray-600">Loại:</span>
                      <span
                        className={cx(
                          t.category.isIncome
                            ? 'text-green-500'
                            : 'text-red-500',
                        )}
                      >
                        {t.category.isIncome ? 'Thu nhập' : 'Chi tiêu'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-sm text-gray-600">Ngân sách:</span>
                      {t.budget?.name}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Ghi chú:</span>
                    <p className="text-base text-gray-700">{t.description}</p>
                  </div>
                </Link>
              );
            })
          : null}
      </div>
    </div>
  );
}
