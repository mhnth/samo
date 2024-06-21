'use client';

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const handleLogin = async () => {
    console.log('run');

    const res = await fetch('http://localhost:8001/kienzler/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: 'kienzlerUser', password: 'kienzler' }),
    });

    const data = await res.json();

    console.log(data);
  };
  return (
    <form>
      <input type="text" placeholder="username" />
      <input type="text" placeholder="passowrd" />
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        oke
      </button>
    </form>
  );
}
