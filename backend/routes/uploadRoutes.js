import express from 'express';
import { upload, isCloudinaryConfigured } from '../config/cloudinary.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Check if upload feature is available
const checkUploadAvailable = (req, res, next) => {
  if (!isCloudinaryConfigured) {
    return res.status(503).json({
      status: 'error',
      message: 'Image upload is not configured. Please use image URL instead.'
    });
  }
  next();
};

// Upload single image
router.post('/image', protect, admin, checkUploadAvailable, (req, res, next) => {
  if (!upload) {
    return res.status(503).json({
      status: 'error',
      message: 'Upload service not available'
    });
  }
  
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        status: 'error',
        message: err.message
      });
    }

    try {
      if (!req.file) {
        return res.status(400).json({
          status: 'error',
          message: 'No file uploaded'
        });
      }

      res.status(200).json({
        status: 'success',
        data: {
          url: req.file.path,
          publicId: req.file.filename
        }
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  });
});

// Upload multiple images
router.post('/images', protect, admin, checkUploadAvailable, (req, res, next) => {
  if (!upload) {
    return res.status(503).json({
      status: 'error',
      message: 'Upload service not available'
    });
  }

  upload.array('images', 5)(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        status: 'error',
        message: err.message
      });
    }

    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          status: 'error',
          message: 'No files uploaded'
        });
      }

      const uploadedFiles = req.files.map(file => ({
        url: file.path,
        publicId: file.filename
      }));

      res.status(200).json({
        status: 'success',
        data: uploadedFiles
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  });
});

export default router;
