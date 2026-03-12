'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.AcademicDepartmentController = void 0
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'))
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'))
const http_status_1 = __importDefault(require('http-status'))
const academicDepartment_service_1 = require('./academicDepartment.service')
const academicDepartment_constant_1 = require('./academicDepartment.constant')
const pick_1 = __importDefault(require('../../../shared/pick'))
const pagination_1 = require('../../../constants/pagination')
const createAcademicDepartment = (0, catchAsync_1.default)(async (req, res) => {
  const { ...academicDepartmentData } = req.body
  const result =
    await academicDepartment_service_1.AcademicDepartmentService.createDepartment(
      academicDepartmentData,
    )
  ;(0, sendResponse_1.default)(res, {
    statusCode: http_status_1.default.OK,
    success: true,
    message: 'Academic Department created successfully',
    data: result,
  })
})
const getAllDepartment = (0, catchAsync_1.default)(async (req, res) => {
  const filters = (0, pick_1.default)(
    req.query,
    academicDepartment_constant_1.academicDepartmentFilterableFields,
  )
  const paginationOptions = (0, pick_1.default)(
    req.query,
    pagination_1.paginationFields,
  )
  const result =
    await academicDepartment_service_1.AcademicDepartmentService.getAllDepartment(
      filters,
      paginationOptions,
    )
  ;(0, sendResponse_1.default)(res, {
    statusCode: http_status_1.default.OK,
    success: true,
    message: 'Academic departments fetched successfully',
    meta: result.meta,
    data: result.data,
  })
})
const getSingleAcademicDepartment = (0, catchAsync_1.default)(
  async (req, res) => {
    const id = req.params.id
    const result =
      await academicDepartment_service_1.AcademicDepartmentService.getSingleDepartment(
        id,
      )
    ;(0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Academic Department retrieved successfully',
      data: result,
    })
  },
)
const updateAcademicDepartment = (0, catchAsync_1.default)(async (req, res) => {
  const id = req.params.id
  const updatedData = req.body
  const result =
    await academicDepartment_service_1.AcademicDepartmentService.updateDepartment(
      id,
      updatedData,
    )
  ;(0, sendResponse_1.default)(res, {
    statusCode: http_status_1.default.OK,
    success: true,
    message: 'Academic Department updated successfully',
    data: result,
  })
})
const deleteDepartment = (0, catchAsync_1.default)(async (req, res) => {
  const id = req.params.id
  const result =
    await academicDepartment_service_1.AcademicDepartmentService.deleteDepartment(
      id,
    )
  ;(0, sendResponse_1.default)(res, {
    statusCode: http_status_1.default.OK,
    success: true,
    message: 'Academic Department deleted successfully',
    data: result,
  })
})
exports.AcademicDepartmentController = {
  createAcademicDepartment,
  getAllDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
  deleteDepartment,
}
