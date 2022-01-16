const express = require("express");
const roomController = require("./../controllers/roomController");
const authController = require("./../controllers/authController");
const reviewRouter = require("./../routes/reviewRoutes");
const router = express.Router();
router.use("/:roomId/reviews", reviewRouter);
router
  .route("/")
  .get(roomController.getAllRooms)
  .post(
    authController.protect,
    authController.restrictTo("owner", "admin"),
    roomController.setIds,
    roomController.createRoom
  );
router
  .route("/:id")
  .get(roomController.getRoom)
  .patch(
    authController.protect,
    authController.restrictTo("owner", "admin"),
    roomController.updateRoom
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    roomController.deleteRoom
  );
module.exports = router;
