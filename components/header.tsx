'use client';

import { useAtom } from 'jotai';
import { modalAtom } from '@/hooks/jotai';
import { ILogo, IMenu } from './icons';
import Avatar from './avatar';

export default function Header() {
  const [_, setModalView] = useAtom(modalAtom);


  return (
    <header className="flex h-12 items-center justify-between bg-white py-2 shadow">
      <div className="mx-8 hidden w-full md:flex">
        <div className="flex items-center gap-2 text-lg font-bold text-primary-400">
          <ILogo /> finence
        </div>
      </div>
      <span
        className="inline-block w-max cursor-pointer md:hidden"
        onClick={(e) => {
          setModalView({ view: 'sidebar' });
        }}
      >
        <IMenu />
      </span>
      <Avatar />
    </header>
  );
}
