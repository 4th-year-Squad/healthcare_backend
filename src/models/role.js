const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const mongooseUniqueValidator = require("mongoose-unique-validator");
const { MODEL_TYPES } = require("../utils/modelTypes");
const Permission = require("./permission");
const Role = new mongoose.Schema({
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
});
