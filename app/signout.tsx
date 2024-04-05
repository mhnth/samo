'use client';

import { signOut } from 'next-auth/react';
import React from 'react';

interface SignoutProps {}

export const SignOut: React.FC<SignoutProps> = ({}) => {
  return (
    <span className="cursor-pointer" onClick={() => signOut()}>
      Sign Out
    </span>
  );
};
