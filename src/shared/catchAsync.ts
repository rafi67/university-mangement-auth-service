import { Request, Response, NextFunction } from 'express'

const catchAsync = fn => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      fn(req, res)
    } catch (err) {
      next(err)
    }
  }
}

export default catchAsync
