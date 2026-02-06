import z from 'zod'

const createManagementDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string('Title is required'),
  }),
})

const updateManagementDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string('Title is required'),
  }),
})

export const ManagementDepartmentValidation = {
  createManagementDepartmentZodSchema,
  updateManagementDepartmentZodSchema,
}
