import { ProcessRange } from '@/components/ui/process-range';
import { getProjects } from '@/lib/queries';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';

export default async function BudgetPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const projects = await getProjects();

  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="align-center flex justify-between p-4">
        <h4 className="text-xl">Kế hoạch</h4>
        <Link
          className="rounded-md bg-primary-500 p-1 px-2 text-white hover:bg-primary-400"
          href={'/projects/add'}
        >
          +Tạo mới
        </Link>
      </div>
      <div className="mt-4 grid-cols-2 gap-2 md:grid">
        {projects &&
          projects.map((p, i) => {
            return (
              <Link
                href={`/projects/${p.id}/edit`}
                className="mt-3 block rounded-md border border-gray-300 bg-white 
                shadow-md hover:border-primary-500"
                key={i}
              >
                <div className="border-b-[0.5px] border-gray-200 p-4 py-2">
                  <span className="block font-semibold text-gray-700">
                    {p.name}
                  </span>
                </div>
                <div className="mt-2 flex flex-col justify-between gap-1 p-4 text-gray-500">
                  <div className="flex justify-between">
                    <label className="text-sm font-semibold" htmlFor="">
                      Mục tiêu
                    </label>
                    <span className="text-gray-900">
                      {formatCurrency(p.targetAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <label className="text-sm font-semibold" htmlFor="">
                      Tiến độ:
                    </label>
                    <span className="text-gray-900">
                      {formatCurrency(p.fund)}
                    </span>
                  </div>
                </div>
                <ProcessRange
                  current={p.fund}
                  total={p.targetAmount}
                  type="red"
                />
              </Link>
            );
          })}
      </div>
    </div>
  );
}
