import { ErrorRequestHandler } from 'express'
import { IGenericErrorMessage } from '../interfaces/error'
import config from '../../config'
import handleValidationError from '../../errors/handleValidationError'
import ApiError from '../../errors/ApiErrors'
import { ZodError } from 'zod'
import handleZodError from '../../errors/handleZodError'
// import { errorlogger } from '../../shared/logger'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  //   wihtout handling validation error using mongoose
  //   res.status(500).json({
  //     mongooseError: err,
  //   })

  // config?.env == 'development' ? console.log('🚀 GlobalErrorHandler ', err) :
  //     errorlogger.error(err)

  let statusCode = 500
  let message = 'Something went wrong'
  let errorMessages: IGenericErrorMessage[] = []

  if (err?.name === 'ValidationError') {
    const simplifiedErrors = handleValidationError(err)
    statusCode = simplifiedErrors.statusCode
    message = simplifiedErrors.message
    errorMessages = simplifiedErrors.errorMessages
  } else if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (err instanceof ApiError) {
    statusCode = err.statusCode
    message = err.message
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  } else if (err instanceof Error) {
    message = err.message
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env == 'development' ? err?.stack : undefined,
  })
  next()
}

export default globalErrorHandler
