const express = require("express");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const roomRouter = require("./routes/roomRoutes");
const userRouter = require("./routes/userRoutes");
const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
app.get("/", function (req, res) {
  res.sendFile("views/root.html", { root: __dirname });
});
app.use("/api/v1/rooms", roomRouter);
app.use("/api/v1/users", userRouter);
app.all("*", (req, res, next) => {
  res.sendFile("views/error.html", { root: __dirname });
});
//Global error handling middleware
app.use((err, req, res, next) => {
  console.log(" Global error handling middleware");
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
});
module.exports = app;
