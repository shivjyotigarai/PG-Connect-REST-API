const Review = require("./../models/reviewModel");
const APIFeatures = require("./../utils/apiFeatures");
const AppError = require("./../utils/appError");
exports.getAllReviews = async function (req, res) {
  try {
    console.log("hey");
    console.log(req.params);
    let filter = {};
    if (req.params.roomId) filter = { room: req.params.roomId };
    let features = new APIFeatures(Review.find(filter), req.query);
    console.log(features); // object
    features = features.filter();
    const reviews = await features.query;
    res.status(200).json({
      status: "success",
      results: reviews.length,
      data: {
        reviews,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
exports.getReview = async function (req, res) {
  try {
    const id = req.params.id;
    const review = await Review.findById(id);
    if (!review) {
      return next(new AppError("No review found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        review,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
exports.updateReview = async function (req, res, next) {
  try {
    const id = req.params.id;
    const temp_review = await Review.findById(id);
    console.log(temp_review);
    if (!temp_review)
      return next(new AppError("No review found with that ID", 404));
    if (temp_review.user.id != req.user.id)
      return next(new AppError("You have not written this review", 404));
    if (!req.body.review) req.body.review = temp_review.review;
    if (!req.body.rating) req.body.rating = temp_review.rating;
    const review = await Review.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!review) {
      return next(new AppError("No review found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        review,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
exports.createReview = async (req, res, next) => {
  try {
    const newReview = await Review.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        review: newReview,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
exports.deleteReview = async (req, res, next) => {
  try {
    // if document is not present Model.findByIdAndDelete() and Model.findByIdAndUpdate() throws an error whereas Model.findById() returns a null document
    console.log(req.params.id);
    const review = await Review.findById(req.params.id);
    if (!review) {
      return next(new AppError("No review found with that ID", 404));
    }
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    console.log(deletedReview);
    res.status(201).json({
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
exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.room) req.body.room = req.params.roomId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
