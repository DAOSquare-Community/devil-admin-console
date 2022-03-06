import { NextApiRequest, NextApiResponse } from 'next'
// Catch Eg: https://next-api-decorators.vercel.app/docs/exceptions .
export function exceptionHandler(
  error: unknown,
  req: NextApiRequest,
  res: NextApiResponse
) {
  const message =
    error instanceof Error ? error.message : 'An unknown error occurred.'
  res.status(200).json({ success: false, error: message })
}
