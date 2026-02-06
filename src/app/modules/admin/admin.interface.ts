import { Model } from 'mongoose'

type UserName = {
  firstName: string
  middleName?: string
  lastName: string
}

export type IAdmin = {
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
  managementDepartment: string
  designation: string
  profileImage?: string
}

export type AdminFilters = {
  searchTerm?: string
  id?: string
  name?: string
  email?: string
  contactNo?: string
  emergencyContactNo?: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  managementDepartment?: string
  designation?: string
}

export type AdminModel = Model<IAdmin, Record<string, unknown>>
