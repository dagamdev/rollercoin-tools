import { type NextApiRequest, type NextApiResponse } from 'next'

export default async function ping (req: NextApiRequest, res: NextApiResponse) {
  res.json({ message: 'pong' })
}
