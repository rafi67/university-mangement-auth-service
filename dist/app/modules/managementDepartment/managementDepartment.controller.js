"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagementDepartmentController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const managementDepartment_service_1 = require("./managementDepartment.service");
const pick_1 = __importDefault(require("../../../shared/pick"));
const managementDepartment_constant_1 = require("./managementDepartment.constant");
const pagination_1 = require("../../../constants/pagination");
const createManagementDepartment = (0, catchAsync_1.default)(async (req, res) => {
    const data = req.body;
    const result = await managementDepartment_service_1.ManagementDepartmentService.createManagementDepartment(data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Management department created successfully',
        data: result,
    });
});
const getAllManagementDepartment = (0, catchAsync_1.default)(async (req, res) => {
    const filters = (0, pick_1.default)(req.query, managementDepartment_constant_1.managementDepartmentFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = await managementDepartment_service_1.ManagementDepartmentService.getAllManagementDepartment(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Management department retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
});
const getSingleManagementDepartment = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await managementDepartment_service_1.ManagementDepartmentService.getSingleManagementDepartment(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Management department retrieved successfully',
        data: result,
    });
});
const updateManagementDepartment = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await managementDepartment_service_1.ManagementDepartmentService.updateManagementDepartment(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Management department successfully updated',
        data: result,
    });
});
exports.ManagementDepartmentController = {
    createManagementDepartment,
    getAllManagementDepartment,
    getSingleManagementDepartment,
    updateManagementDepartment,
};
