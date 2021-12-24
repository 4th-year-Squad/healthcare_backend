const User = require("../models/user");
const AppError = require("../utils/AppError");
const { catchAsync } = require("./error");

exports.RESOURCES = {
  USER: "USER",
  ROLE: "ROLE",
  VERIFICATION_DOCUMENT: "VERIFICATION_DOCUMENT",
};

exports.ACCESS_RIGHT = {
  CREATE: "create",
  READ: "read",
  READ_ALL: "readAll",
  UPDATE: "update",
  DELETE: "delete",
};

exports.verifyUser = catchAsync(async (req, res, next) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("You're not logged in", 401));
  }

  const { id } = await User.verifyToken(token);

  const user = await User.findById(id, null, {
    populate: "role",
    lean: true,
  });

  if (!user) {
    next(new AppError("The user related to the token no longer exists", 401));
  }

  if (!user.isActive) {
    next(new AppError("You're account is not activated", 401));
  }

  req.user = user;
  next();
});

exports.restrictUser = (resource, accessRight) => {
  return catchAsync(async (req, res, next) => {
    if (
      !req.user.role.permissions[resource] ||
      !req.user.role.permissions[resource][accessRight]
    ) {
      return next(
        new AppError("You aren't authorized to perform this operation", 403)
      );
    }
  });
};
