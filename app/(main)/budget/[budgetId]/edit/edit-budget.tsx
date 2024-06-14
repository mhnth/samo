'use client';

import { Spinner } from '@/components/ui';
import { Budget } from '@prisma/client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { DeactivateForm } from './delete-budget';
import { updateBudget } from '@/app/actions';

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

function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending}>
      {pending ? <Spinner /> : 'Xoá'}
    </button>
  );
}

export const EditBudget: React.FC<EditBudgetProps> = ({ budget }) => {
  const [formState, formAction] = useFormState(updateBudget, initialState);
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

  return (
    <div className="mx-auto mt-6 max-w-lg px-4">
      <span className="font-semibold">Thêm danh mục</span>
      <form
        action={(f) => {
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
          <Link className="font-semibold text-slate-500" href={'/budget'}>
            Hủy
          </Link>
          <button
            type="submit"
            className="rounded-md bg-primary-700 px-3 py-1 text-slate-50 hover:bg-primary-500"
          >
            Tạo mới
          </button>
        </div>
      </form>
      <DeactivateForm id={budget.id} />
    </div>
  );
};
