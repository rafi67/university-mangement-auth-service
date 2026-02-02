import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { FacultyValidation } from './faculty.validation'

const router = express.Router()

router.post(
  '/create-faculty',
  validateRequest(FacultyValidation.createFacultyZodSchema),
)
router.get('/:id')
router.get('/')
router.patch('/:id')

export const FacultyRoutes = router
