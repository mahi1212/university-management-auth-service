import { NextFunction, Request, RequestHandler, Response } from 'express'
import { UserService } from './user.service'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
// import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import catchAsync from '../../../shared/catchAsync'
// import { z } from 'zod'

const createUserController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    const result = await UserService.createUser(user);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user created successfully!',
      data: result,
    });
    next();
  }
)

export const UserController = {
  createUserController,
}
