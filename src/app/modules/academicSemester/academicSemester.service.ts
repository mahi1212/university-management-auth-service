import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiErrors'
import { AcademicSemesterTitleCodeMapper } from './academicSemester.constant'
import { IAcademicSemester } from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'

const createSemester = async (
    payload: IAcademicSemester
): Promise<IAcademicSemester> => {
    if (AcademicSemesterTitleCodeMapper[payload.title] !== payload.code) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code')
    }
    const result = await AcademicSemester.create(payload)
    return result
}


export const AcademicSemesterService = {
    createSemester,
}
