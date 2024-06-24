import { TAGS } from '@/lib/constants';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<NextResponse> {
  return revalidate(req);
}

async function revalidate(req: NextRequest): Promise<NextResponse> {
  revalidateTag(TAGS.all);

  return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
}
