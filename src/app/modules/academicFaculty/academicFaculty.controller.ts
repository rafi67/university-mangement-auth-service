import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { AcademicFacultyService } from './academicFaculty.service'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicFacultyData } = req.body
    const result =
      await AcademicFacultyService.createFaculty(academicFacultyData)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty created successfully',
      data: result,
    })
  },
)

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields)
  const result = await AcademicFacultyService.getAllFaculty(paginationOptions)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty retrieved Successfully',
    meta: result.meta,
    data: result.data,
  })
})

export const AcademicFacultyController = {
  createAcademicFaculty,
  getAllFaculties,
}
