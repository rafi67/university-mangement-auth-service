import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicSemesterValidation } from './academicSemester.validation'
import { AcademicSemesterController } from './academicSemester.controller'
import { AcademicFacultyValidation } from '../academicFaculty/academicFaculty.validation'

const router = express.Router()

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createAcademicSemester,
)

router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  AcademicSemesterController.createAcademicFaculty,
)

router.get('/getAllSemesters', AcademicSemesterController.getAllSemesters)

router.get('/:id', AcademicSemesterController.getSingleSemester)

router.patch(
  '/:id',
  validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateSemester,
)

router.delete('/:id', AcademicSemesterController.deleteSemester)

export const AcademicSemesterRoutes = router
