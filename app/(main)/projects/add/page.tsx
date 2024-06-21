'use client';

import { useFormState } from 'react-dom';
import { createProject } from '@/lib/actions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const initialState = {
  message: '',
  isOk: false,
};

export default function AddProjectPage() {
  const [state, formAction] = useFormState(createProject, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.message !== '') {
      router.push('/projects');
    }
  });

  return (
    <div className="mx-auto mt-6 max-w-lg px-4">
      <span className="text-xl">Tạo kế hoạch tài chính</span>
      <form
        action={(f) => {
          formAction(f);
        }}
      >
        <div className="mt-3 flex flex-col gap-1">
          <label
            htmlFor="name"
            className="text-sm font-semibold text-slate-700"
          >
            Tên
          </label>
          <input
            className="input"
            id="name"
            name="name"
            type="text"
            placeholder="Kì nghỉ"
            required
          />
        </div>
        <div className="mt-2">
          <label
            className="text-sm font-semibold text-slate-700"
            htmlFor="targetAmount"
          >
            Mục tiêu (vnđ)
          </label>
          <input
            className="input"
            id="targetAmount"
            name="targetAmount"
            type="number"
            placeholder="20 000"
            required
          />
        </div>
        <div className="mt-2">
          <label
            className="text-sm font-semibold text-slate-700"
            htmlFor="description"
          >
            Ghi chú
          </label>
          <textarea
            name="description"
            className="input block h-44 w-full"
            id="description"
          />
        </div>
        <div className="mt-8 flex items-center justify-end gap-4">
          <Link className="font-semibold text-slate-500" href={'/projects'}>
            Hủy
          </Link>
          <button
            type="submit"
            className="rounded-md bg-primary-700 px-3 py-1 text-slate-50 hover:bg-primary-500"
          >
            Tạo mới
          </button>
        </div>
      </form>
    </div>
  );
}
