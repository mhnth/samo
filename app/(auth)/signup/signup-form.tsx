'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { Spinner } from '@/components/ui';
import { signIn } from 'next-auth/react';

export const SignupForm: React.FC = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isPending, startTransition] = useTransition();
  const [err, setErr] = useState<string | null>();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (err) setErr('');
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to sign up');
      }

      const res = await response.json();

      await signIn('credentials', {
        email: userData.email,
        password: userData.password,
        redirect: true,
        callbackUrl: '/',
      });
    } catch (err) {
      console.log('ERROR Sign Up:', err);
      setErr(err as string);
    }
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleSignUp();
  };

  return (
    <div className="mx-auto my-auto w-full max-w-sm rounded-md bg-white p-6 shadow-md">
      <form
        method="post"
        className="a-form"
        onSubmit={(e) => startTransition(() => onSubmit(e))}
      >
        <div className="a-form_input">
          <label htmlFor="name" className="a-form_lbl">
            Name*
          </label>
          <input
            id="name"
            className="a-m_input"
            type="text"
            name="name"
            placeholder="Username"
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="a-form_input">
          <label htmlFor="email" className="a-form_lbl">
            E-mail*
          </label>
          <input
            id="email"
            className="a-m_input"
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="a-form_input">
          <label htmlFor="password" className="a-form_lbl">
            Password*
          </label>
          <input
            id="password"
            className="a-m_input"
            type="password"
            name="password"
            placeholder="**********"
            onChange={(e) => onInputChange(e)}
          />
        </div>

        {err && <div className="a-form_err">{err}</div>}

        <button type="submit" className="a-form_btn">
          {isPending ? <Spinner /> : 'Sign Up'}
        </button>
      </form>

      <div className="a-form_more">
        <Link href={'/signin'}>or Sign In</Link>
      </div>
    </div>
  );
};
