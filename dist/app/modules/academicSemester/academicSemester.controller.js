'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.AcademicSemesterController = void 0
const academicSemester_service_1 = require('./academicSemester.service')
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'))
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'))
const http_status_1 = __importDefault(require('http-status'))
const pick_1 = __importDefault(require('../../../shared/pick'))
const pagination_1 = require('../../../constants/pagination')
const academicSemester_constant_1 = require('./academicSemester.constant')
const createAcademicSemester = (0, catchAsync_1.default)(async (req, res) => {
  const { ...academicSemesterData } = req.body
  const result =
    await academicSemester_service_1.AcademicSemesterService.createSemester(
      academicSemesterData,
    )
  ;(0, sendResponse_1.default)(res, {
    statusCode: http_status_1.default.OK,
    success: true,
    message: 'Academic Semester created successfully',
    data: result,
  })
})
const getAllSemesters = (0, catchAsync_1.default)(async (req, res) => {
  const filters = (0, pick_1.default)(
    req.query,
    academicSemester_constant_1.academicSemesterFilterableFields,
  )
  const paginationOptions = (0, pick_1.default)(
    req.query,
    pagination_1.paginationFields,
  )
  const result =
    await academicSemester_service_1.AcademicSemesterService.getAllSemesters(
      filters,
      paginationOptions,
    )
  ;(0, sendResponse_1.default)(res, {
    statusCode: http_status_1.default.OK,
    success: true,
    message: 'Semesters retrieved successfully!',
    meta: result.meta,
    data: result.data,
  })
})
const getSingleSemester = (0, catchAsync_1.default)(async (req, res) => {
  const id = req.params.id
  const result =
    await academicSemester_service_1.AcademicSemesterService.getSingleSemester(
      id,
    )
  ;(0, sendResponse_1.default)(res, {
    statusCode: http_status_1.default.OK,
    success: true,
    message: 'Semesters retrieved successfully!',
    data: result,
  })
})
const updateSemester = (0, catchAsync_1.default)(async (req, res) => {
  const id = req.params.id
  const updatedData = req.body
  const result =
    await academicSemester_service_1.AcademicSemesterService.updateSemester(
      id,
      updatedData,
    )
  ;(0, sendResponse_1.default)(res, {
    statusCode: http_status_1.default.OK,
    success: true,
    message: 'Semesters updated successfully!',
    data: result,
  })
})
const deleteSemester = (0, catchAsync_1.default)(async (req, res) => {
  const id = req.params.id
  const result =
    await academicSemester_service_1.AcademicSemesterService.deleteSemester(id)
  ;(0, sendResponse_1.default)(res, {
    statusCode: http_status_1.default.OK,
    success: true,
    message: 'Semesters deleted successfully!',
    data: result,
  })
})
exports.AcademicSemesterController = {
  createAcademicSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
}
