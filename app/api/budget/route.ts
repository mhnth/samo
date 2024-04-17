import prisma from '@/lib/prismadb';
import { getServerSession } from 'next-auth';

export async function GET(req: Request) {
  // const res = await req.json();
  // console.log('url', req.url, 'req body', res);

  const userSession = await getServerSession();

  const budget = await prisma.user.findUnique({
    where: {
      email: 'a@gmail.com',
    },
    select: {
      budget: true,
    },
  });
  console.log('budget', budget);

  return Response.json(budget, { status: 201 });
}
