'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.Admin = exports.adminSchema = void 0
const mongoose_1 = require('mongoose')
const admin_constant_1 = require('./admin.constant')
exports.adminSchema = new mongoose_1.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        middleName: {
          type: String,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    contactNo: {
      type: String,
      unique: true,
      required: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: admin_constant_1.gender,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: admin_constant_1.bloodGroup,
    },
    managementDepartment: {
      type: String,
      ref: 'ManagementDepartment',
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)
exports.Admin = (0, mongoose_1.model)('Admin', exports.adminSchema)
