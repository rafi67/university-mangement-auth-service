import { Request, Response, RequestHandler } from 'express'
import { UserService } from './user.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'

const createStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { student, ...userData } = req.body
    const result = await UserService.createStudent(student, userData)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created successfully',
      data: result,
    })
  },
)

const createFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { faculty, ...userData } = req.body

    const result = await UserService.createFaculty(faculty, userData)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty created successfully',
      data: result,
    })
  },
)

const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { admin, ...userData } = req.body

    const result = await UserService.createAdmin(admin, userData)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin is created Successfully',
      data: result,
    })
  },
)

export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
}
