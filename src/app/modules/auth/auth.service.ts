import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import { User } from '../user/user.model'
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface'
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

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret,
    )
    // eslint-disable-next-line no-console
    console.log(verifiedToken)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token')
  }

  const { userId } = verifiedToken

  const isUserExists = await User.isUserExists(userId)

  if (!isUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exists')
  }

  // generate new token
  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExists.id,
      role: isUserExists.role,
    },
    config.jwt.secret as Secret,
    {
      expiresIn: config.jwt.expires_in,
    },
  )

  return {
    accessToken: newAccessToken,
  }
}

export const AuthService = {
  loginUser,
  refreshToken,
}
