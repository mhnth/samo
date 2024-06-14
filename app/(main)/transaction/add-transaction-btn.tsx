'use client';

import { modalAtom } from '@/hooks/jotai';
import { useAtom } from 'jotai';
import React from 'react';

interface AddTransactionButtonProps {}

export const AddTransactionButton: React.FC<
  AddTransactionButtonProps
> = ({}) => {
  const [_, setModalView] = useAtom(modalAtom);

  return (
    <div className="mt-0">
      <button
        onClick={() => setModalView({ view: 'transaction' })}
        className="rounded-md bg-primary-600 p-1 px-2 text-white hover:bg-primary-500"
      >
        +Thêm mới
      </button>
    </div>
  );
};
