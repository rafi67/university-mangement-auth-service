import { ZodObject } from 'zod'
import { Request, Response, NextFunction } from 'express'

const validateRequest =
  (schema: ZodObject) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      })
      next()
    } catch (err) {
      next(err)
    }
  }

export default validateRequest
