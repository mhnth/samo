'use client';

import useQuery from '@/hooks/useQuery';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';
import { useState } from 'react';

const getBudgets = async () => {
  console.log('res');
  const res = await fetch('http://localhost:3000/api/budget', {
    cache: 'force-cache',
  });

  const data = await res.json();

  return data.budget;

  // return await res.json();
};

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { data, error, loading } = useQuery(getBudgets);
  const [isFilter, setIsFilter] = useState<boolean>(false);
  let budget: any[] = data;

  const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFilter(event.target.checked);
  };

  if (isFilter) {
    budget.filter((b) => b.isActive !== false);
  }

  return (
    <div className="mx-auto mt-6 max-w-6xl p-2">
      <div className="flex items-center justify-between">
        <span className="font-semibold">Danh sách</span>
        <Link
          className="rounded-md bg-primary-800 p-2 text-white hover:bg-primary-500"
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
        {budget &&
          (budget as any[]).map((b, i) => {
            return (
              <div
                className="mt-3 rounded-md border border-transparent bg-white p-4 shadow hover:border-primary-500"
                key={i}
              >
                <span className="block font-semibold text-gray-700">
                  {b.name}
                </span>
                <span className="mx-2 block text-2xl font-semibold">
                  {formatCurrency(123)}
                </span>
                <div className="mx-1 mt-2 flex justify-between">
                  <div>
                    <label className="text-sm font-semibold" htmlFor="">
                      Thu nhập:{' '}
                    </label>
                    <span>{formatCurrency(b.targetAmount)}</span>
                  </div>
                  <div>
                    <label className="text-sm font-semibold" htmlFor="">
                      Đã chi tiêu:{' '}
                    </label>
                    <span>{formatCurrency(123466)}</span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
