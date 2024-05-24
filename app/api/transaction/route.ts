import { getUser } from '@/lib/getUser';
import prisma from '@/lib/prismadb';

export async function GET(req: Request) {
  const user = await getUser();

  if (!user) {
    return Response.json({ error: 'Not found User!' }, { status: 404 });
  }

  const data = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
    select: {
      category: true,
    },
  });

  return Response.json(data?.category, { status: 201 });
}
