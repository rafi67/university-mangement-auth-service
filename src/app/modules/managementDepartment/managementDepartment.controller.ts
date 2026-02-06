import { RequestHandler, Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { ManagementDepartmentService } from './managementDepartment.service'
import pick from '../../../shared/pick'
import { managementDepartmentFilterableFields } from './managementDepartment.constant'
import { paginationFields } from '../../../constants/pagination'
import { IManagementDepartment } from './managementDepartment.interface'

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

const getAllManagementDepartment: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, managementDepartmentFilterableFields)
    const paginationOptions = pick(req.query, paginationFields)

    const result = await ManagementDepartmentService.getAllManagementDepartment(
      filters,
      paginationOptions,
    )

    sendResponse<IManagementDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management department retrieved successfully',
      meta: result.meta,
      data: result.data,
    })
  },
)

const getSingleManagementDepartment: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id

    const result =
      await ManagementDepartmentService.getSingleManagementDepartment(id)

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management department retrieved successfully',
      data: result,
    })
  },
)

export const ManagementDepartmentController = {
  createManagementDepartment,
  getAllManagementDepartment,
  getSingleManagementDepartment,
}
