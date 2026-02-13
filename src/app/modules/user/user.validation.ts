import z from 'zod'
import { bloodGroup, gender } from './user.constant'

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string('First Name is required'),
        middleName: z.string('Middle Name is required').optional(),
        lastName: z.string('Last Name is required'),
      }),
      dateOfBirth: z.string('Date of birth is required'),
      gender: z.enum([...gender] as [string, ...string[]], {
        error: 'Gender is required',
      }),
      bloodGroup: z
        .enum([...bloodGroup] as [string, ...string[]], {
          error: 'Blood group is required',
        })
        .optional(),
      email: z.email('Email is required'),
      contactNo: z.string('Contact number is required'),
      emergencyContactNo: z.string('Emergency contact number is required'),
      presentAddress: z.string('Present address is required'),
      permanentAddress: z.string('Permanent address is required'),
      academicSemester: z.string('Academic semester is required'),
      academicDepartment: z.string('Academic department is required'),
      academicFaculty: z.string('Academic faculty is required'),
      guardian: z.object({
        fatherName: z.string('Father name is required'),
        fatherOccupation: z.string('Father occupation is required'),
        fatherContactNo: z.string('Father contact number is required'),
        motherName: z.string('Mother name is required'),
        motherOccupation: z.string('Mother occupation is required'),
        address: z.string('Guardian address is required'),
      }),
      localGuardian: z.object({
        name: z.string('Local guardian name is required'),
        occupation: z.string('Local guardian occupation is required'),
        contactNo: z.string('Local guardian contact number is required'),
        address: z.string('Local guardian address is required'),
      }),
    }),
    profileImage: z.string().optional(),
  }),
})

const createFacultyZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    faculty: z.object({
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
  }),
})

const createAdminZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    admin: z.object({
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
      managementDepartment: z.string('Management department is required'),
      designation: z.string('Designation is required'),
      profileImage: z.string().optional(),
    }),
  }),
})

export const UserValidation = {
  createUserZodSchema,
  createFacultyZodSchema,
  createAdminZodSchema,
}
