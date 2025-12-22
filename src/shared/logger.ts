import path from 'path'
import winston from 'winston'

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: path.join(process.cwd(), 'log', 'winston', 'success.log'),
      level: 'info',
    }),
    new winston.transports.Console(),
  ],
})

const errorLogger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: path.join(process.cwd(), 'log', 'winston', 'error.log'),
      level: 'error',
    }),
    new winston.transports.Console(),
  ],
})

export { logger, errorLogger }
