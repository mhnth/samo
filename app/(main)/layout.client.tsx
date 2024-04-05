'use client';

import Header from '@/components/header';
import { Modal } from '@/components/modal';
import Sidebar from '@/components/sidebar';
import { openSidebarModalAtom } from '@/hooks/jotai';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useAtom } from 'jotai';

export default function AppLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const isBreakPoint = useMediaQuery('768px');
  const [openSidebar, setOpenSidebar] = useAtom(openSidebarModalAtom);
  return (
    <>
      <Header />
      {openSidebar && (
        <Modal onOutSideClick={() => setOpenSidebar(false)}>
          <Sidebar />
        </Modal>
      )}
      <div className="md:flex md:gap-4">
        {isBreakPoint ? <Sidebar /> : ''}
        <div className="md:grow">{children}</div>
      </div>
    </>
  );
}
