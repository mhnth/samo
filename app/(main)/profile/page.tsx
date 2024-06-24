'use client';

import ILogout from '@/components/icons/logout';
import ISave from '@/components/icons/save';
import { signOut } from 'next-auth/react';

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const handleLogout = async () => {
    await fetch('/api/revalidate', { method: 'POST' });
    signOut();
  };

  return (
    <div className="mx-auto mt-12 w-full max-w-lg rounded-md bg-white p-4 shadow-md">
      <div className="mx-auto w-max text-xl">Thông tin cá nhân</div>
      <form className="border-b border-gray-200 px-4">
        <label>
          Tên người dùng
          <input type="text" className="input py-1" />
        </label>
        <label>
          Mật khẩu mới
          <input type="text" className="input py-1" />
        </label>
        <label className="mt-2 block">
          Ảnh đại diện
          <input type="file" className="mt-1 block" />
        </label>
        <button
          type="submit"
          className="mx-auto mb-2 mt-4 flex items-center gap-1 rounded-md bg-blue-500 px-4 py-1 text-white"
        >
          <ISave />
          Xác nhận
        </button>
      </form>
      <button
        className="mx-auto mt-2 flex items-center gap-1 rounded-md border border-rose-300 bg-rose-100 
        px-4 py-1 text-rose-500 hover:bg-rose-200"
        onClick={handleLogout}
      >
        <ILogout />
        Logout
      </button>
    </div>
  );
}
