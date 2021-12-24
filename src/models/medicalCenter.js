const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const mongooseUniqueValidator = require("mongoose-unique-validator");
const { MODEL_TYPES } = require("../utils/modelTypes");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    city: String,
    subCity: String,
    woreda: String,
    geoLocation: {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number],
      name: {
        type: String,
      },
    },
  },

  {
    timestamps: true,
  }
);

schema.plugin(mongoosePaginate);

const MedicalCenter = mongoose.Model(MODEL_TYPES.MEDICALCENTER, schema);
module.exports = MedicalCenter;
