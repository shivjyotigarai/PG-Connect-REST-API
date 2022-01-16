const mongoose = require("mongoose");
const validator = require("validator");
const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A room must have a name"],
      unique: [true, "This name already exists"],
    },
    location: {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    contact: {
      type: Number,
      max: 9999999999,
    },
    mail: {
      type: String,
      required: [true, "Please provide your mail"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    deposit: {
      type: Number,
    },
    established: {
      type: Number,
      min: [1800, "Must be established after 1800"],
    },
    parking: {
      type: String,
    },
    notice: {
      type: Number,
    },
    ratingsAverage: {
      type: Number,
      default: 0,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
    },
    ratingsQty: {
      type: Number,
      default: 0,
    },
    distance: {
      type: Number,
    },
    food: {
      type: String,
      enum: {
        values: ["Veg", "Non-Veg", "Both", "None"],
        message: "Food can be veg, non-veg, both or none",
      },
    },
    occupancy: {
      type: String,
      enum: {
        values: ["Single", "Double", "Triple"],
        message: "Occupancy can be either single, double or triple sharing",
      },
    },
    type: {
      type: String,
      enum: {
        values: ["Girls", "Boys", "Both"],
        message: "Type can be either Girls/Boys/Both",
      },
    },
    images: [
      {
        type: String,
      },
    ],
    price: {
      type: Number,
      required: [true, "A room must have a price"],
    },
    summary: {
      type: String,
      required: [true, "A room must have a summary"],
    },
    description: {
      type: String,
    },
    imagecover: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A room must have an owner"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
roomSchema.pre(/^find/, function (next) {
  this.populate({
    path: "owner",
    select: "-__v -passwordChangedAt",
  });
  next();
});
// Virtual populate
roomSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "room",
  localField: "_id",
});
roomSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
