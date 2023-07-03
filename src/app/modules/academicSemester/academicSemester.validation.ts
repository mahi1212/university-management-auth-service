import { AcademicSemester } from './academicSemester.model';
import { z } from 'zod'

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum(['Spring', 'Summer', 'Fall'],{
        required_error: 'title is required'
    }),
    year: z.number({
        required_error: 'year is required'
    }),
    code: z.enum(['01', '02', '03'],{
        required_error: 'code is required'
    }),
    startMonth: z.enum(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Auguest', 'September', 'October', 'November', 'December'],{
        required_error: 'startMonth is required'
    }),
    endMonth: z.enum(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Auguest', 'September', 'October', 'November', 'December'],{
        required_error: 'endMonth is required'
    })
  }),
})

export const AcademicSemesterValidation = {
    createAcademicSemesterZodSchema,
}
