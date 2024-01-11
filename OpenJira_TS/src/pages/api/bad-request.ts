import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string | string[];
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { message = 'Bad request' } = req.query;

  res.status(200).json({ message });
};

export default handler;
