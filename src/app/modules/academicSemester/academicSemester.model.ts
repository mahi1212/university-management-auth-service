import { Schema, model } from 'mongoose'
import {
    IAcademicSemester,
    AcademicSemesterModel,
} from './academicSemester.interface'

const Month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Auguest',
    'September',
    'October',
    'November',
    'December',
]

const academicSemesterSchema = new Schema<IAcademicSemester>(
    {
        title: {
            type: String,
            required: true,
            enum: ['Spring', 'Summer', 'Fall'],
        },
        year: {
            type: Number,
            required: true,
        },
        code: {
            type: String,
            required: true,
            enum: ['01', '02', '03'],
        },
        startMonth: {
            type: String,
            required: true,
            enum: Month,
        },
        endMonth: {
            type: String,
            required: true,
            enum: Month,
        },
    },
    {
        timestamps: true,
    }
)

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
    'AcademicSemester',
    academicSemesterSchema
)
