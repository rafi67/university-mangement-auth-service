import z from 'zod'
import { bloodGroup, gender } from './faculty.constant'

const createFacultyZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string('First name is required'),
      middleName: z.string().optional(),
      lastName: z.string('Last name is required'),
    }),
    dateOfBirth: z.string('Date of birth is required'),
    email: z.email('Email is required'),
    contactNo: z.string('Contact number is required'),
    emergencyContactNo: z.string('Emergency contact number is required'),
    gender: z.enum([...gender] as [string, ...string[]], {
      error: 'Gender is required',
    }),
    permanentAddress: z.string('Permanent address is required'),
    presentAddress: z.string('Present address is required'),
    bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
    designation: z.string('Designation is required'),
    academicDepartment: z.string('Academic department is required'),
    academicFaculty: z.string('Academic Faculty is required'),
    profileImage: z.string().optional(),
  }),
})

export const FacultyValidation = {
  createFacultyZodSchema,
}
