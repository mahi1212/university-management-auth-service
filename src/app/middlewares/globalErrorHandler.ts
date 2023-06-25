import { ErrorRequestHandler } from 'express'
import { IGenericErrorMessage } from '../interfaces/error'
import config from '../../config'
import handleValidationError from '../../errors/handleValidationError'
import ApiError from '../../errors/ApiErrors'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  //   res.status(500).json({
  //     mongooseError: err,
  //   })

  let statusCode = 500
  let message = 'Somethin   g went wrong'
  let errorMessages: IGenericErrorMessage[] = []

  if (err?.name === 'ValidationError') {
    const simplifiedErrors = handleValidationError(err)
    statusCode = simplifiedErrors.statusCode
    message = simplifiedErrors.message
    errorMessages = simplifiedErrors.errorMessages
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
