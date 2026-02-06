import mongoose from 'mongoose'
import { IManagementDepartment } from './managementDepartment.interface'
import { ManagementDepartment } from './managementDepartment.model'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'

const createManagementDepartment = async (
  data: IManagementDepartment,
): Promise<IManagementDepartment | null> => {
  let newManagementDepartmentAllData = null
  const session = await mongoose.startSession()
  try {
    await session.startTransaction()
    const newManagementDepartment = await ManagementDepartment.create([data], {
      session,
    })
    if (!newManagementDepartment.length) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Failed to create management Department',
      )
    }

    newManagementDepartmentAllData = newManagementDepartment[0]

    await session.commitTransaction()
    await session.endSession()
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw err
  }

  return newManagementDepartmentAllData
}

export const ManagementDepartmentService = {
  createManagementDepartment,
}
