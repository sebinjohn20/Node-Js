const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");
const uploadMiddleware = require("../middleware/upload-middleware");
const {
  uploadImageController,
  fechImagesController,
  deleteImageController,
} = require("../Controllers/image-controllers");
const { diffIndexes } = require("../Models/Users");
const router = express.Router();

//upload the image
router.post(
  "/upload",
  authMiddleware,
  adminMiddleware,
  uploadMiddleware.single("image"),
  uploadImageController
);

// to get all the images

router.get("/get", authMiddleware, fechImagesController);

//delete image route
router.delete(
  "/delete/:id",
  authMiddleware,
  adminMiddleware,
  deleteImageController
);
module.exports = router;

///695b55d72cbab53bc28af240
