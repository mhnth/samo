import { AddLinkForm } from './add-link-form';
import { getResources } from '@/lib/queries';
import Link from 'next/link';

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const resources = await getResources();

  return (
    <div className="w-full">
      <div className="mx-auto mt-6 max-w-lg bg-white p-4 px-6 shadow-md">
        <div className="mb-2 text-xl">Thêm link mới</div>
        <AddLinkForm />
      </div>
      <div className="resource-grid mx-auto mt-4 grid max-w-4xl items-center justify-center gap-2">
        {resources &&
          resources.map((r, i) => {
            return (
              <Link
                href={r.link}
                key={i}
                target="_blank"
                className="max-w-[250px] rounded-sm bg-white p-4 shadow-sm"
              >
                <img
                  className=""
                  src={r.image || ''}
                  alt="this link have no image"
                />
                <div className="font-semibold">{r.title}</div>
                <p className="text-sm">{r.description}</p>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
