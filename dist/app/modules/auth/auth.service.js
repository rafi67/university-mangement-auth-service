'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.AuthService = void 0
const config_1 = __importDefault(require('../../../config'))
const ApiError_1 = __importDefault(require('../../../errors/ApiError'))
const jwtHelpers_1 = require('../../../helpers/jwtHelpers')
const user_model_1 = require('../user/user.model')
const http_status_1 = __importDefault(require('http-status'))
const loginUser = async payload => {
  const { id, password } = payload
  const isUserExists = await user_model_1.User.isUserExists(id)
  const { id: userId, role, needsPasswordChange } = isUserExists
  if (!isUserExists) {
    throw new ApiError_1.default(
      http_status_1.default.NOT_FOUND,
      "User doesn't exists",
    )
  }
  if (
    isUserExists.password &&
    !(await user_model_1.User.isPasswordMatched(
      password,
      isUserExists?.password,
    ))
  ) {
    throw new ApiError_1.default(
      http_status_1.default.UNAUTHORIZED,
      'Password is incorrect',
    )
  }
  // create access token
  const accessToken = jwtHelpers_1.jwtHelpers.createToken(
    {
      id: userId,
      role: role,
    },
    config_1.default.jwt.secret,
    {
      expiresIn: config_1.default.jwt.expires_in,
    },
  )
  const refreshToken = jwtHelpers_1.jwtHelpers.createToken(
    {
      id: userId,
      role: role,
    },
    config_1.default.jwt.refresh_secret,
    {
      expiresIn: config_1.default.jwt.refresh_expires_in,
    },
  )
  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  }
}
exports.AuthService = {
  loginUser,
}
