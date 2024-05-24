'use client';

import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';
import { useState } from 'react';

interface Budget {
  id: string;
  name: string;
  targetAmount: number;
  amountUsed: number | null;
  amountRemaining: number | null;
  description: string | null;
  isActive: boolean;
  createAt: Date;
  ownerId: string;
}

interface BudgetUIProps {
  budgets: Budget[] | null;
}

export const BudgetUI: React.FC<BudgetUIProps> = (props) => {
  const [budgets, setBudgets] = useState<Budget[] | null>(props.budgets);
  // const { budgets } = props;

  const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked && props.budgets) {
      const filterBudgets = props.budgets?.filter((b) => b.isActive === true);

      setBudgets(() => filterBudgets);
    }
  };

  return (
    <div className="mx-auto mt-6 max-w-6xl p-2">
      <div className="flex items-center justify-between">
        <span className="font-semibold">Danh sách</span>
        <Link
          className="rounded-md bg-primary-800 p-1 px-2 text-white hover:bg-primary-500"
          href={'/budget/add'}
        >
          +Thêm mới
        </Link>
      </div>
      <div className="mt-2">
        <input id="checkbox" onChange={handleCheckBoxChange} type="checkbox" />
        <label className="ml-2" htmlFor="checkbox">
          Ẩn ngân sách đã đóng
        </label>
      </div>
      <div className="mt-4">
        {budgets &&
          (budgets as any[]).map((b, i) => {
            return (
              <div
                className="mt-3 rounded-md border border-transparent bg-white shadow hover:border-primary-500"
                key={i}
              >
                <div className="border-b-[0.5px] border-gray-200 p-4 py-2">
                  <span className="block font-semibold text-gray-700">
                    {b.name}
                  </span>
                </div>
                <div className="p-4 pt-2">
                  <span className="mx-2 block py-1 text-2xl font-semibold">
                    {formatCurrency(123)}
                  </span>
                  <div className="mx-1 mt-2 flex justify-between">
                    <div>
                      <label className="text-sm font-semibold" htmlFor="">
                        Thu nhập:{' '}
                      </label>
                      <span className="">{formatCurrency(b.targetAmount)}</span>
                    </div>
                    <div>
                      <label className="text-sm font-semibold" htmlFor="">
                        Đã chi tiêu:{' '}
                      </label>
                      <span>{formatCurrency(123466)}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default BudgetUI;
