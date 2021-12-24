const User = require("../models/user");
const sgMail = require("@sendgrid/mail");
const { cleanEnv, str, email } = require("envalid");
const AppError = require("../utils/AppError");

const env = cleanEnv(process.env, {
  SENDGRID_API_KEY: str(),
  FROM_EMAIL: email(),
});

sgMail.setApiKey(env.SENDGRID_API_KEY);

// PASSWORD RECOVER AND RESET

exports.recover = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    next(new AppError("Please provide credential information", 400));
  }

  const user = await User.findOne({
    email: email,
  });

  console.log(user);

  if (!user) {
    return next(
      new AppError(
        `The email address ${email} is not associated with any account. Double-check your email address and try again.`,
        400
      )
    );
  }

  user.generatePasswordReset();

  await user.save();

  let link = `http://${req.headers.host}/api/auth/reset/${user.resetPasswordToken}`;
  const mailOptions = {
    to: user.email,
    from: env.FROM_EMAIL,
    subject: "Password Change request",
    text: `Hi ${user.firstName} ${user.lastName}, \n 
    Please click on the following link ${link} to reset your password. \n\n 
    If you did not request this, please ignore this email and your password will remain unchanged.\n`,
  };

  sgMail
    .send(mailOptions)
    .then((response) => {
      console.log(response);
      return res.status(200).json({
        status: "success",
        message: `A reset email has been sent to ${user.email} .`,
      });
    })
    .catch((err) => next(new AppError(err.message, 500)));
};

exports.reset = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user)
    return res
      .status(401)
      .json({ message: "Password reset token is invalid or has expired." });

  res.status(200).json({
    status: "success",
    user,
  });
};

exports.resetPassword = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user)
    return new AppError("Password reset token is invalid or has expired.", 401);

  //Set the new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  // Save
  user.save((err) => {
    if (err) return res.status(500).json({ message: err.message });

    // send email
    const mailOptions = {
      to: user.email,
      from: env.FROM_EMAIL,
      subject: "Your password has been changed",
      text: `Hi ${user.username} \n 
                  This is a confirmation that the password for your account ${user.email} has just been changed.\n`,
    };

    sgMail.send(mailOptions, (error, result) => {
      if (error) return res.status(500).json({ message: error.message });

      res.status(200).json({ message: "Your password has been updated." });
    });
  });
};
