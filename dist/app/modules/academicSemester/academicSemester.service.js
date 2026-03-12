'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.AcademicSemesterService = void 0
const ApiError_1 = __importDefault(require('../../../errors/ApiError'))
const paginationHelper_1 = require('../../../helpers/paginationHelper')
const academicSemester_constant_1 = require('./academicSemester.constant')
const academicSemester_model_1 = require('./academicSemester.model')
const http_status_1 = __importDefault(require('http-status'))
const createSemester = async payload => {
  if (
    academicSemester_constant_1.academicSemesterTitleCodeMapper[
      payload.title
    ] !== payload.code
  ) {
    throw new ApiError_1.default(
      http_status_1.default.BAD_REQUEST,
      'Invalid Semester Code!',
    )
  }
  const result = await academicSemester_model_1.AcademicSemester.create(payload)
  return result
}
const getAllSemesters = async (filters, paginationOptions) => {
  const { searchTerm, ...filtersData } = filters
  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: academicSemester_constant_1.academicSemesterSearchableFields.map(
        field => ({
          [field]: {
            $regex: searchTerm,
            $options: 'i',
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
  const { skip, limit, page, sortBy, sortOrder } =
    paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions)
  const sortConditions = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}
  const result = await academicSemester_model_1.AcademicSemester.find(
    whereConditions,
  )
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
  const total = await academicSemester_model_1.AcademicSemester.countDocuments()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}
const getSingleSemester = async id => {
  const result = await academicSemester_model_1.AcademicSemester.findById(id)
  return result
}
const updateSemester = async (id, payload) => {
  if (
    payload.title &&
    payload.code &&
    academicSemester_constant_1.academicSemesterTitleCodeMapper[
      payload.title
    ] !== payload.code
  ) {
    throw new ApiError_1.default(
      http_status_1.default.BAD_REQUEST,
      'Invalid Semester Code!',
    )
  }
  const result =
    await academicSemester_model_1.AcademicSemester.findOneAndUpdate(
      { _id: id },
      payload,
      {
        new: true,
      },
    )
  return result
}
const deleteSemester = async id => {
  const result =
    await academicSemester_model_1.AcademicSemester.findByIdAndDelete(id)
  return result
}
exports.AcademicSemesterService = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
}
