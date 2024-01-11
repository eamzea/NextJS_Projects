import { NextApiRequest, NextApiResponse } from "next"
import { postEntry, getEntries } from "@/utils/methods";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return getEntries(res);
    case 'POST':
      return postEntry(req.body ,res);
    default:
      return res.status(405).json({message: 'Method not allowed'})
  }
}


export default handler
