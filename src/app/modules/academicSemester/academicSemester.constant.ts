import {
  IAcademicSemesterCodes,
  IAcademicSemesterMonths,
  IAcademicSemesterTitles,
} from './academicSemester.interface'

export const academicSemesterTitles: IAcademicSemesterTitles[] = [
  'Autumn',
  'Summer',
  'Fall',
  'Winter',
]

export const academicSemesterCodes: IAcademicSemesterCodes[] = [
  '01',
  '02',
  '03',
  '04',
]

export const academicSemesterMonths: IAcademicSemesterMonths[] = [
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

export const academicSemesterTitleCodeMapper: {
  [key: string]: string
} = {
  Autumn: '01',
  Summer: '02',
  Winter: '03',
  Fall: '04',
}
