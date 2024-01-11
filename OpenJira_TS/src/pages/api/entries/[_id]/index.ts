import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import { putEntry, getEntry, deleteEntry } from '@/utils/methods';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { _id } = req.query;

  if (!mongoose.isValidObjectId(_id)) {
    return res.status(400).json({ message: 'ID invalid' });
  }

  switch (req.method) {
    case 'GET':
      return getEntry(req, res);
    case 'PUT':
      return putEntry(req, res);
    case 'DELETE':
      return deleteEntry(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
