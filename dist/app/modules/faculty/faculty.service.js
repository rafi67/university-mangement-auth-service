'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.FacultyService = void 0
const paginationHelper_1 = require('../../../helpers/paginationHelper')
const faculty_constant_1 = require('./faculty.constant')
const faculty_model_1 = require('./faculty.model')
const ApiError_1 = __importDefault(require('../../../errors/ApiError'))
const http_status_1 = __importDefault(require('http-status'))
const getAllFaculty = async (filters, paginationOptions) => {
  const { searchTerm, ...filtersData } = filters
  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: faculty_constant_1.facultySearchableFields.map(field => ({
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
    paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions)
  const sortConditions = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}
  const result = await faculty_model_1.Faculty.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate('academicDepartment')
    .populate('academicFaculty')
  const total = await faculty_model_1.Faculty.countDocuments()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}
const getSingleFaculty = async id => {
  const result = await faculty_model_1.Faculty.findById(id)
  return result
}
const updateFaculty = async (id, payload) => {
  const isExists = await faculty_model_1.Faculty.findOne({ id })
  if (!isExists) {
    throw new ApiError_1.default(
      http_status_1.default.NOT_FOUND,
      'Faculty not found!',
    )
  }
  const { name, ...studentData } = payload
  const updatedFacultyData = { ...studentData }
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`
      updatedFacultyData[nameKey] = name[key]
    })
  }
  const result = await faculty_model_1.Faculty.findOneAndUpdate(
    { id },
    updatedFacultyData,
    {
      new: true,
    },
  )
  return result
}
exports.FacultyService = {
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
}
