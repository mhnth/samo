import { NextResponse } from 'next/server';

interface CC extends Response {}

class Res extends Response {}

export async function POST(req: Request) {
  const res = {
    error: {
      message: 'this is a err',
    },
  };
  return new Res(JSON.stringify(res), {
    status: 404,
  });
  return NextResponse.json('server pong');
}
