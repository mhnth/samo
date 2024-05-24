import prisma from '@/lib/prismadb';
import bcrypt from 'bcrypt';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, password } = body;

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const user = await prisma.user.create({
      data: {
        name: name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (err) {
    console.log(err);
  }
  return NextResponse.error();
}
