"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const academicFaculty_model_1 = require("./academicFaculty.model");
const createFaculty = async (payload) => {
    const result = await academicFaculty_model_1.AcademicFaculty.create(payload);
    return result;
};
const getAllFaculty = async (paginationOptions) => {
    const { skip, limit, page, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const result = await academicFaculty_model_1.AcademicFaculty.find()
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = await academicFaculty_model_1.AcademicFaculty.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};
const updateFaculty = async (id, payload) => {
    const result = await academicFaculty_model_1.AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
};
const deleteFaculty = async (id) => {
    const result = await academicFaculty_model_1.AcademicFaculty.findByIdAndDelete({ _id: id });
    return result;
};
exports.AcademicFacultyService = {
    createFaculty,
    getAllFaculty,
    updateFaculty,
    deleteFaculty,
};
