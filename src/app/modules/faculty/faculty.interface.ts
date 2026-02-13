import { Model, Types } from 'mongoose'
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interface'
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface'

type UserName = {
  firstName: string
  middleName?: string
  lastName: string
}

export type IFaculty = {
  id: string
  name: UserName
  dateOfBirth: string
  email: string
  contactNo: string
  emergencyContactNo: string
  gender: 'male' | 'female'
  permanentAddress: string
  presentAddress: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  designation: string
  academicDepartment: Types.ObjectId | IAcademicDepartment
  academicFaculty: Types.ObjectId | IAcademicFaculty
  profileImage?: string
}

export type IFacultyFilters = {
  searchTerm?: string
  id?: string
  bloodGroup?: string
  email?: string
  contactNo?: string
  emergencyContactNo?: string
  designation?: string
  academicDepartment?: string
  academicFaculty?: string
}

export type FacultyModel = Model<IFaculty, Record<string, unknown>>
