export async function POST(req: Request) {
  const res = await req.json();
  console.log('url', req.url, 'req body', res);

  return Response.json({ error: 'dhfkk' }, { status: 201 });
}
