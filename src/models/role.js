const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const mongooseUniqueValidator = require("mongoose-unique-validator");
const { MODEL_TYPES } = require("../utils/modelTypes");
const Permission = require("./permission");

const role = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  description: String,
  permission: {
    type: Permission,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  isSuperAdmin: {
    type: Boolean,
    default: false,
    select: false,
  },
  isVerifiedHealthProfessional: {
    type: Boolean,
    default: false,
    select: false,
  },
  isMoh: {
    type: Boolean,
    default: false,
    select: false,
  },
  isHealthProfessional: {
    type: Boolean,
    default: false,
    select: false,
  },
  isUniversityEmployee: {
    type: Boolean,
    default: false,
    select: false,
  },
  isMedicalCenter: {
    type: Boolean,
    default: false,
    select: false,
  },
});

role.plugin(mongoosePaginate);
const Role = mongoose.model(MODEL_TYPES.ROLE, role);
module.exports = Role;
