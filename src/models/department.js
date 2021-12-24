const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const mongooseUniqueValidator = require("mongoose-unique-validator");
const { MODEL_TYPES } = require("../utils/modelTypes");

const schema = new mongoose.Schema(
  {
    name: String,
  },

  {
    timestamps: true,
  }
);

const Department = mongoose.Model(MODEL_TYPES.DEPARTMENT, schema);

module.exports = Department;
