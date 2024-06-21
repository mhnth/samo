'use client';

import { FinancialProject } from '@prisma/client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { deleteProject, updateProject } from '@/lib/actions';
import { useRouter } from 'next/navigation';

interface EditBudgetProps {
  project: FinancialProject;
}

interface ProjectState {
  name: string;
  targetAmount: number;
  description?: string;
}

const initialState = {
  message: '',
  isOk: false,
};

export const EditProject: React.FC<EditBudgetProps> = ({ project }) => {
  const [formState, formAction] = useFormState(updateProject, initialState);
  const router = useRouter();
  const [state, setState] = useState<ProjectState>({
    name: project.name,
    description: project.description || '',
    targetAmount: project.targetAmount,
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    if (formState.isOk === true) {
      router.push('/projects');
    }
  }, [formState]);

  return (
    <div className="mx-auto mt-6 w-5/6 max-w-xl rounded-md bg-white p-6 shadow-md md:mt-24">
      <span className="mb-6 text-xl">Chỉnh sửa dự án</span>
      <form
        action={async (f) => {
          f.append('projectId', project.id);
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
            placeholder="Chi tiêu hàng tháng"
            value={state.name}
            onChange={handleChange}
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
            placeholder="100 000 000"
            value={state.targetAmount}
            onChange={handleChange}
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
            value={state.description}
            onChange={handleChange}
            id="description"
          />
        </div>

        <div className="mt-8 flex items-center justify-end gap-4">
          <button
            className="mr-auto rounded-md bg-red-200 px-6 py-1 font-semibold text-red-500 
            hover:bg-red-400 hover:text-white"
            onClick={async (e) => {
              e.preventDefault();
              await deleteProject(project.id);
              router.push('/projects');
            }}
          >
            Xoá
          </button>
          <Link className="font-semibold text-slate-500" href={'/projects'}>
            Hủy
          </Link>
          <button
            type="submit"
            className="rounded-md bg-primary-500 px-3 py-1 text-slate-50 hover:bg-primary-300"
          >
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
};
