'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.UserService = void 0
const mongoose_1 = __importDefault(require('mongoose'))
const index_1 = __importDefault(require('../../../config/index'))
const ApiError_1 = __importDefault(require('../../../errors/ApiError'))
const academicSemester_model_1 = require('../academicSemester/academicSemester.model')
const user_model_1 = require('./user.model')
const user_utils_1 = require('./user.utils')
const http_status_1 = __importDefault(require('http-status'))
const student_model_1 = require('../student/student.model')
const faculty_model_1 = require('../faculty/faculty.model')
const admin_model_1 = require('../admin/admin.model')
const createStudent = async (student, user) => {
  if (!user.password) {
    user.password = index_1.default.default_student_pass
  }
  user.role = 'student'
  const academicSemester =
    await academicSemester_model_1.AcademicSemester.findById(
      student.academicSemester,
    )
  let newUserAllData = null
  const session = await mongoose_1.default.startSession()
  try {
    session.startTransaction()
    const id = await (0, user_utils_1.generateStudentId)(academicSemester)
    user.id = id
    student.id = id
    const newStudent = await student_model_1.Student.create([student], {
      session,
    })
    if (!newStudent.length) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Failed to create student',
      )
    }
    user.student = newStudent[0]._id
    const newUser = await user_model_1.User.create([user])
    if (!newUser.length) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Failed to create user',
      )
    }
    newUserAllData = newUser[0]
    await session.commitTransaction()
    await session.endSession()
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw err
  }
  if (newUserAllData) {
    newUserAllData = await user_model_1.User.findOne({
      id: newUserAllData.id,
    }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    })
  }
  return newUserAllData
}
const createFaculty = async (faculty, user) => {
  if (!user.password) {
    user.password = index_1.default.default_faculty_pass
  }
  user.role = 'faculty'
  let newUserAllData = null
  const session = await mongoose_1.default.startSession()
  try {
    session.startTransaction()
    const id = await (0, user_utils_1.generateFacultyId)()
    user.id = id
    faculty.id = id
    const newFaculty = await faculty_model_1.Faculty.create([faculty], {
      session,
    })
    if (!newFaculty.length) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Failed to create faculty',
      )
    }
    user.faculty = newFaculty[0]._id
    const newUser = await user_model_1.User.create([user])
    if (!newUser.length) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Failed to create user',
      )
    }
    newUserAllData = newUser[0]
    await session.commitTransaction()
    await session.endSession()
  } catch (err) {
    session.abortTransaction()
    session.endSession()
    throw err
  }
  if (newUserAllData) {
    newUserAllData = await user_model_1.User.findOne({
      id: newUserAllData.id,
    }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    })
  }
  return newUserAllData
}
const createAdmin = async (admin, user) => {
  if (!user.password) {
    user.password = index_1.default.default_admin_pass
  }
  user.role = 'admin'
  let newUserAllData = null
  const session = await mongoose_1.default.startSession()
  try {
    session.startTransaction()
    const id = await (0, user_utils_1.generateAdminId)()
    user.id = id
    admin.id = id
    const newAdmin = await admin_model_1.Admin.create([admin], { session })
    if (!newAdmin.length) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Failed to create admin',
      )
    }
    user.admin = newAdmin[0]._id
    const newUser = await user_model_1.User.create([user])
    if (!newUser.length) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Failed to create user',
      )
    }
    newUserAllData = newUser[0]
    await session.commitTransaction()
    await session.endSession()
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw err
  }
  if (newUserAllData) {
    newUserAllData = await user_model_1.User.findOne({
      id: newUserAllData.id,
    }).populate({
      path: 'admin',
      populate: [
        {
          path: 'managementDepartment',
        },
      ],
    })
  }
  return newUserAllData
}
exports.UserService = {
  createStudent,
  createFaculty,
  createAdmin,
}
