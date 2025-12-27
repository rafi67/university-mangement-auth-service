import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { logger, errorLogger } from './shared/logger'
import { Server } from 'http'

async function main() {
  let server: Server
  try {
    await mongoose.connect(config.database_url as string)
    logger.info(`Database is connected successfully`)
    server = app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`)
    })
  } catch (err) {
    errorLogger.error(`failed to connect database ${err.message}`)
  }

  process.on('unhandledRejection', error => {
    // eslint-disable-next-line no-console
    console.log(
      'Unhandled Rejection is detected, we are closing our server.....',
    )
    if (server) {
      server.close(() => {
        errorLogger.error('Failed to connect database', error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

main()
