'use client';

import { AddBudgetView } from '@/components/add-budget-view';
import { Modal } from '@/components/modal';
import { useState } from 'react';

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [openAddBudgetModal, setOpenAddBudgetModal] = useState<boolean>(false);

  return (
    <>
      <div className="mt-4">
        <button
          className="rounded-sm bg-gray-500 px-3 py-2"
          onClick={() => setOpenAddBudgetModal(true)}
        >
          add budget
        </button>
      </div>

      {openAddBudgetModal && (
        <Modal
          variant="center"
          onOutSideClick={() => {
            setOpenAddBudgetModal(false);
          }}
        >
          <AddBudgetView />
        </Modal>
      )}
    </>
  );
}
