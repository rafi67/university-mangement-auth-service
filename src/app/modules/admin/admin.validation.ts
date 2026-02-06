import z from 'zod'
import { bloodGroup, gender } from './admin.constant'

const updateAdminZodSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().optional(),
        middleName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    dateOfBirth: z.string().optional(),
    email: z.email().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    gender: z
      .enum([...gender] as [string, ...string[]], {
        error: 'Gender is required',
      })
      .optional(),
    permanentAddress: z.string().optional(),
    presentAddress: z.string().optional(),
    bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
    managementDepartment: z.string().optional(),
    designation: z.string().optional(),
    profileImage: z.string().optional(),
  }),
})

export const AdminValidation = {
  updateAdminZodSchema,
}
