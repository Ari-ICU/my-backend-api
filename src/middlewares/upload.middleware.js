const multer = require('multer');
const path = require('path');
const fs = require('fs');
const AppError = require('../exceptions/appError');

// Base directory for uploads
const BASE_UPLOAD_DIR = path.resolve(__dirname, '../uploads');

// Ensure base upload directory exists
if (!fs.existsSync(BASE_UPLOAD_DIR)) {
  fs.mkdirSync(BASE_UPLOAD_DIR, { recursive: true });
}

// Storage engine supporting dynamic destination folders
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      // Determine destination folder (from query ?folder=..., header x-folder, or default)
      let targetFolder = req.query.folder || req.headers['x-folder'] || '';

      // Prevent directory traversal attacks
      targetFolder = targetFolder.replace(/(\.\.[\/\\])+/g, '').trim();

      const finalPath = path.join(BASE_UPLOAD_DIR, targetFolder);

      // Create target directory if it does not exist
      if (!fs.existsSync(finalPath)) {
        fs.mkdirSync(finalPath, { recursive: true });
      }

      cb(null, finalPath);
    } catch (err) {
      cb(err, null);
    }
  },
  filename: (req, file, cb) => {
    // Sanitize original file name
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9_-]/g, '_');
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${baseName}-${uniqueSuffix}${ext}`);
  }
});

// Multer upload instances
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 50MB per file
  }
});

// Middleware wrappers with Multer error handling
function uploadSingle(fieldName = 'file') {
  const handler = upload.single(fieldName);
  return (req, res, next) => {
    handler(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return next(new AppError(`Upload error: ${err.message}`, 400));
      } else if (err) {
        return next(new AppError(err.message, 500));
      }
      next();
    });
  };
}

function uploadMultiple(fieldName = 'files', maxCount = 50) {
  const handler = upload.array(fieldName, maxCount);
  return (req, res, next) => {
    handler(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return next(new AppError(`Upload error: ${err.message}`, 400));
      } else if (err) {
        return next(new AppError(err.message, 500));
      }
      next();
    });
  };
}

module.exports = {
  upload,
  uploadSingle,
  uploadMultiple,
  BASE_UPLOAD_DIR
};

