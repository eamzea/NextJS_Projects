import type { NextApiRequest, NextApiResponse } from 'next'
import db from '@/database'
import { seed } from '@/database/seed'
import EntryModel from '@/database/models/Entry'

type Data = {
  message: string
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {

  if (process.env.NODE_ENV === 'production') {
    res.status(401).json({ message: 'Unauthorized' })
  }

  await db.connect()
  await EntryModel.deleteMany()
  await EntryModel.insertMany(seed.entries)

  await db.disconnect()

  res.status(200).json({ message: 'Process successfully' })
}

export default handler
