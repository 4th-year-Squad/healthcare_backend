const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const mongooseUniqueValidator = require("mongoose-unique-validator");
const { MODEL_TYPES } = require("../utils/modelTypes");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { cleanEnv, str } = require("envalid");

const env = cleanEnv(process.env, {
  JWT_SECRET_KEY: str(),
  JWT_EXPIRES_IN: str(),
});

const user = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      select: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODEL_TYPES.ROLE,
    },
  },
  {
    timestamps: true,
    discriminatorKey: "kind",
  }
);

user.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
user.methods.verifyPassword = function (candidatePassword, userPassword) {
  return new Promise(async (resolve, reject) => {
    try {
      const isValid = await bcrypt.compare(candidatePassword, userPassword);
      resolve(isValid);
    } catch (error) {
      reject(error);
    }
  });
};
user.statics.getToken = function (id) {
  return new Promise(async (resolve, reject) => {
    try {
      const token = await promisify(jwt.sign)({ id }, env.JWT_SECRET_KEY, {
        expiresIn: env.JWT_EXPIRES_IN,
      });
      resolve(token);
    } catch (error) {
      reject(error);
    }
  });
};
schema.statics.verifyToken = function (token) {
    return new Promise(async (resolve, reject) => {
      try {
        const payload = await promisify(jwt.verify)(token, env.JWT_SECRET_KEY);
        resolve(payload);
      } catch (error) {
        reject(error);
      }
    });
  };
user.plugin(mongoosePaginate);
user.plugin(mongooseUniqueValidator);

const User = mongoose.model(MODEL_TYPES.USER, user);
module.exports = User;
