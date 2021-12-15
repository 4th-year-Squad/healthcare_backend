const AppError = require("../utils/AppError");

exports.catchAsync = (controller) => (req, res, next) =>
  Promise.resolve(controller(req, res, next)).catch(next);

exports.errorController = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (err.name == "TokenExpiredError") {
    err = new AppError("The token has expired", 401);
  }
  if (err.name == "JsonWebTokenError") {
    err = new AppError("The token is invalid", 401);
  }

  if (err.name == "ValidationError") {
    if (
      err.errors["phoneNumber"] &&
      err.errors["phoneNumber"].kind == "unique"
    ) {
      err = new AppError("Phone Number already exists", 400);
    } else if (err.errors["name"] && err.errors["name"].kind == "unique") {
      err = new AppError("Name already exists", 400);
    }
  }
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(err.statusCode).json({
      status: err.status,
      message: "Oops, something went wrong!",
      err,
    });
  }

  next();
};
