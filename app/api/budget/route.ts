import { getUser } from '@/lib/getUser';
import prisma from '@/lib/prismadb';

export async function GET(req: Request) {
  const user = await getUser();

  if (!user) {
    return Response.json({ error: 'Not found User!' }, { status: 404 });
  }

  const budget = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
    select: {
      budget: true,
    },
  });

  return Response.json(budget, { status: 201 });
}
