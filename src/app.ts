import express, { Application } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { UserRoutes } from './app/modules/users/user.route'
import ApiError from './errors/ApiError'

const app: Application = express()

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application  route
app.use('/api/v1/users/', UserRoutes)

// testing
app.get('/', async () => {
  throw new ApiError(400, 'internal error')
  //   next('internal server error')
})

// global error handler
app.use(globalErrorHandler)

export default app
