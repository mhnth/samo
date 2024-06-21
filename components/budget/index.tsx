'use client';

import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';
import { useState } from 'react';
import { type Budget } from '@prisma/client';
import { ProcessRange } from '../ui/process-range';

interface BudgetWithTotals extends Budget {
  totalIncome: number;
  totalExpense: number;
}

interface BudgetUIProps {
  budgets: BudgetWithTotals[] | null;
}

export const BudgetUI: React.FC<BudgetUIProps> = (props) => {
  const [budgets, setBudgets] = useState<BudgetWithTotals[] | null>(
    props.budgets,
  );

  const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked && props.budgets) {
      const filterBudgets = props.budgets?.filter((b) => b.isActive === true);

      setBudgets(() => filterBudgets);
    } else {
      setBudgets(() => props.budgets);
    }
  };

  return (
    <div className="mx-auto mt-6 max-w-4xl p-2 px-6">
      <div className="flex items-center justify-between">
        <span className="font-semibold">Danh sách</span>
        <Link
          className="rounded-md bg-primary-500 p-1 px-2 text-white hover:bg-primary-400"
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
      <div className="mt-4 grid-cols-2 gap-2 md:grid">
        {budgets &&
          budgets.map((b, i) => {
            return (
              <Link
                href={`/budget/${b.id}/edit`}
                className="mt-3 block rounded-md border border-gray-300 bg-white 
                shadow-md hover:border-primary-500"
                key={i}
              >
                <div className="border-b-[0.5px] border-gray-200 p-4 py-2">
                  <span className="block font-semibold text-gray-700">
                    {b.name}
                  </span>
                </div>
                <div className="mt-2 flex flex-col justify-between gap-1 p-4 text-gray-500">
                  <div className="flex justify-between">
                    <label className="text-sm font-semibold" htmlFor="">
                      Mục tiêu
                    </label>
                    <span className="text-gray-900">
                      {formatCurrency(b.targetAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <label className="text-sm font-semibold" htmlFor="">
                      Thu nhập:
                    </label>
                    <span className="text-gray-900">
                      {formatCurrency(b.totalIncome)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <label className="text-sm font-semibold" htmlFor="">
                      Đã chi tiêu:
                    </label>
                    <span className="text-gray-900">
                      {formatCurrency(b.totalExpense)}
                    </span>
                  </div>
                </div>
                <ProcessRange
                  current={b.totalExpense}
                  total={b.targetAmount}
                  type="red"
                />
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default BudgetUI;
