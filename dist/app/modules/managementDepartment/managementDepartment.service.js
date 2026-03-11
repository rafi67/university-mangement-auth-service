'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.ManagementDepartmentService = void 0
const mongoose_1 = __importDefault(require('mongoose'))
const managementDepartment_model_1 = require('./managementDepartment.model')
const ApiError_1 = __importDefault(require('../../../errors/ApiError'))
const http_status_1 = __importDefault(require('http-status'))
const managementDepartment_constant_1 = require('./managementDepartment.constant')
const paginationHelper_1 = require('../../../helpers/paginationHelper')
const createManagementDepartment = async data => {
  let newManagementDepartmentAllData = null
  const session = await mongoose_1.default.startSession()
  try {
    await session.startTransaction()
    const newManagementDepartment =
      await managementDepartment_model_1.ManagementDepartment.create([data], {
        session,
      })
    if (!newManagementDepartment.length) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
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
const getAllManagementDepartment = async (filters, paginationOptions) => {
  const { searchTerm, ...filtersData } = filters
  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: managementDepartment_constant_1.managementDepartmentSearchableFields.map(
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
  const result = await managementDepartment_model_1.ManagementDepartment.find(
    whereConditions,
  )
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
  const total =
    await managementDepartment_model_1.ManagementDepartment.countDocuments()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}
const getSingleManagementDepartment = async id => {
  const result =
    await managementDepartment_model_1.ManagementDepartment.findOne({ _id: id })
  return result
}
const updateManagementDepartment = async (id, payload) => {
  const result =
    await managementDepartment_model_1.ManagementDepartment.findOneAndUpdate(
      { _id: id },
      payload,
      { new: true },
    )
  return result
}
exports.ManagementDepartmentService = {
  createManagementDepartment,
  getAllManagementDepartment,
  getSingleManagementDepartment,
  updateManagementDepartment,
}
