import z from 'zod'

const createAcademicFacultyZodSchema = z.object({
  body: z.object({
    title: z.string('Title is required'),
  }),
})

const updateAcademicFacultyZodSchema = z.object({
  body: z.object({
    title: z.string('Title is required'),
  }),
})

export const AcademicFacultyValidation = {
  createAcademicFacultyZodSchema,
  updateAcademicFacultyZodSchema,
}
