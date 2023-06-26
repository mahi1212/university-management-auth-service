import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { logger, errorlogger } from './shared/logger'
import { Server } from 'http'

process.on('uncaughtException', err => {
  errorlogger.error(err)
  process.exit(1)
})

let server: Server

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Connected to database')

    server = app.listen(config.port, () => {
      logger.info(`Application is listening on port ${config.port}`)
    })
  } catch (err) {
    errorlogger.error('failed to connect to database', err)
  }

  process.on('unhandledRejection', error => {
    // console.log('unhenadled rejection, we are shutting down')
    if (server) {
      server.close(() => {
        errorlogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

main()

process.on('SIGTERM', () => {
  logger.info('SIGTERM RECEIVED, shutting down gracefully')
  if (server) {
    server.close()
  }
})
