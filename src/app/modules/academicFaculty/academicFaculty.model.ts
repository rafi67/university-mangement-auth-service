import { model, Schema } from 'mongoose'
import {
  AcademicFacultyModel,
  IAcademicFaculty,
} from './academicFaculty.interface'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'

const academicFacultySchema = new Schema<IAcademicFaculty>({
  title: {
    type: String,
    required: true,
  },
})

academicFacultySchema.pre('save', async function () {
  const isExists = await AcademicFaculty.findOne({
    title: this.title,
  })
  if (isExists) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Academic faculty is already exists!',
    )
  }
})

export const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModel>(
  'AcademicFaculty',
  academicFacultySchema,
)
