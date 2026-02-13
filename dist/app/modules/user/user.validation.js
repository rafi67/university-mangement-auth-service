"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const user_constant_1 = require("./user.constant");
const createUserZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        password: zod_1.default.string().optional(),
        student: zod_1.default.object({
            name: zod_1.default.object({
                firstName: zod_1.default.string('First Name is required'),
                middleName: zod_1.default.string('Middle Name is required').optional(),
                lastName: zod_1.default.string('Last Name is required'),
            }),
            dateOfBirth: zod_1.default.string('Date of birth is required'),
            gender: zod_1.default.enum([...user_constant_1.gender], {
                error: 'Gender is required',
            }),
            bloodGroup: zod_1.default
                .enum([...user_constant_1.bloodGroup], {
                error: 'Blood group is required',
            })
                .optional(),
            email: zod_1.default.email('Email is required'),
            contactNo: zod_1.default.string('Contact number is required'),
            emergencyContactNo: zod_1.default.string('Emergency contact number is required'),
            presentAddress: zod_1.default.string('Present address is required'),
            permanentAddress: zod_1.default.string('Permanent address is required'),
            academicSemester: zod_1.default.string('Academic semester is required'),
            academicDepartment: zod_1.default.string('Academic department is required'),
            academicFaculty: zod_1.default.string('Academic faculty is required'),
            guardian: zod_1.default.object({
                fatherName: zod_1.default.string('Father name is required'),
                fatherOccupation: zod_1.default.string('Father occupation is required'),
                fatherContactNo: zod_1.default.string('Father contact number is required'),
                motherName: zod_1.default.string('Mother name is required'),
                motherOccupation: zod_1.default.string('Mother occupation is required'),
                address: zod_1.default.string('Guardian address is required'),
            }),
            localGuardian: zod_1.default.object({
                name: zod_1.default.string('Local guardian name is required'),
                occupation: zod_1.default.string('Local guardian occupation is required'),
                contactNo: zod_1.default.string('Local guardian contact number is required'),
                address: zod_1.default.string('Local guardian address is required'),
            }),
        }),
        profileImage: zod_1.default.string().optional(),
    }),
});
const createFacultyZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        password: zod_1.default.string().optional(),
        faculty: zod_1.default.object({
            name: zod_1.default.object({
                firstName: zod_1.default.string('First name is required'),
                middleName: zod_1.default.string().optional(),
                lastName: zod_1.default.string('Last name is required'),
            }),
            dateOfBirth: zod_1.default.string('Date of birth is required'),
            email: zod_1.default.email('Email is required'),
            contactNo: zod_1.default.string('Contact number is required'),
            emergencyContactNo: zod_1.default.string('Emergency contact number is required'),
            gender: zod_1.default.enum([...user_constant_1.gender], {
                error: 'Gender is required',
            }),
            permanentAddress: zod_1.default.string('Permanent address is required'),
            presentAddress: zod_1.default.string('Present address is required'),
            bloodGroup: zod_1.default.enum([...user_constant_1.bloodGroup]).optional(),
            designation: zod_1.default.string('Designation is required'),
            academicDepartment: zod_1.default.string('Academic department is required'),
            academicFaculty: zod_1.default.string('Academic Faculty is required'),
            profileImage: zod_1.default.string().optional(),
        }),
    }),
});
const createAdminZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        password: zod_1.default.string().optional(),
        admin: zod_1.default.object({
            name: zod_1.default.object({
                firstName: zod_1.default.string('First name is required'),
                middleName: zod_1.default.string().optional(),
                lastName: zod_1.default.string('Last name is required'),
            }),
            dateOfBirth: zod_1.default.string('Date of birth is required'),
            email: zod_1.default.email('Email is required'),
            contactNo: zod_1.default.string('Contact number is required'),
            emergencyContactNo: zod_1.default.string('Emergency contact number is required'),
            gender: zod_1.default.enum([...user_constant_1.gender], {
                error: 'Gender is required',
            }),
            permanentAddress: zod_1.default.string('Permanent address is required'),
            presentAddress: zod_1.default.string('Present address is required'),
            bloodGroup: zod_1.default.enum([...user_constant_1.bloodGroup]).optional(),
            managementDepartment: zod_1.default.string('Management department is required'),
            designation: zod_1.default.string('Designation is required'),
            profileImage: zod_1.default.string().optional(),
        }),
    }),
});
exports.UserValidation = {
    createUserZodSchema,
    createFacultyZodSchema,
    createAdminZodSchema,
};
