const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller');
const { uploadSingle, uploadMultiple } = require('../middlewares/upload.middleware');

// GET /api/v1/upload - List files & subfolders in the uploads directory
router.get('/', uploadController.listUploadedFiles);

// POST /api/v1/upload/single - Upload a single file
router.post('/single', uploadSingle('file'), uploadController.uploadSingleFile);

// POST /api/v1/upload/folder - Upload an entire folder or upload files to a target folder
router.post('/folder', uploadMultiple('files', 100), uploadController.uploadFolderFiles);

// POST /api/v1/upload or /files - Upload multiple files
router.post('/files', uploadMultiple('files', 50), uploadController.uploadMultipleFiles);
router.post('/', uploadMultiple('files', 50), uploadController.uploadMultipleFiles);

module.exports = router;

