import express from 'express'
import { userRoutes } from '../modules/user/user.route'
import { AcademicSemesterRoute } from '../modules/academicSemester/academicSemester.route'
const router = express.Router()

// router.use('/users/', userRoutes)
// router.use('/academic-semesters/', AcademicSemesterRoute)

// lets optimize this code
const moduleRoutes = [
    {
        path: '/users',
        route: userRoutes
    },
    {
        path: '/academic-semesters',
        route: AcademicSemesterRoute
    }
]
moduleRoutes.forEach(route => {
    router.use(route.path, route.route)
})

export default router;
