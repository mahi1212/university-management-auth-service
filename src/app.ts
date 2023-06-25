// const express = require('express')
import express, { Application } from 'express'
import cors from 'cors'
import { userRoutes } from './app/modules/users/user.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'

const app: Application = express()

app.use(cors())
// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// application routes
app.use('/api/v1/users/', userRoutes)

// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   next('ore bap error')
// });

// global error handler
app.use(globalErrorHandler)

export default app
