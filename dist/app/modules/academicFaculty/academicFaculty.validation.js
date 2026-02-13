"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const createAcademicFacultyZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        title: zod_1.default.string('Title is required'),
    }),
});
const updateAcademicFacultyZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        title: zod_1.default.string('Title is required'),
    }),
});
exports.AcademicFacultyValidation = {
    createAcademicFacultyZodSchema,
    updateAcademicFacultyZodSchema,
};
