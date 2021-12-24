const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const mongooseUniqueValidator = require("mongoose-unique-validator");
const { MODEL_TYPES } = require("../utils/modelTypes");
const User = require("./user");
const Department = require("../models/department");

const schema = new mongoose.Schema(
  {
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODEL_TYPES.DEPARTMENT,
    },
    rating: {
      type: Number,
    },
    overview: {
      type: String,
    },
    subSpecialities: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODEL_TYPES.DEPARTMENT,
    },
    university: {
      type: String,
    },
    isVerifiedHealthProfessional: {
      default: false,
    },
  },

  {
    timestamps: true,
    discriminatorKey: "kind",
  }
);

schema.plugin(mongoosePaginate);

const HealthProfessional = User.discriminator(
  MODEL_TYPES.HEALTH_PROFESSIONAL,
  schema
);

module.exports = HealthProfessional;
