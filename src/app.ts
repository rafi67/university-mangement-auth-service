import express, { Application } from 'express'
import cors from 'cors'
import router from './app/modules/users/users.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'

const app: Application = express()

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application  route
app.use('/api/v1/users/', router)

// testing
// app.get('/', async (req: Request, res: Response) => {
//   await usersService.createUser({
//     id: '999',
//     password: '1234',
//     role: 'student',
//   })
//   res.send('Hello World!')
//   throw new ApiError(400, 'internal error')
//   next('internal server error')
// })

// global error handler
app.use(globalErrorHandler)

export default app
