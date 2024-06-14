'use client';

import React, { useState, useTransition } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Spinner } from '@/components/ui';

export const SignInForm: React.FC = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [isPending, startTransition] = useTransition();
  const [err, setErr] = useState<string | null>();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (err) setErr('');
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      signIn('credentials', {
        email: userData.email,
        password: userData.password,
        redirect: true,
        callbackUrl: '/',
      });
    } catch (e) {
      console.log('Error while logging in:', e);
    }
  };

  return (
    <div className="mx-auto my-auto w-full max-w-sm rounded-md bg-white p-6 shadow-md">
      <form
        action=""
        method="post"
        className="a-form"
        onSubmit={(e) => startTransition(() => onSubmit(e))}
      >
        <div className="a-form_input">
          <label htmlFor="email" className="a-form_lbl">
            E-mail*
          </label>
          <input
            className="a-m_input"
            type="email"
            name="email"
            placeholder="Example@gmail.com"
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="a-form_input">
          <label htmlFor="password" className="a-form_lbl">
            Password*
          </label>
          <input
            className="a-m_input"
            type="password"
            name="password"
            placeholder="*********"
            onChange={(e) => onInputChange(e)}
          />
        </div>

        {err && <div className="a-form_err">{err}</div>}

        <button type="submit" className="a-form_btn">
          {isPending ? <Spinner /> : 'Sign In'}
        </button>
      </form>
      <div className="a-form_more">
        <Link href={'/signup'}>or Sign Up</Link>
      </div>
    </div>
  );
};
