import mongoose from 'mongoose'
import app from './app'
import config from './config/index'

async function main() {
  await mongoose.connect(config.database_url as string)
  console.log(`Database is connected successfully`)
  app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`)
  })
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

main()
