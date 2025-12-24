import { Request, Response } from 'express'

const globalErrorHandler = (err, req: Request, res: Response) => {
  if (err instanceof Error) {
    res.status(400).json({ error: err })
  } else {
    res.status(500).json({ error: 'Something went wrong' })
  }
}

export default globalErrorHandler
