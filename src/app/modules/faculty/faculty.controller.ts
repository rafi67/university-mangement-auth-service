import catchAsync from '../../../shared/catchAsync'
import { RequestHandler, Request, Response } from 'express'
import { facultyFilterableFields } from './faculty.constant'
import { paginationFields } from '../../../constants/pagination'
import sendResponse from '../../../shared/sendResponse'
import { IFaculty } from './faculty.interface'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { FacultyService } from './faculty.service'

const getAllFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, facultyFilterableFields)
    const paginationOptions = pick(req.query, paginationFields)

    const result = await FacultyService.getAllFaculty(
      filters,
      paginationOptions,
    )

    sendResponse<IFaculty[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty retrieved successfully',
      meta: result.meta,
      data: result.data,
    })
  },
)

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await FacultyService.getSingleFaculty(id)

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty retrieved successfully',
    data: result,
  })
})

export const FacultyController = {
  getAllFaculty,
  getSingleFaculty,
}
