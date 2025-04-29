const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMidlleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const uploadMiddleware = require('../middleware/uploadMiddleware');
const { uploadImage } = require('../controllers/imageControllers');
// const imageController = require('../controllers/imageControllers');

router.post(
  '/upload',
  authMiddleware,
  adminMiddleware,
  uploadMiddleware.single('image'),
  uploadImage
);

// get all images

module.exports = router;
