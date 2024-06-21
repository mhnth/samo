'use client';

import { ChangeEvent, FC, useEffect, useState } from 'react';
import { emojiCategories } from '@/lib/constants';
import { cx } from '@/lib/utils';
import { deleteTransaction, updateTransaction } from '@/lib/actions';
import { type Category, type Budget, Transaction } from '@prisma/client';
import { useFormState, useFormStatus } from 'react-dom';
import { Spinner } from '@/components/ui';
import { useRouter } from 'next/navigation';

interface TransactionModalProps {
  budgets: Budget[] | undefined;
  categories: Category[] | undefined;
  transaction: Transaction;
}

const initialState = {
  message: '',
  isOk: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="ml-4 mr-2 flex w-28 justify-center rounded-md bg-primary-400 
              px-4 py-2 font-semibold text-primary-950 hover:bg-primary-600"
      type="submit"
      aria-disabled={pending}
    >
      {pending ? <Spinner /> : 'Xác nhận'}
    </button>
  );
}

export const EditTransaction: FC<TransactionModalProps> = ({
  budgets,
  categories,
  transaction,
}) => {
  const [state, formAction] = useFormState(updateTransaction, initialState);
  const router = useRouter();

  const initialCat =
    categories && categories?.length > 1 ? transaction.categoryId : 'addNew';
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCat);
  const [budgetId, setBudgetId] = useState<string | undefined>(
    budgets ? budgets[0]?.id : '',
  );

  const [selectedEmoji, setSelectedEmoji] = useState(emojiCategories[0]);
  const [openEmoji, setOpenEmoji] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState<string>('');
  const [isIncome, setIsIncome] = useState<string>('0');

  const [amount, setAmount] = useState(transaction.amount);
  const [description, setDescription] = useState(transaction.description);

  const handleChangeEmoji = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    if (value === 'addNew') {
      setSelectedCategory('addNew');
    } else {
      setSelectedCategory(value);
    }
  };

  const handleChangeBudget = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    setBudgetId(value);
  };

  const handleChangeNewCategory = (event: ChangeEvent<HTMLInputElement>) => {
    setNewCategory(event.target.value);
  };

  const handleChangeCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setIsIncome('1');
    } else {
      setIsIncome('0');
    }
  };

  const isOpenCreateCategoryBox =
    selectedCategory === 'addNew' || categories!.length < 1;

  useEffect(() => {
    if (state.isOk === true) router.push('/transaction');
  }, [state.message]);

  return (
    <div className="m-auto mt-6 w-5/6 max-w-xl rounded-md bg-white p-6 shadow-md md:mt-24">
      <div className="mb-6 text-xl">Chỉnh sửa Giao Dịch</div>
      <form
        action={(f) => {
          f.append('emoji', selectedEmoji);
          f.append('newCategory', newCategory);
          f.append('categoryId', selectedCategory);
          f.append('budgetId', budgetId || '');
          f.append('isIncome', isIncome);
          f.append('transactionId', transaction.id);
          formAction(f);
        }}
      >
        <div className="flex flex-col">
          <label className="font-semibold text-slate-700">
            Số tiền
            <input
              name="amount"
              type="number"
              className="input"
              placeholder="500000"
              value={amount}
              onChange={(e) => {
                setAmount(() => +e.target.value);
              }}
              required
            />
          </label>
        </div>
        <div className="mt-3 flex flex-col">
          <label className="font-semibold text-slate-700">
            Ghi chú
            <input
              name="description"
              className="input"
              type="text"
              placeholder="Bữa sáng"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>

        <div className="mt-3 flex flex-col">
          <label className="font-semibold text-slate-700">
            Danh mục
            <select
              value={selectedCategory}
              onChange={handleChangeEmoji}
              className={cx(
                'mt-2 block w-full overflow-scroll rounded-md bg-gray-300 p-2.5',
                isOpenCreateCategoryBox && 'rounded-b-none',
              )}
            >
              <option className="w-full" value="addNew">
                + Thêm danh mục mới
              </option>
              {categories?.map((c, i) => {
                return (
                  <option key={i} value={c.id}>{`${c.emoji} ${c.name}`}</option>
                );
              })}
            </select>
            {isOpenCreateCategoryBox && (
              <div className="relative rounded-b-md bg-gray-300">
                <div className="flex w-full items-center justify-between gap-2 p-2">
                  <div
                    onClick={() => setOpenEmoji(() => !openEmoji)}
                    className="flex h-11 w-12 items-center justify-center rounded-md bg-gray-400"
                  >
                    {selectedEmoji || emojiCategories[0]}
                  </div>
                  <input
                    className="w-auto grow rounded-md bg-gray-400 p-2.5 text-gray-900 placeholder:text-gray-600"
                    type="text"
                    placeholder="ăn uống"
                    onChange={handleChangeNewCategory}
                    required
                  />
                </div>

                {openEmoji && (
                  <div className="emoji absolute top-full flex flex-wrap gap-2 rounded-md bg-gray-400 p-2">
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
                <div className="flex items-center justify-end gap-2 p-3 pt-0">
                  <label htmlFor="income">isIncome:</label>
                  <input
                    id="income"
                    type="checkbox"
                    onChange={handleChangeCheckbox}
                  />
                </div>
              </div>
            )}
          </label>
        </div>
        <div className="mt-3 flex flex-col">
          <label className="mb-8 font-semibold text-slate-700">
            Ngân sách
            <select
              className="mt-2 block w-full rounded-md bg-gray-300 p-2.5"
              onChange={handleChangeBudget}
            >
              {budgets &&
                budgets.map((b, i) => {
                  return (
                    <option key={i} value={b.id}>
                      {b.name}
                    </option>
                  );
                })}
            </select>
          </label>
        </div>

        <div className="flex items-center justify-end">
          <button
            className="mr-auto rounded-md bg-red-200 px-6 py-1 font-semibold text-red-500 
            hover:bg-red-400 hover:text-white"
            onClick={async (e) => {
              e.preventDefault();
              await deleteTransaction(transaction.id);
              router.back();
            }}
          >
            Xoá
          </button>
          <span
            onClick={() => router.back()}
            className="cursor-pointer font-semibold"
          >
            Huỷ
          </span>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
};
