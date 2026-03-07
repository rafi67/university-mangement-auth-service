"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const academicSemester_constant_1 = require("./academicSemester.constant");
const createAcademicSemesterZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        title: zod_1.default.enum(academicSemester_constant_1.academicSemesterTitles, {
            error: () => 'Title is required',
        }),
        year: zod_1.default.string('Year is required'),
        code: zod_1.default.enum(academicSemester_constant_1.academicSemesterCodes),
        startMonth: zod_1.default.enum(academicSemester_constant_1.academicSemesterMonths, {
            error: () => 'Start Month is required',
        }),
        endMonth: zod_1.default.enum(academicSemester_constant_1.academicSemesterMonths, {
            error: () => 'End Month is required',
        }),
    }),
});
const updateAcademicSemesterZodSchema = zod_1.default
    .object({
    body: zod_1.default.object({
        title: zod_1.default
            .enum(academicSemester_constant_1.academicSemesterTitles, {
            error: () => 'Title is required',
        })
            .optional(),
        year: zod_1.default.string('Year is required').optional(),
        code: zod_1.default.enum(academicSemester_constant_1.academicSemesterCodes).optional(),
        startMonth: zod_1.default
            .enum(academicSemester_constant_1.academicSemesterMonths, {
            error: () => 'Start Month is required',
        })
            .optional(),
        endMonth: zod_1.default
            .enum(academicSemester_constant_1.academicSemesterMonths, {
            error: () => 'End Month is required',
        })
            .optional(),
    }),
})
    .refine(data => (data.body.title && data.body.code) ||
    (!data.body.title && !data.body.code), {
    message: 'Either both title and should be provided or neither',
});
exports.AcademicSemesterValidation = {
    createAcademicSemesterZodSchema,
    updateAcademicSemesterZodSchema,
};
