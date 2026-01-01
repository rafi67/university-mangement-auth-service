import z from 'zod'
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from './academicSemester.constant'

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum(academicSemesterTitles, {
      error: () => 'Title is required',
    }),
    year: z.number('Year is required'),
    code: z.enum(academicSemesterCodes),
    startMonth: z.enum(academicSemesterMonths as [string, ...string[]], {
      error: () => 'Start Month is required',
    }),
    endMonth: z.enum(academicSemesterMonths, {
      error: () => 'End Month is required',
    }),
  }),
})

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
}
