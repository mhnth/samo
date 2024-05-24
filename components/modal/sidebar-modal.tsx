'use client';

import Link from 'next/link';
import { useAtom } from 'jotai';
import { modalAtom } from '@/hooks/jotai';
import {
  IBudget,
  IDashboard,
  IExit,
  ILink,
  ILogo,
  IMoneyCollect,
  ITransaction,
} from '../icons';
import { cx } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Backdrop } from './backdrop';

export default function SidebarModal() {
  const [_, setModalView] = useAtom(modalAtom);
  const path = usePathname();

  const handleClickLink = (index: number) => {
    setModalView(null);
  };

  return (
    <Backdrop onOutSideClick={() => setModalView(null)}>
      <div className="h-screen w-full max-w-[250px] border-r border-r-slate-200 bg-white pl-4 md:max-w-[250px]">
        <div className="ml-3 mt-3 flex items-center justify-between md:hidden">
          <div className="flex items-center gap-2 text-lg font-bold text-primary-400">
            <ILogo /> finence
          </div>
          <span className="p-2">
            <IExit
              className="fill-[#b91c1c]"
              onClick={() => setModalView(null)}
            />
          </span>
        </div>
        <ul className="nav-list mt-6 flex flex-col gap-2">
          <li>
            <Link
              onClick={() => handleClickLink(0)}
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
              onClick={() => handleClickLink(1)}
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
                onClick={() => handleClickLink(2)}
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
            <Link href={'/transaction'}>
              <div
                onClick={() => handleClickLink(3)}
                className={cx(
                  path === '' && 'active',
                  'flex w-full cursor-pointer items-center gap-3 p-2 px-4 hover:bg-slate-100',
                )}
              >
                <IMoneyCollect />
                Kế hoạch tài chính
              </div>
            </Link>
          </li>
          <li>
            <Link href={'/transaction'}>
              <div
                onClick={() => handleClickLink(4)}
                className={cx(
                  path === '' && 'active',
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
    </Backdrop>
  );
}
