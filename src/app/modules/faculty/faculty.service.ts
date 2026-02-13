import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { facultySearchableFields } from './faculty.constant'
import { IFaculty, IFacultyFilters } from './faculty.interface'
import { Faculty } from './faculty.model'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'

const getAllFaculty = async (
  filters: IFacultyFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters
  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: facultySearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const { skip, limit, page, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const sortConditions: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await Faculty.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate('academicDepartment')
    .populate('academicFaculty')

  const total = await Faculty.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findById(id)
  return result
}

const updateFaculty = async (
  id: string,
  payload: Partial<IFaculty>,
): Promise<IFaculty | null> => {
  const isExists = await Faculty.findOne({ id })
  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found!')
  }

  const { name, ...studentData } = payload

  const updatedFacultyData: Partial<IFaculty> = { ...studentData }

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`
      updatedFacultyData[nameKey] = name[key as keyof typeof name]
    })
  }

  const result = await Faculty.findOneAndUpdate({ id }, updatedFacultyData, {
    new: true,
  })

  return result
}

export const FacultyService = {
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
}
