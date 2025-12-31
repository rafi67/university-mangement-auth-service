import z from 'zod'
import { Months } from './academicSemester.interface'

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum(['Autumn', 'Summer', 'Fall'], {
      error: () => 'Title is required',
    }),
    year: z.number('Year is required'),
    code: z.enum(['01', '02', '03']),
    startMonth: z.enum([...Months], {
      error: () => 'Start Month is required',
    }),
    endMonth: z.enum([...Months], {
      error: () => 'End Month is required',
    }),
  }),
})

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
}
