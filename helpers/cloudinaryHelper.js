const cloudinary = require('../config/cloudinary');

const uploadToCloudinary = async (filepath) => {
  try {
    const result = await cloudinary.uploader.upload(filepath);
    return {
      url: result.secure_url,
    };
  } catch (err) {
    console.log('Error uploading to Cloudinary', err);
    throw new Error('Error uploading to Cloudinary');
  }
};
module.exports = {
  uploadToCloudinary,
};
