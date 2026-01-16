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
    year: z.string('Year is required'),
    code: z.enum(academicSemesterCodes),
    startMonth: z.enum(academicSemesterMonths as [string, ...string[]], {
      error: () => 'Start Month is required',
    }),
    endMonth: z.enum(academicSemesterMonths, {
      error: () => 'End Month is required',
    }),
  }),
})

const updateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum(academicSemesterTitles, {
          error: () => 'Title is required',
        })
        .optional(),
      year: z.string('Year is required').optional(),
      code: z.enum(academicSemesterCodes).optional(),
      startMonth: z
        .enum(academicSemesterMonths as [string, ...string[]], {
          error: () => 'Start Month is required',
        })
        .optional(),
      endMonth: z
        .enum(academicSemesterMonths, {
          error: () => 'End Month is required',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Either both title and should be provided or neither',
    },
  )

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
}
