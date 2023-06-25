import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { logger, errorlogger } from './shared/logger'
import { Server } from 'http'

async function main() {
  let server: Server

  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Connected to database')

    server = app.listen(config.port, () => {
      logger.info(`Application is listening on port ${config.port}`)
    })
  } catch (error) {
    errorlogger.error('failed to connect to database', error)
  }

  process.on('unhandledRejection', error => {
    console.log('unhenadled rejection, we are shutting down')
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
