import { model, Schema } from 'mongoose'
import {
  IAcademicDepartment,
  AcademicDepartmentModel,
} from './academicDepartment.interface'
// import httpStatus from 'http-status'
// import ApiError from '../../../errors/ApiError'

const academicDepartmentSchema = new Schema<IAcademicDepartment>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

// academicDepartmentSchema.pre('save', async function () {
//   const isExists = await AcademicDepartment.findOne({
//     title: this.title,
//     academicFaculty: this.academicFaculty,
//   })

//   if (isExists) {
//     throw new ApiError(
//       httpStatus.CONFLICT,
//       'Academic Department already exists',
//     )
//   }
// })

export const AcademicDepartment = model<
  IAcademicDepartment,
  AcademicDepartmentModel
>('AcademicDepartment', academicDepartmentSchema)
