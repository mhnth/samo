'use client';

import { convertFormDataToObject, cx } from '@/lib/utils';
import React, { FormEvent, useState } from 'react';
import { DayPicker } from './ui';
import { createBudget } from '@/lib/api';

interface AddBudgetViewProps {}

export const AddBudgetView: React.FC<AddBudgetViewProps> = ({}) => {
  const [checkbox, setCheckbox] = useState({
    cbIncome: false,
    cbNotIncome: false,
  });

  const handleCheckboxChange = (checkbox: string) => {
    setCheckbox({
      cbIncome: checkbox === 'income',
      cbNotIncome: checkbox === 'not_income',
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = convertFormDataToObject(formData);

    createBudget(data);
  };

  return (
    <form action="POST" className="p-3" onSubmit={(e) => onSubmit(e)}>
      <div className="mb-4 flex flex-col">
        <label htmlFor="name" className="i-form_label">
          Tên Ngân Sách*
        </label>
        <input
          name="name"
          type="text"
          className="i-form_input"
          placeholder="Lương tháng"
          required
        />
      </div>

      <div className="mb-4 flex flex-col">
        <label htmlFor="name" className="i-form_label">
          Ngân Sách* (vnd)
        </label>
        <input
          name="amountTarget"
          type="number"
          inputMode="decimal"
          pattern="[0-9]*[.]?[0-9]*"
          className="i-form_input"
          placeholder="100 000 000"
          required
        />
      </div>

      <label className="i-form_label">Thời Gian</label>
      <DayPicker />

      <div className="flex justify-between">
        <label className="i-form_label" htmlFor="">
          Loại ngân sách:
        </label>
        <div className="flex justify-between">
          <div className="">
            <input
              checked={checkbox.cbNotIncome}
              type="checkbox"
              name="budgetType"
              id="not_income"
              value={0}
              onChange={() => {
                handleCheckboxChange('not_income');
              }}
              className="i-form_input"
            />
            <label className="i-form_label ml-1" htmlFor="not_income">
              Chi Tiêu
            </label>
          </div>
          <div className="ml-3">
            <input
              checked={checkbox.cbIncome}
              type="checkbox"
              name="budgetType"
              id="income"
              value={1}
              onChange={() => {
                handleCheckboxChange('income');
              }}
            />
            <label className="i-form_label ml-1" htmlFor="income">
              Thu nhập
            </label>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="mt-20 w-full rounded-sm bg-gray-500 px-4 py-2 hover:bg-gray-100"
      >
        submit
      </button>
    </form>
  );
};
