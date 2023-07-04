// const express = require('express')
import express, { Application } from 'express'
import cors from 'cors'
import { userRoutes } from './app/modules/user/user.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { AcademicSemesterRoute } from './app/modules/academicSemester/academicSemester.route'
import routes from './app/routes'

const app: Application = express()

app.use(cors())
// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/*
    TIPS:
    1. way -> interface -> model -> validation -> controller -> service -> route -> app
    2. Apply business logic in service
*/

// application routes
app.use('/api/v1/', routes)

// global error handler
app.use(globalErrorHandler)
export default app
