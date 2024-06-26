'use client';

import { Budget } from '@prisma/client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { deleteBudget, updateBudget } from '@/lib/actions';
import { useRouter } from 'next/navigation';

interface EditBudgetProps {
  budget: Budget;
}

interface BudgetState {
  name: string;
  targetAmount: number;
  description?: string;
  isActive: boolean;
}

const initialState = {
  message: '',
  isOk: false,
};

export const EditBudget: React.FC<EditBudgetProps> = ({ budget }) => {
  const [formState, formAction] = useFormState(updateBudget, initialState);
  const router = useRouter();
  const [state, setState] = useState<BudgetState>({
    name: budget.name,
    description: budget.description || '',
    targetAmount: budget.targetAmount,
    isActive: true,
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    if (formState.isOk === true) {
      router.push('/budget');
    }
  }, [formState]);

  return (
    <div className="mx-auto mt-6 w-5/6 max-w-xl rounded-md bg-white p-6 shadow-md md:mt-24">
      <span className="mb-6 text-xl">Chỉnh sửa danh mục</span>
      <form
        action={async (f) => {
          f.append('budgetId', budget.id);
          formAction(f);
        }}
      >
        <div className="mt-3 flex flex-col gap-1">
          <label
            htmlFor="name"
            className="text-sm font-semibold text-slate-700"
          >
            Tên ngân sách
          </label>
          <input
            className="input"
            id="name"
            name="name"
            type="text"
            placeholder="Chi tiêu hàng tháng"
            value={state.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-2">
          <label
            className="text-sm font-semibold text-slate-700"
            htmlFor="targetAmount"
          >
            Mục tiêu (vnđ)
          </label>
          <input
            className="input"
            id="targetAmount"
            name="targetAmount"
            type="number"
            placeholder="100 000 000"
            value={state.targetAmount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-2">
          <label
            className="text-sm font-semibold text-slate-700"
            htmlFor="description"
          >
            Ghi chú
          </label>
          <textarea
            name="description"
            className="input block h-44 w-full"
            value={state.description}
            onChange={handleChange}
            id="description"
          />
        </div>
        <div>
          <label className="mt-4 flex gap-2">
            <input type="checkbox" name="" id="" />
            <span>Đóng ngân sách</span>
          </label>
        </div>
        <div className="mt-8 flex items-center justify-end gap-4">
          <button
            className="mr-auto rounded-md bg-red-200 px-6 py-1 font-semibold text-red-500 
            hover:bg-red-400 hover:text-white"
            onClick={async (e) => {
              e.preventDefault();
              await deleteBudget(budget.id);
              router.push('/budget');
            }}
          >
            Xoá
          </button>
          <Link className="font-semibold text-slate-500" href={'/budget'}>
            Hủy
          </Link>
          <button
            type="submit"
            className="rounded-md bg-primary-500 px-3 py-1 text-slate-50 hover:bg-primary-300"
          >
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
};
