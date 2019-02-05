const express = require('express');
const appRoute = express.Router({ strict: true });

const { FileUploadService } = require('../../app/services/');
const controller = require('../../app/controllers/core.controller');
const authMiddleware = require('../../app/middlewares/accessControl/entities/auth/main');

appRoute.post('/upload',
  authMiddleware.validateToken,
  // authMiddleware.loadUser,
  FileUploadService.getIncomingFileHandler(),
  controller.uploadFile,
);

module.exports = appRoute;
