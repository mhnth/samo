import { modalAtom } from '@/hooks/jotai';
import { useAtom } from 'jotai';
import React from 'react';
import TransactionModal from './add-transaction-modal';
import SidebarModal from './sidebar-modal';

interface ModalProps {}

export const Modal: React.FC<ModalProps> = ({}) => {
  const [modal, setModalView] = useAtom(modalAtom);
  return (
    <>
      {modal &&
        ((modal.view === 'sidebar' && <SidebarModal />) ||
          (modal.view === 'transaction' && <TransactionModal />))}
    </>
  );
};
