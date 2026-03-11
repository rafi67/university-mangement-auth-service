"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.facultyFilterableFields = exports.facultySearchableFields = exports.gender = exports.bloodGroup = void 0;
exports.bloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
exports.gender = ['male', 'female'];
exports.facultySearchableFields = [
    'id',
    'email',
    'contactNo',
    'designation',
    'bloodGroup',
    'name.firstName',
    'name.middleName',
    'name.lastName',
];
exports.facultyFilterableFields = [
    'searchTerm',
    'id',
    'bloodGroup',
    'email',
    'contactNo',
    'emergencyContactNo',
    'designation',
    'academicDepartment',
    'academicFaculty',
];
