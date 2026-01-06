const Image = require("../Models/image");
const uploadToCloudinary = require("../helpers/cloudinaryHelper");
const fs = require("fs");
const cloudinary = require("../config/cloudinary");

const uploadImageController = async (req, res) => {
  try {
    // check if file is missing in req object
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required. Please upload an image",
      });
    }

    /// upload to cloudinary
    const { url, publicId } = await uploadToCloudinary(req.file.path);

    /// store image url and public id along with the uploaded user id
    const newlyUploadedImage = new Image({
      url,
      publicId,
      uploadedBy: req.userInfo.userId,
    });
    await newlyUploadedImage.save();

    ///delete the file from  local storge
    fs.unlinkSync(req.file.path);
    res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      image: newlyUploadedImage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

const fechImagesController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skipt = (page - 1) * limit;
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;
    const totalImages = await Image.countDocuments();
    const totalPages = Math.ceil(totalImages / limit);

    const sortObj = {};
    sortObj[sortBy] = sortOrder;
    const images = await Image.find().sort(sortObj).skip(skipt).limit(limit);

    if (images) {
      res.status(200).json({
        success: true,
        currentPage: page,
        totalPage: totalPages,
        totalImages: totalImages,
        data: images,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

const deleteImageController = async (req, res) => {
  try {
    const getCurrentIdOfImageToBeDeleted = req.params.id;
    const userId = req.userInfo.userId;
    const image = await Image.findById(getCurrentIdOfImageToBeDeleted);
    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image is not Found",
      });
    }

    /// check if this image is uploaded by the current user who is trying to delete this
    if (image.uploadedBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message:
          "You are not authorized to delete this image bevause you haven't uploaded",
      });
    }

    //delete this image first form your cloudinary stroage
    await cloudinary.uploader.destroy(image.publicId);

    // delete this image from mongodb database
    await Image.findByIdAndUpdate(getCurrentIdOfImageToBeDeleted);
    res.status(200).json({
      success: true,
      message: "Image is deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};
module.exports = {
  uploadImageController,
  fechImagesController,
  deleteImageController,
};
