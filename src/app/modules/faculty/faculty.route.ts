import express from 'express'
const router = express.Router()

router.get('/:id')
router.get('/')
router.patch('/:id')

export const FacultyRoutes = router
