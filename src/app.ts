import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import routes from './app/routes/index.routes'
import httpStatus from 'http-status'
import cookieParser from 'cookie-parser'

const app: Application = express()

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Application  route
app.use('/api/v1/', routes)

// testing
// app.get('/', async () => {
//   throw new Error('Testing Error logger')
// })

// global error handler
app.use(globalErrorHandler)

// handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  })
  next()
})

export default app
