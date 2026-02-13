"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const admin_constant_1 = require("./admin.constant");
const admin_model_1 = require("./admin.model");
const getAllAdmins = async (filters, paginationOptions) => {
    const { searchTerm, ...filtersData } = filters;
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: admin_constant_1.adminSearchableFields.map(field => ({
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
    const result = await admin_model_1.Admin.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = await admin_model_1.Admin.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};
const getSingleAdmin = async (id) => {
    const result = await admin_model_1.Admin.findOne({ id });
    return result;
};
const updateAdmin = async (id, payload) => {
    const result = await admin_model_1.Admin.findOneAndUpdate({ id: id }, payload, {
        new: true,
    });
    return result;
};
exports.AdminService = {
    getAllAdmins,
    getSingleAdmin,
    updateAdmin,
};
