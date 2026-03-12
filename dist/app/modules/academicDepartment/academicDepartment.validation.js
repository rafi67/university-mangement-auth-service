'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.AcademicDepartmentValidation = void 0
const zod_1 = __importDefault(require('zod'))
const createAcademicDepartmentZodSchema = zod_1.default.object({
  body: zod_1.default.object({
    title: zod_1.default.string('Title is required'),
    academicFaculty: zod_1.default.string('Academic Faculty is required'),
  }),
})
const updateAcademicDepartmentZodSchema = zod_1.default.object({
  body: zod_1.default.object({
    title: zod_1.default.string('Title is required').optional(),
    academicFaculty: zod_1.default
      .string('Academic Faculty is required')
      .optional(),
  }),
})
exports.AcademicDepartmentValidation = {
  createAcademicDepartmentZodSchema,
  updateAcademicDepartmentZodSchema,
}
