'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Avatar() {
  const session = useSession();

  return (
    <Link href={'/profile'} className="mr-2 flex items-center gap-1">
      <span className="font-semibold text-gray-600">
        {session.data?.user?.name}
      </span>
      <img
        src={session.data?.user?.image || ''}
        alt="avatar"
        className="h-8 w-8 rounded-full object-cover"
      />
    </Link>
  );
}
