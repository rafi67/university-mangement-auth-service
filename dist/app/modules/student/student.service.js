"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const student_constant_1 = require("./student.constant");
const student_model_1 = require("./student.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const getAllStudents = async (filters, paginationOptions) => {
    const { searchTerm, ...filtersData } = filters;
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: student_constant_1.studentSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const { skip, limit, page, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = await student_model_1.Student.find(whereConditions)
        .populate('academicSemester')
        .populate('academicDepartment')
        .populate('academicFaculty')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = await student_model_1.Student.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};
const getSingleStudent = async (id) => {
    const result = await student_model_1.Student.findById(id)
        .populate('academicSemester')
        .populate('academicDepartment')
        .populate('academicFaculty');
    return result;
};
const updateStudent = async (id, payload) => {
    const isExists = await student_model_1.Student.findOne({ id });
    if (!isExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Student not found!');
    }
    const { name, guardian, localGuardian, ...studentData } = payload;
    const updatedStudentData = { ...studentData };
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach(key => {
            const nameKey = `name.${key}`;
            updatedStudentData[nameKey] = name[key];
        });
    }
    if (guardian && Object.keys(guardian).length > 0) {
        Object.keys(guardian).forEach(key => {
            const guardianKey = `guardian.${key}`;
            updatedStudentData[guardianKey] = guardian[key];
        });
    }
    if (localGuardian && Object.keys(localGuardian).length > 0) {
        Object.keys(localGuardian).forEach(key => {
            const localGuardianKey = `localGuardian.${key}`;
            updatedStudentData[localGuardianKey] =
                localGuardian[key];
        });
    }
    const result = await student_model_1.Student.findOneAndUpdate({ id }, updatedStudentData, {
        new: true,
    });
    return result;
};
const deleteStudent = async (id) => {
    const result = await student_model_1.Student.findByIdAndDelete(id);
    return result;
};
exports.StudentService = {
    getAllStudents,
    getSingleStudent,
    updateStudent,
    deleteStudent,
};
