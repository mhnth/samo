'use client';

import Header from '@/components/header';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Modal } from '@/components/modal';

export default function AppLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const isBreakPoint = useMediaQuery('768px');

  return (
    <>
      <Modal />
      <Header />
      <div className="md:flex md:gap-4">
        <div className="md:grow">{children}</div>
      </div>
    </>
  );
}
