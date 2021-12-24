const path = require("path");
const multer = require("multer");
const { nanoid } = require("nanoid");
const User = require("../models/user");
const Role = require("../models/role");
const AppError = require("../utils/AppError");
const { catchAsync } = require("../middleware/error");
const { MODEL_TYPES } = require("../utils/models-type");

/**
 * Multer disk storage
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/img/profile"));
  },
  filename: function (req, file, cb) {
    cb(null, `profile-${nanoid()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

/**
 * Upload Middleware
 */
const uploadProfile = upload.single("profilePicture");

const register = catchAsync(async (req, res) => {
  // profile picture
  if (req.file) {
    req.body.profilePicture = req.file.filename;
  }
  // location
  if (req.body.geoLocation) {
    const parsed = JSON.parse(req.body.geoLocation);
    req.body.geoLocation = {
      coordinates: [parsed.lng, parsed.lat],
      name: parsed.name,
    };
  }

  // append role
  const role = await Role.findOne({ name: "Health Professional" }, "_id", {
    lean: true,
  });
  if (role) {
    req.body.role = role._id;
  }

  let user = await User.create(req.body);

  user = await user.populate("role");
  const token = await User.getToken(user._id);

  res.status(200).json({
    status: "success",
    data: {
      token,
      user,
    },
  });
});

const login = catchAsync(async (req, res) => {
  const { phoneNumber, email, password } = req.body;
  if ((!phoneNumber && !email) || !password) {
    next(new AppError("Please provide credential information", 400));
  }

  let user;
  user = await User.findOne({ phoneNumber })
    .select("+password")
    .populate("role");
  if (!user) {
    user = await User.findOne({ email }).select("+password").populate("role");
  }

  if (!user || !(await user.verifyPassword(password, user.password))) {
    return next(new AppError("Incorrect phone number or password", 401));
  }

  if (!user.isActive) {
    return next(new AppError("You're account is not activated", 401));
  }
  const token = await User.getToken(user._id);
  res.status(200).json({
    status: "success",
    data: {
      token,
      user,
    },
  });
});

module.exports = {
  register,
  login,
  uploadProfile,
};
