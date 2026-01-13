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

router.patch(
  '/update-faculty/:id',
  validateRequest(AcademicFacultyValidation.updateAcademicFacultyZodSchema),
  AcademicFacultyController.updateFaculty,
)

router.delete('/delete-faculty/:id', AcademicFacultyController.deleteFaculty)

export const AcademicFacultyRoutes = router
