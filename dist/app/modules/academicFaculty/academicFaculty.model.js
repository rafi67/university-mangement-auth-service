"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFaculty = void 0;
const mongoose_1 = require("mongoose");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const academicFacultySchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
});
academicFacultySchema.pre('save', async function () {
    const isExists = await exports.AcademicFaculty.findOne({
        title: this.title,
    });
    if (isExists) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'Academic faculty is already exists!');
    }
});
exports.AcademicFaculty = (0, mongoose_1.model)('AcademicFaculty', academicFacultySchema);
