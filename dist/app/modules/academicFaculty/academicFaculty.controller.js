'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.AcademicFacultyController = void 0
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'))
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'))
const http_status_1 = __importDefault(require('http-status'))
const academicFaculty_service_1 = require('./academicFaculty.service')
const pick_1 = __importDefault(require('../../../shared/pick'))
const pagination_1 = require('../../../constants/pagination')
const createAcademicFaculty = (0, catchAsync_1.default)(async (req, res) => {
  const { ...academicFacultyData } = req.body
  const result =
    await academicFaculty_service_1.AcademicFacultyService.createFaculty(
      academicFacultyData,
    )
  ;(0, sendResponse_1.default)(res, {
    statusCode: http_status_1.default.OK,
    success: true,
    message: 'Academic Faculty created successfully',
    data: result,
  })
})
const getAllFaculties = (0, catchAsync_1.default)(async (req, res) => {
  const paginationOptions = (0, pick_1.default)(
    req.query,
    pagination_1.paginationFields,
  )
  const result =
    await academicFaculty_service_1.AcademicFacultyService.getAllFaculty(
      paginationOptions,
    )
  ;(0, sendResponse_1.default)(res, {
    statusCode: http_status_1.default.OK,
    success: true,
    message: 'Academic Faculty retrieved Successfully',
    meta: result.meta,
    data: result.data,
  })
})
const updateFaculty = (0, catchAsync_1.default)(async (req, res) => {
  const id = req.params.id
  const updatedData = req.body
  const result =
    await academicFaculty_service_1.AcademicFacultyService.updateFaculty(
      id,
      updatedData,
    )
  ;(0, sendResponse_1.default)(res, {
    statusCode: http_status_1.default.OK,
    success: true,
    message: 'Academic Faculty updated Successfully',
    data: result,
  })
})
const deleteFaculty = (0, catchAsync_1.default)(async (req, res) => {
  const id = req.params.id
  const result =
    await academicFaculty_service_1.AcademicFacultyService.deleteFaculty(id)
  ;(0, sendResponse_1.default)(res, {
    statusCode: http_status_1.default.OK,
    success: true,
    message: 'Academic Faculty deleted Successfully',
    data: result,
  })
})
exports.AcademicFacultyController = {
  createAcademicFaculty,
  getAllFaculties,
  updateFaculty,
  deleteFaculty,
}
