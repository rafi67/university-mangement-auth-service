import express from 'express'
import { AcademicDepartmentController } from './academicDepartment.controller'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicDepartmentValidation } from './academicDepartment.validation'

const router = express.Router()

router.post(
  '/create-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentZodSchema,
  ),
  AcademicDepartmentController.createAcademicDepartment,
)

router.get('/getAllDepartment', AcademicDepartmentController.getAllDepartment)

router.get(
  '/getDepartment/:id',
  AcademicDepartmentController.getSingleAcademicDepartment,
)

router.patch(
  '/updateDepartment/:id',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentZodSchema,
  ),
  AcademicDepartmentController.updateAcademicDepartment,
)

router.delete(
  '/deleteDepartment/:id',
  AcademicDepartmentController.deleteDepartment,
)

export const AcademicDepartmentRoutes = router
