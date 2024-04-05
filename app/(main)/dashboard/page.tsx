import { customFetch } from '@/lib/api';
import { api } from '@/lib/custom-api';

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  interface MyVariables {
    productId: string;
  }

  return (
    <div className="grid grow gap-2 px-2">
      <div className="flex w-full justify-between rounded-md border border-gray-500 px-3 py-5 pb-8 shadow-md">
        <div className="flex flex-col gap-2">
          balance <span className="font-semibold">1k do</span>
        </div>{' '}
        logo
      </div>
      <div className="flex w-full justify-between rounded-md border border-gray-500 px-3 py-5 pb-8 shadow-md">
        <div className="flex flex-col gap-2">
          expensive <span className="font-semibold">1k do</span>
        </div>{' '}
        logo
      </div>
      <div className="flex w-full justify-between rounded-md border border-gray-500 px-3 py-5 pb-8 shadow-md">
        <div className="flex flex-col gap-2">
          save <span className="font-semibold">1k do</span>
        </div>{' '}
        logo
      </div>
    </div>
  );
}
