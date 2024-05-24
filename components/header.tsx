'use client';

import { useAtom } from 'jotai';
import { modalAtom, openSidebarModalAtom } from '@/hooks/jotai';
import { IMenu } from './icons';

export default function Header() {
  const [_, setModalView] = useAtom(modalAtom);

  return (
    <header className="flex items-center bg-white py-2 shadow">
      <div className="hidden md:block">Logo</div>
      <span
        className="inline-block w-max cursor-pointer md:hidden"
        onClick={(e) => {
          setModalView({ view: 'sidebar' });
        }}
      >
        <IMenu />
      </span>
    </header>
  );
}
