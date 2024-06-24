'use client';

import { modalAtom } from '@/hooks/jotai';
import SidebarModal from './sidebar-modal';
import { TransactionModal } from './add-transaction-modal';
import { useAtom } from 'jotai';
import { Budget, Category } from '@prisma/client';

interface ModalProps {
  budgets: Budget[] | undefined;
  categories: Category[] | undefined;
}

export const Modal: React.FC<ModalProps> = ({ budgets, categories }) => {
  const [modal, setModalView] = useAtom(modalAtom);

  if (!modal) return null;

  switch (modal.view) {
    case 'sidebar':
      return <SidebarModal />;
    case 'transaction':
      return <TransactionModal budgets={budgets} categories={categories} />;
    default:
      return <div></div>;
  }
};
