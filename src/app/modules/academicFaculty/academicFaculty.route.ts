import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicFacultyController } from './academicFaculty.controller'
import { AcademicFacultyValidation } from './academicFaculty.validation'
import { ENUM_USER_ROLE } from '../../../enums/user'
import auth from '../../middlewares/auth'

const router = express.Router()

router.get(
  '/getAllFaculty',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.STUDENT,
  ),
  AcademicFacultyController.getAllFaculties,
)

router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicFacultyController.createAcademicFaculty,
)

router.patch(
  '/update-faculty/:id',
  validateRequest(AcademicFacultyValidation.updateAcademicFacultyZodSchema),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
  ),
  AcademicFacultyController.updateFaculty,
)

router.delete(
  '/delete-faculty/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  AcademicFacultyController.deleteFaculty,
)

export const AcademicFacultyRoutes = router
