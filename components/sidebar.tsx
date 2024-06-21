'use client';

import { openSidebarModalAtom } from '@/hooks/jotai';
import { cx } from '@/lib/utils';
import { useAtom } from 'jotai';
import Link from 'next/link';
import React from 'react';
import {
  ILogo,
  IExit,
  IDashboard,
  IBudget,
  ITransaction,
  IMoneyCollect,
  ILink,
} from './icons';
import { usePathname } from 'next/navigation';

export const Sidebar: React.FC = () => {
  const path = usePathname();

  return (
    <div
      className="hidden h-[calc(100vh-48px)] w-full max-w-[250px] border-r border-r-slate-200 
    bg-white pl-4 md:block md:max-w-[250px]"
    >
      <div className="ml-3 mt-3 flex items-center justify-between md:hidden">
        <div className="flex items-center gap-2 text-lg font-bold text-primary-400">
          <ILogo /> finence
        </div>
        <span className="p-2">
          <IExit className="fill-[#b91c1c]" />
        </span>
      </div>
      <ul className="nav-list mt-3 flex flex-col gap-2">
        <li>
          <Link
            href={'/dashboard'}
            className={cx(
              path === '/dashboard' && 'active',
              'flex w-full cursor-pointer items-center gap-3 p-2 px-4 hover:bg-slate-100',
            )}
          >
            <IDashboard />
            Tổng quan
          </Link>
        </li>
        <li>
          <Link
            href={'/budget'}
            className={cx(
              path === '/budget' && 'active',
              'flex w-full cursor-pointer items-center gap-3 p-2 px-4 hover:bg-slate-100',
            )}
          >
            <IBudget />
            Ngân sách
          </Link>
        </li>
        <li>
          <Link href={'/transaction'}>
            <div
              className={cx(
                path === '/transaction' && 'active',
                'flex w-full cursor-pointer items-center gap-3 p-2 px-4 hover:bg-slate-100',
              )}
            >
              <ITransaction />
              Giao dịch
            </div>
          </Link>
        </li>
        <li>
          <Link href={'/projects'}>
            <div
              className={cx(
                path === '/projects' && 'active',
                'flex w-full cursor-pointer items-center gap-3 p-2 px-4 hover:bg-slate-100',
              )}
            >
              <IMoneyCollect />
              Kế hoạch tài chính
            </div>
          </Link>
        </li>
        <li>
          <Link href={'/resource'}>
            <div
              className={cx(
                path === '/resource' && 'active',
                'flex w-full cursor-pointer items-center gap-3 p-2 px-4 hover:bg-slate-100',
              )}
            >
              <ILink />
              Liên kết
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};
