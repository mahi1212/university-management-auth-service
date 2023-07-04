import {
  IAcademicSemesterMonths,
  IAcademicSemesterTitles,
  IAcademicSemesterCodes,
} from './academicSemester.interface'

export const AcademicSemesterMonths: IAcademicSemesterMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const AcademicSemesterTitles: IAcademicSemesterTitles[] = [
  'Spring',
  'Summer',
  'Fall',
]

export const AcademicSemesterCodes: IAcademicSemesterCodes[] = [
  '01',
  '02',
  '03',
]

export const AcademicSemesterTitleCodeMapper: {
  [key: string]: string
} = {
  Spring: '01',
  Summer: '02',
  Fall: '03'
}
