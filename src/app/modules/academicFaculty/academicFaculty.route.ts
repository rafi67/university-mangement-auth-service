import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicFacultyController } from './academicFaculty.controller'
import { AcademicFacultyValidation } from './academicFaculty.validation'

const router = express.Router()

router.get('/getAllFaculty', AcademicFacultyController.getAllFaculties)

router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  AcademicFacultyController.createAcademicFaculty,
)

export const AcademicFacultyRoutes = router
