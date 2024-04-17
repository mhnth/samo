import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const data = req.body;
  console.log('dat', data);

  // const id = await createItem(data);
  res.status(200).json({});
}
