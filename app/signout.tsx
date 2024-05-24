'use client';

import { signOut } from 'next-auth/react';
import React from 'react';

export const SignOut = ({}) => {
  return (
    <span className="cursor-pointer" onClick={() => signOut()}>
      Sign Out
    </span>
  );
};
