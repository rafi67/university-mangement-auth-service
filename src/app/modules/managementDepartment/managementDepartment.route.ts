import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { ManagementDepartmentValidation } from './managementDepartment.validation'
import { ManagementDepartmentController } from './managementDepartment.controller'

const router = express.Router()

router.post(
  '/create-management',
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema,
  ),
  ManagementDepartmentController.createManagementDepartment,
)

router.get('/:id', ManagementDepartmentController.getSingleManagementDepartment)

router.get('/', ManagementDepartmentController.getAllManagementDepartment)

export const ManagementDepartmentRoutes = router
