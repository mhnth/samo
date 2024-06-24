'use client';

import { createResource } from '@/lib/actions';
import React, { useState } from 'react';

export const AddLinkForm: React.FC = () => {
  const [link, setLink] = useState<string>('');

  return (
    <form
      action={() => createResource(link)}
      className="flex h-10 items-center gap-2"
    >
      <input
        type="text"
        className="input m-0 h-full px-2"
        placeholder="ex: www.finence.com"
        onChange={(e) => {
          setLink(() => e.target.value);
        }}
      />
      <button className="h-full rounded-md bg-blue-500 px-6 py-0 text-white hover:bg-blue-400">
        Tạo
      </button>
    </form>
  );
};
