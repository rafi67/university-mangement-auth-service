'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.generateAdminId =
  exports.generateFacultyId =
  exports.findLastAdminId =
  exports.findLastFacultyId =
  exports.generateStudentId =
  exports.findLastStudentId =
    void 0
const user_model_1 = require('./user.model')
const findLastStudentId = async () => {
  const lastStudent = await user_model_1.User.findOne(
    {
      role: 'student',
    },
    { id: 1, _id: 0 },
  )
    .sort({
      createdAt: -1,
    })
    .lean()
  return lastStudent?.id ? lastStudent.id.substring(4) : undefined
}
exports.findLastStudentId = findLastStudentId
const generateStudentId = async academicSemester => {
  const currentId =
    (await (0, exports.findLastStudentId)()) || (0).toString().padStart(5, '0')
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  incrementedId = `${academicSemester.year.substring(2)}${academicSemester.code}${incrementedId}`
  return incrementedId
}
exports.generateStudentId = generateStudentId
const findLastFacultyId = async () => {
  const lastFaculty = await user_model_1.User.findOne(
    {
      role: 'faculty',
    },
    { id: 1, _id: 0 },
  )
    .sort({
      createdAt: -1,
    })
    .lean()
  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined
}
exports.findLastFacultyId = findLastFacultyId
const findLastAdminId = async () => {
  const lastFaculty = await user_model_1.User.findOne(
    {
      role: 'admin',
    },
    { id: 1, _id: 0 },
  )
    .sort({
      createdAt: -1,
    })
    .lean()
  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined
}
exports.findLastAdminId = findLastAdminId
const generateFacultyId = async () => {
  const currentId =
    (await (0, exports.findLastFacultyId)()) || (0).toString().padStart(5, '0')
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  incrementedId = `F-${incrementedId}`
  return incrementedId
}
exports.generateFacultyId = generateFacultyId
const generateAdminId = async () => {
  const currentId =
    (await (0, exports.findLastAdminId)()) || (0).toString().padStart(5, '0')
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  incrementedId = `A-${incrementedId}`
  return incrementedId
}
exports.generateAdminId = generateAdminId
