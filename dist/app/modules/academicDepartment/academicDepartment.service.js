'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.AcademicDepartmentService = void 0
const paginationHelper_1 = require('../../../helpers/paginationHelper')
const academicDepartment_constant_1 = require('./academicDepartment.constant')
const academicDepartment_model_1 = require('./academicDepartment.model')
const createDepartment = async payload => {
  const result = (
    await academicDepartment_model_1.AcademicDepartment.create(payload)
  ).populate('academicFaculty')
  return result
}
const getAllDepartment = async (filters, paginationOptions) => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions)
  const { searchTerm, ...filtersData } = filters
  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: academicDepartment_constant_1.academicDepartmentSearchableFields.map(
        field => ({
          [field]: {
            $regex: searchTerm,
            $paginationOptions: 'i',
          },
        }),
      ),
    })
  }
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }
  const sortConditions = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}
  const result = await academicDepartment_model_1.AcademicDepartment.find(
    whereConditions,
  )
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
  const total =
    await academicDepartment_model_1.AcademicDepartment.countDocuments()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}
const getSingleDepartment = async id => {
  const result =
    await academicDepartment_model_1.AcademicDepartment.findById(id).populate(
      'academicFaculty',
    )
  return result
}
const updateDepartment = async (id, payload) => {
  const result =
    await academicDepartment_model_1.AcademicDepartment.findOneAndUpdate(
      { _id: id },
      payload,
      { new: true },
    ).populate('academicFaculty')
  return result
}
const deleteDepartment = async id => {
  const result =
    await academicDepartment_model_1.AcademicDepartment.findByIdAndDelete(id)
  return result
}
exports.AcademicDepartmentService = {
  createDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
}
