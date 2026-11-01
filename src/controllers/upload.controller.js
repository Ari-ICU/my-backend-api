const path = require('path');
const fs = require('fs');
const AppError = require('../exceptions/appError');
const { BASE_UPLOAD_DIR } = require('../middlewares/upload.middleware');

function formatFileResponse(file, req) {
  const relativePath = path.relative(BASE_UPLOAD_DIR, file.path).replace(/\\/g, '/');
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${relativePath}`;

  return {
    original_name: file.originalname,
    filename: file.filename,
    size: file.size,
    mimetype: file.mimetype,
    folder: path.dirname(relativePath) === '.' ? '/' : path.dirname(relativePath),
    path: `/uploads/${relativePath}`,
    url: fileUrl
  };
}

async function uploadSingleFile(req, res, next) {
  try {
    if (!req.file) {
      return next(new AppError('No file provided for upload', 400));
    }

    res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
      data: formatFileResponse(req.file, req)
    });
  } catch (error) {
    next(error);
  }
}

async function uploadMultipleFiles(req, res, next) {
  try {
    if (!req.files || req.files.length === 0) {
      return next(new AppError('No files provided for upload', 400));
    }

    const uploadedFiles = req.files.map(file => formatFileResponse(file, req));

    res.status(201).json({
      success: true,
      message: `${uploadedFiles.length} file(s) uploaded successfully`,
      count: uploadedFiles.length,
      data: uploadedFiles
    });
  } catch (error) {
    next(error);
  }
}

async function uploadFolderFiles(req, res, next) {
  try {
    if (!req.files || req.files.length === 0) {
      return next(new AppError('No files provided in the folder upload', 400));
    }

    const folderName = req.query.folder || req.headers['x-folder'] || 'root';
    const uploadedFiles = req.files.map(file => formatFileResponse(file, req));

    res.status(201).json({
      success: true,
      message: `Folder uploaded successfully with ${uploadedFiles.length} file(s)`,
      folder: folderName,
      count: uploadedFiles.length,
      data: uploadedFiles
    });
  } catch (error) {
    next(error);
  }
}

async function listUploadedFiles(req, res, next) {
  try {
    const subFolder = req.query.folder ? req.query.folder.replace(/(\.\.[\/\\])+/g, '') : '';
    const targetDir = path.join(BASE_UPLOAD_DIR, subFolder);

    if (!fs.existsSync(targetDir)) {
      return res.status(200).json({
        success: true,
        folder: subFolder || '/',
        items: []
      });
    }

    const entries = fs.readdirSync(targetDir, { withFileTypes: true });
    const items = entries.map(entry => {
      const isDirectory = entry.isDirectory();
      const relative = path.relative(BASE_UPLOAD_DIR, path.join(targetDir, entry.name)).replace(/\\/g, '/');

      return {
        name: entry.name,
        type: isDirectory ? 'directory' : 'file',
        path: `/uploads/${relative}`,
        url: isDirectory ? null : `${req.protocol}://${req.get('host')}/uploads/${relative}`
      };
    });

    res.status(200).json({
      success: true,
      folder: subFolder || '/',
      count: items.length,
      items
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  uploadSingleFile,
  uploadMultipleFiles,
  uploadFolderFiles,
  listUploadedFiles
};

