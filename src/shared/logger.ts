import path from 'path'
import { createLogger, format, transports } from 'winston'

const { combine, timestamp, label, printf, prettyPrint } = format

// custom log format
const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp as Date)
  const hour = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  return `${date.toString()} ${hour}:${minutes}:${seconds} [${label}] ${level}: ${message}`
})

const logger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'logger!' }),
    timestamp(),
    myFormat,
    prettyPrint(),
  ),
  transports: [
    new transports.File({
      filename: path.join(process.cwd(), 'log', 'winston', 'success.log'),
      level: 'info',
    }),
    new transports.Console(),
  ],
})

const errorLogger = createLogger({
  level: 'error',
  format: combine(
    label({ label: 'logger!' }),
    timestamp(),
    myFormat,
    prettyPrint(),
  ),
  transports: [
    new transports.File({
      filename: path.join(process.cwd(), 'log', 'winston', 'error.log'),
      level: 'error',
    }),
    new transports.Console(),
  ],
})

export { logger, errorLogger }
