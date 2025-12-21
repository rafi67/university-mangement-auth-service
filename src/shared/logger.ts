import winston from 'winston'

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    //
    // - Write all logs with importance level of `error` or higher to `error.log`
    //   (i.e., error, fatal, but not other levels)
    //
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'info' }),
    //
    // - Write all logs with importance level of `info` or higher to `combined.log`
    //   (i.e., fatal, error, warn, and info, but not trace)
    //
    new winston.transports.File({ filename: 'combined.log', level: 'error' }),
  ],
})

export default logger
