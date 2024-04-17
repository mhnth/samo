'use client';

import { useAtom } from 'jotai';
import { openSidebarModalAtom } from '@/hooks/jotai';
import { IMenu } from './icons';

export default function Header() {
  const [_, setOpenSidebar] = useAtom(openSidebarModalAtom);

  return (
    <header className="flex items-center bg-slate-50 py-2 shadow">
      <div className="hidden md:block">Logo</div>
      <span
        className="inline-block w-max cursor-pointer md:hidden"
        onClick={(e) => {
          setOpenSidebar(true);
        }}
      >
        <IMenu />
      </span>
    </header>
  );
}
