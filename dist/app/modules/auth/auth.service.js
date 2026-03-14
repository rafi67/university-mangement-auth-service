"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const user_model_1 = require("../user/user.model");
const http_status_1 = __importDefault(require("http-status"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const loginUser = async (payload) => {
    const { id, password } = payload;
    const isUserExists = await user_model_1.User.isUserExists(id);
    const { id: userId, role, needsPasswordChange } = isUserExists;
    if (!isUserExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User doesn't exists");
    }
    if (isUserExists.password &&
        !(await user_model_1.User.isPasswordMatched(password, isUserExists?.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    // create access token
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({
        id: userId,
        role: role,
    }, config_1.default.jwt.secret, {
        expiresIn: config_1.default.jwt.expires_in,
    });
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({
        id: userId,
        role: role,
    }, config_1.default.jwt.refresh_secret, {
        expiresIn: config_1.default.jwt.refresh_expires_in,
    });
    return {
        accessToken,
        refreshToken,
        needsPasswordChange,
    };
};
const refreshToken = async (token) => {
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
        // eslint-disable-next-line no-console
        console.log(verifiedToken);
    }
    catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token');
    }
    const { userId } = verifiedToken;
    const isUserExists = await user_model_1.User.isUserExists(userId);
    if (!isUserExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exists');
    }
    // generate new token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        id: isUserExists.id,
        role: isUserExists.role,
    }, config_1.default.jwt.secret, {
        expiresIn: config_1.default.jwt.expires_in,
    });
    return {
        accessToken: newAccessToken,
    };
};
const changePassword = async (user, payload) => {
    const { oldPassword, newPassword } = payload;
    const isUserExists = await user_model_1.User.isUserExists(user?.userId);
    if (!isUserExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exists');
    }
    if (isUserExists.password &&
        !(await user_model_1.User.isPasswordMatched(oldPassword, isUserExists.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is  incorrect');
    }
    const newHashedPassword = await bcrypt_1.default.hash(newPassword, Number(config_1.default.bcrypt_salt_rounds));
    const query = { id: user?.userId };
    const updatedData = {
        password: newHashedPassword,
        needsPasswordChange: false,
        passwordChangedAt: new Date(),
    };
    await user_model_1.User.findOneAndUpdate(query, updatedData);
};
exports.AuthService = {
    loginUser,
    refreshToken,
    changePassword,
};
