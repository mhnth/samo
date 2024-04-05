'use client';

import { useAtom } from 'jotai';
import { openSidebarModalAtom } from '@/hooks/jotai';
import { IMenu } from './icons';

export default function Header() {
  const [_, setOpenSidebar] = useAtom(openSidebarModalAtom);

  return (
    <header className="bg-slate-50 py-2">
      <div className="hidden md:block">Logo</div>
      <div
        className="cursor-pointer md:hidden"
        onClick={(e) => {
          setOpenSidebar(true);
        }}
      >
        <IMenu />
      </div>
    </header>
  );
}
