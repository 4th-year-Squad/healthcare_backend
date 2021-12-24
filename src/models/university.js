const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const mongooseUniqueValidator = require("mongoose-unique-validator");
const { MODEL_TYPES } = require("../utils/modelTypes");
const User = require("./user");

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

const University = mongoose.Model(MODEL_TYPES.UNIVERSITY, schema);
module.exports = University;
