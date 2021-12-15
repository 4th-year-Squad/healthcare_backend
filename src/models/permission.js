const mongoose = require("mongoose");

const AccessRight = new mongoose.Schema({
  create: {
    type: Boolean,
    default: false,
  },
  readAll: {
    type: Boolean,
    default: false,
  },
  read: {
    type: Boolean,
    default: false,
  },
  update: {
    type: Boolean,
    default: false,
  },
  delete: {
    type: Boolean,
    default: false,
  },
});

const Permission = new mongoose.Schema(
  {
    user: AccessRight,
    role: AccessRight,
  },
  {
    _id: false,
    timestamps: true,
  }
);

module.exports = Permission;
