const Room = require("./../models/roomModel");
const APIFeatures = require("./../utils/apiFeatures");
const AppError = require("./../utils/appError");
exports.getAllRooms = async function (req, res) {
  try {
    //http://localhost:3000/api/v1/rooms?parking=Yes&food=Non-Veg&established[lt]=2010
    console.log(req.query);
    // console.log(req.params);
    // console.log(req.body);
    let features = new APIFeatures(Room.find(), req.query);
    console.log(features); // object
    features = features.filter().sort().limitFields().paginate();
    const rooms = await features.query;
    res.status(200).json({
      status: "success",
      results: rooms.length,
      data: {
        rooms,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
exports.createRoom = async (req, res) => {
  try {
    const newRoom = await Room.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        room: newRoom,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateRoom = async (req, res, next) => {
  try {
    let userId = req.user.id;
    const temp_room = await Room.findById(req.params.id);
    if (!temp_room) {
      return next(new AppError("No room found with that ID", 404));
    }
    let flag = false;
    const id = temp_room.owner._id;
    if (userId == id) flag = true;
    console.log(flag);
    if (!flag) {
      return next(
        new AppError("You are not not allowed to perform this action", 404)
      );
    }
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        room,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteRoom = async (req, res, next) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) {
      return next(new AppError("No room found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
exports.getRoom = async (req, res, next) => {
  try {
    //http://localhost:3000/api/v1/rooms/61486a24913693c7d1c058a4
    const room = await Room.findById(req.params.id).populate("reviews");
    console.log(room);
    if (!room) {
      return next(new AppError("No room found with that ID", 401));
    }

    res.status(200).json({
      status: "success",
      results: 1,
      data: {
        room,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
exports.setIds = (req, res, next) => {
  if (!req.body.owner) req.body.owner = req.user.id;
  if (!req.body.mail) req.body.mail = req.user.email;
  next();
};
