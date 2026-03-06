'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.FacultyController = void 0
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'))
const faculty_constant_1 = require('./faculty.constant')
const pagination_1 = require('../../../constants/pagination')
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'))
const http_status_1 = __importDefault(require('http-status'))
const pick_1 = __importDefault(require('../../../shared/pick'))
const faculty_service_1 = require('./faculty.service')
const getAllFaculty = (0, catchAsync_1.default)(async (req, res) => {
  const filters = (0, pick_1.default)(
    req.query,
    faculty_constant_1.facultyFilterableFields,
  )
  const paginationOptions = (0, pick_1.default)(
    req.query,
    pagination_1.paginationFields,
  )
  const result = await faculty_service_1.FacultyService.getAllFaculty(
    filters,
    paginationOptions,
  )
  ;(0, sendResponse_1.default)(res, {
    statusCode: http_status_1.default.OK,
    success: true,
    message: 'Faculty retrieved successfully',
    meta: result.meta,
    data: result.data,
  })
})
const getSingleFaculty = (0, catchAsync_1.default)(async (req, res) => {
  const id = req.params.id
  const result = await faculty_service_1.FacultyService.getSingleFaculty(id)
  ;(0, sendResponse_1.default)(res, {
    statusCode: http_status_1.default.OK,
    success: true,
    message: 'Faculty retrieved successfully',
    data: result,
  })
})
const updateFaculty = (0, catchAsync_1.default)(async (req, res) => {
  const id = req.params.id
  const updatedData = req.body
  const result = await faculty_service_1.FacultyService.updateFaculty(
    id,
    updatedData,
  )
  ;(0, sendResponse_1.default)(res, {
    statusCode: http_status_1.default.OK,
    success: true,
    message: 'Faculty updated successfully',
    data: result,
  })
})
exports.FacultyController = {
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
}
