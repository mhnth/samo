'use client';

import { openSidebarModalAtom } from '@/hooks/jotai';
import { useAtom } from 'jotai';
import Link from 'next/link';
import React from 'react';

interface NavViewProps {}

export const NavView: React.FC<NavViewProps> = ({}) => {
  const [openSideBar, setOpenSideBar] = useAtom(openSidebarModalAtom);

  return (
    <>
      <Link
        onClick={() => setOpenSideBar(false)}
        href={'/dashboard'}
        className="w-full cursor-pointer py-3 hover:bg-gray-400"
      >
        dashboard
      </Link>
      <Link
        onClick={() => setOpenSideBar(false)}
        href={'/budget'}
        className="w-full cursor-pointer py-3 hover:bg-gray-400"
      >
        budget
      </Link>
      <Link
        onClick={() => setOpenSideBar(false)}
        href={'/transaction'}
        className="w-full cursor-pointer py-3 hover:bg-gray-400"
      >
        transaction
      </Link>
    </>
  );
};
