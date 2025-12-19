import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import router from './app/modules/users/users.route'

const app: Application = express()

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application  route
app.use('/api/v1/users/', router)

// testing
app.get('/', async (req: Request, res: Response) => {
  // await usersService.createUser({
  //   id: '999',
  //   password: '1234',
  //   role: 'student',
  // })
  res.send('Hello World!')
})

export default app
