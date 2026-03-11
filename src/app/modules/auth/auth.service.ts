import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import { User } from '../user/user.model'
import { ILoginUser, ILoginUserResponse } from './auth.interface'
import httpStatus from 'http-status'
import { Secret } from 'jsonwebtoken'

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload

  const isUserExists = await User.isUserExists(id)

  const { id: userId, role, needsPasswordChange } = isUserExists

  if (!isUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exists")
  }

  if (
    isUserExists.password &&
    !(await User.isPasswordMatched(password, isUserExists?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect')
  }

  // create access token
  const accessToken = jwtHelpers.createToken(
    {
      id: userId,
      role: role,
    },
    config.jwt.secret as Secret,
    {
      expiresIn: config.jwt.expires_in as string,
    },
  )

  const refreshToken = jwtHelpers.createToken(
    {
      id: userId,
      role: role,
    },
    config.jwt.refresh_secret as Secret,
    {
      expiresIn: config.jwt.refresh_expires_in,
    },
  )

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  }
}

export const AuthService = {
  loginUser,
}
