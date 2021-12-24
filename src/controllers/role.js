const Role = require('../models/role');
const AppError = require('../utils/AppError');
const { catchAsync } = require('../middleware/error');

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

exports.getRoles = catchAsync(async (req, res, next) => {
  const page = req.query._page || 1;
  const limit = req.query._limit || 10;

  const roles = await Role.paginate(
    {
      isSuperAdminRole: false,
      isDeleted: false,
      isBidderRole: false,
      isSupplierRole: false,
    },
    {
      page,
      limit,
      lean: true,
      sort: '-createdAt',
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      roles,
    },
  });
});

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.getRole = catchAsync(async (req, res, next) => {
  const role = await Role.findById(
    req.params.id,
    { isDeleted: false },
    { lean: true }
  );

  if (!role) {
    return next(new AppError('Role with this ID does not exist', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      role,
    },
  });
});

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.createRole = catchAsync(async (req, res, next) => {
  const role = await Role.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      role,
    },
  });
});

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.updateRole = catchAsync(async (req, res, next) => {
  const role = await Role.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    lean: true,
    runValidators: true,
    context: 'query',
  });

  if (!role) {
    return next(new AppError('Role with this ID does not exist', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      role,
    },
  });
});

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.deleteRole = catchAsync(async (req, res, next) => {
  const role = await Role.findOneAndUpdate(req.params.id, { isDeleted: true });

  if (!role) {
    return next(new AppError("Role with this ID doesn't exist", 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      role: null,
    },
  });
});
