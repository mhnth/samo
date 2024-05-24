'use client';

import { modalAtom } from '@/hooks/jotai';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { emojiCategories } from '@/lib/constants';
import { cx } from '@/lib/utils';
import { Backdrop } from './backdrop';
import { useBudgets } from '@/hooks/useGetBudgets';

export default function TransactionModal() {
  const [_, setModalView] = useAtom(modalAtom);
  const { data: budgets, loading, error } = useBudgets();

  const [selectedOption, setSelectedOption] = useState<string>('');
  const [newOption, setNewOption] = useState<string>('');

  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [openEmoji, setOpenEmoji] = useState<boolean>(false);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    if (value === 'addNew') {
      setSelectedOption('addNew');
    } else {
      setSelectedOption(value);
    }
  };

  const handleAddNewOption = () => {
    if (newOption.trim() !== '') {
      setSelectedOption(newOption);
      setNewOption('');
    }
  };

  return (
    <Backdrop onOutSideClick={() => setModalView(null)}>
      <div className="m-auto w-5/6 max-w-xl rounded-md bg-white p-6">
        <div className="mb-6 text-xl">Tạo Giao Dịch</div>
        <form action="">
          <div className="flex flex-col">
            <label className="font-semibold text-slate-700">
              Số tiền
              <input
                type="number"
                className="input"
                placeholder="500000"
                required
              />
            </label>
          </div>
          <div className="mt-3 flex flex-col">
            <label className="font-semibold text-slate-700">
              Ghi chú
              <input className="input" type="text" placeholder="Bữa sáng" />
            </label>
          </div>
          <div className="mt-3 flex flex-col">
            <label className="font-semibold text-slate-700">
              Danh mục
              <select
                value={budgets ? budgets[0].name : selectedOption}
                onChange={handleSelectChange}
                className={cx(
                  'mt-2 block w-full overflow-scroll rounded-md bg-gray-300 p-2.5',
                  selectedOption === 'addNew' && 'rounded-b-none',
                )}
              >
                <option className="w-full" value="addNew">
                  + Thêm danh mục mới
                </option>
              </select>
              {selectedOption === 'addNew' && (
                <div className="relative rounded-b-md bg-gray-300 p-0">
                  <div className="flex w-full items-center justify-between gap-2 p-2 pb-6">
                    <div
                      onClick={() => setOpenEmoji(() => !openEmoji)}
                      className="flex h-11 w-12 items-center justify-center rounded-md bg-gray-400"
                    >
                      {selectedEmoji || emojiCategories[0]}
                    </div>
                    <input
                      className="w-auto rounded-md bg-gray-500 p-2.5 text-white"
                      type="text"
                      name=""
                      id=""
                      placeholder="ăn uống"
                    />
                  </div>
                  {openEmoji && (
                    <div className="emoji absolute top-full mt-2 flex flex-wrap gap-2 rounded-md bg-gray-400 p-2">
                      {emojiCategories.map((e, i) => {
                        return (
                          <span
                            key={i}
                            onClick={() => {
                              setSelectedEmoji(e);
                              setOpenEmoji(false);
                            }}
                          >
                            {e}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </label>
          </div>
          <div className="mt-3 flex flex-col">
            <label className="font-semibold text-slate-700">
              Ngân sách
              <select className="mt-2 block w-full rounded-md bg-gray-300 p-2.5">
                {budgets &&
                  budgets.map((b, i) => {
                    return (
                      <option key={i} value={b.name}>
                        {b.name}
                      </option>
                    );
                  })}
              </select>
            </label>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Select an option
            </label>
          </div>

          <div className="flex items-center justify-end">
            <button
              onClick={() => setModalView(null)}
              className="font-semibold"
            >
              Cancel
            </button>
            <button
              className="ml-4 mr-2 rounded-md bg-primary-400 px-4 py-2 font-semibold 
              text-primary-950 hover:bg-primary-600"
              type="submit"
            >
              Xác nhận
            </button>
          </div>
        </form>
      </div>
    </Backdrop>
  );
}
