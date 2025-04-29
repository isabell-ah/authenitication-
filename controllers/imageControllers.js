const Image = require('../models/image');
const { uploadToCloudinary } = require('../helpers/cloudinaryHelper');

const uploadImage = async (req, res) => {
  try {
    // Check if file is missing
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'File is required. Please upload an image',
      });
    }

    // Validate req.user
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized. User information is missing.',
      });
    }

    // Upload to Cloudinary
    const { url, publicid } = await uploadToCloudinary(req.file.path);

    // Store the image URL and public ID in the database
    const newuploadedImage = new Image({
      url,
      publicid,
      uploadedBy: req.user, // Ensure this field matches your schema
    });

    await newuploadedImage.save();

    res.status(201).json({
      success: true,
      message: 'Image uploaded successfully',
      image: newuploadedImage,
    });
  } catch (err) {
    console.error('Error uploading image:', err); // Improved error logging
    res.status(500).json({
      success: false,
      message: 'Something went wrong! Please try again.',
    });
  }
};

module.exports = {
  uploadImage,
};
