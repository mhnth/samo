'use client';

import { modalAtom } from '@/hooks/jotai';
import { useAtom } from 'jotai';

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [_, setModalView] = useAtom(modalAtom);
  return (
    <div className="mt-4">
      <button
        onClick={() => setModalView({ view: 'transaction' })}
        className="rounded-md bg-primary-800 p-1 px-2 text-white hover:bg-primary-500"
      >
        +Thêm mới
      </button>
    </div>
  );
}
