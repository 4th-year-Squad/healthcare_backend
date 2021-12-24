const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const mongooseUniqueValidator = require("mongoose-unique-validator");
const { MODEL_TYPES } = require("../utils/modelTypes");
const User = require("./user");

const schema = new mongoose.Schema(
  {
    university: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODEL_TYPES.UNIVERSITY,
    },
  },

  {
    timestamps: true,
    discriminatorKey: "kind",
  }
);

schema.plugin(mongoosePaginate);

const UniversityEmployee = User.discriminator(
  MODEL_TYPES.UNIVERSITY_EMPLOYEE,
  schema
);

module.exports = UniversityEmployee;
