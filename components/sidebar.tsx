'use client';

import Link from 'next/link';
import { useAtom } from 'jotai';
import { openSidebarModalAtom } from '@/hooks/jotai';
import IExit from './icons/exit';
import IDashboard from './icons/dashboard';
import IBudget from './icons/budget';
import ITransaction from './icons/transaction';
import IMoneyCollect from './icons/moneycollect';
import ILink from './icons/link';

export default function Sidebar() {
  const [_, setOpenSideBar] = useAtom(openSidebarModalAtom);

  return (
    <div className="h-screen w-full max-w-[300px] border-r border-r-slate-200 bg-white md:max-w-[250px]">
      <div className="ml-3 flex items-center justify-between md:hidden">
        <span>Logo</span>
        <span className="p-2">
          <IExit className="" onClick={() => setOpenSideBar(false)} />
        </span>
      </div>
      <ul className="mt-4">
        <li>
          <Link
            onClick={() => setOpenSideBar(false)}
            href={'/dashboard'}
            className="flex w-full cursor-pointer items-center gap-3 p-2 px-4 hover:bg-slate-100"
          >
            <IDashboard />
            Tổng quan
          </Link>
        </li>
        <li>
          <Link
            onClick={() => setOpenSideBar(false)}
            href={'/budget'}
            className="flex w-full cursor-pointer items-center gap-3 p-2 px-4 hover:bg-slate-100"
          >
            <IBudget />
            Ngân sách
          </Link>
        </li>
        <li>
          <Link href={'/transaction'}>
            <div
              onClick={() => setOpenSideBar(false)}
              className="flex w-full cursor-pointer items-center gap-3 p-2 px-4 hover:bg-slate-100"
            >
              <ITransaction />
              Giao dịch
            </div>
          </Link>
        </li>{' '}
        <li>
          <Link href={'/transaction'}>
            <div
              onClick={() => setOpenSideBar(false)}
              className="flex w-full cursor-pointer items-center gap-3 p-2 px-4 hover:bg-slate-100"
            >
              <IMoneyCollect />
              Kế hoạch tài chính
            </div>
          </Link>
        </li>
        <li>
          <Link href={'/transaction'}>
            <div
              onClick={() => setOpenSideBar(false)}
              className="flex w-full cursor-pointer items-center gap-3 p-2 px-4 hover:bg-slate-100"
            >
              <ILink />
              Liên kết
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}
