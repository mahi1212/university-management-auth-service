// const express = require('express')
import express, { Application } from 'express'
import cors from 'cors'
import { userRoutes } from './app/modules/user/user.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { AcademicSemesterRoute } from './app/modules/academicSemester/academicSemester.route'

const app: Application = express()

app.use(cors())
// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// application routes
app.use('/api/v1/users/', userRoutes)
app.use('/api/v1/academic-semesters/', AcademicSemesterRoute)
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//     //   throw new ApiError(400, 'Bad Request')
//     throw new Error('Something went wrong')
// });

// global error handler
app.use(globalErrorHandler)

export default app
