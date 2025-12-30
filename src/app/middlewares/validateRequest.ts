import { UserService } from '../modules/user/user.service'
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
      return next()
    } catch (err) {
      next(err)
    }
    const result = await UserService.createUser(res.body)
    res.send(result)
  }

export default validateRequest
