import z from 'zod'

const createAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string('Title is required'),
    academicFaculty: z.string('Academic Faculty is required'),
  }),
})

const updateAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string('Title is required').optional(),
    academicFaculty: z.string('Academic Faculty is required').optional(),
  }),
})

export const AcademicDepartmentValidation = {
  createAcademicDepartmentZodSchema,
  updateAcademicDepartmentZodSchema,
}
