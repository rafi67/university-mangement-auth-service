import { Request, Response } from 'express'
import sendResponse from '../../../shared/sendResponse'
import catchAsync from '../../../shared/catchAsync'
import httpStatus from 'http-status'
import { AcademicDepartmentService } from './academicDepartment.service'
import { academicDepartmentFilterableFields } from './academicDepartment.constant'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { IAcademicDepartment } from './academicDepartment.interface'

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicDepartmentData } = req.body
    const result = await AcademicDepartmentService.createDepartment(
      academicDepartmentData,
    )

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department created successfully',
      data: result,
    })
  },
)

const getAllDepartment = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicDepartmentFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await AcademicDepartmentService.getAllDepartment(
    filters,
    paginationOptions,
  )

  sendResponse<IAcademicDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic departments fetched successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params._id
    const result = await AcademicDepartmentService.getSingleDepartment(id)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department retrieved successfully',
      data: result,
    })
  },
)

const updateAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const updatedData = req.body
    const result = await AcademicDepartmentService.updateDepartment(
      id,
      updatedData,
    )
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department updated successfully',
      data: result,
    })
  },
)

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await AcademicDepartmentService.deleteDepartment(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department deleted successfully',
    data: result,
  })
})

export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAllDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
  deleteDepartment,
}
