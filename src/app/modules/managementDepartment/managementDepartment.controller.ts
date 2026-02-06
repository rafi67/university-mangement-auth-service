import { RequestHandler, Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { ManagementDepartmentService } from './managementDepartment.service'

const createManagementDepartment: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body

    const result =
      await ManagementDepartmentService.createManagementDepartment(data)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management department created successfully',
      data: result,
    })
  },
)

export const ManagementDepartmentController = {
  createManagementDepartment,
}
