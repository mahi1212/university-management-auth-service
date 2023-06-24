import { createLogger, format, transports } from 'winston'
// const { combine, timestamp, label, prettyPrint } = format;
import path from 'path'
import DailyRotateFile from 'winston-daily-rotate-file'

// custom log format
const myFormat = format.printf(({ level, message, label }) => {
  const date = new Date()
  const hour = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  return `Date: ${date
    .toDateString()
    .split(
      ' '
    )} | Time:${hour}:${minutes}:${seconds} | label: ${label} | level ${level}: ${message}`
})

const logger = createLogger({
  level: 'info',
  format: myFormat,
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'successes',
        'UMS-%DATE%-success.log'
      ),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})

const errorlogger = createLogger({
  level: 'error',
  format: myFormat,
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'errors',
        'UMS-%DATE%-error.log'
      ),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})

export { logger, errorlogger }
