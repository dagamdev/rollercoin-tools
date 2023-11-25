import { type NextApiRequest, type NextApiResponse } from 'next'

export default async function Ping (req: NextApiRequest, res: NextApiResponse) {
  res.json({ message: 'pong' })
}
