const User = require("./../models/userModel");
const AppError = require("./../utils/appError");
exports.getAllUsers = async (req, res, next) => {
  const users = await User.find();
  //response
  res.status(500).json({
    status: "success",
    result: users.length,
    data: {
      users,
    },
  });
};
exports.getUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    console.log(user);
    console.log(id);
    if (!user) {
      return next(new AppError("User Not Found", 404));
    }
    res.status(500).json({
      status: "success",
      results: 1,
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
exports.updateMe = async (req, res, next) => {
  try {
    if (req.body.password || req.body.passwordConfirm) {
      return next(
        new AppError(
          "This route is not for password updates. Please use /updateMyPassword.",
          400
        )
      );
    }
    const obj = {};
    req.body.name
      ? (obj["name"] = req.body.name)
      : (obj["name"] = req.user.name);
    req.body.email
      ? (obj["email"] = req.body.email)
      : (obj["email"] = req.user.email);
    const updatedUser = await User.findByIdAndUpdate(req.user.id, obj, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
