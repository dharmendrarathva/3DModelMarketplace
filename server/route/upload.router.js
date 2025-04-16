import { Router } from 'express';
import auth from '../middleware/auth.js';
import uploadImageController from '../controllers/uploadImage.controller.js';
import uploadZipController from '../controllers/uploadZip.controller.js';

import upload from '../middleware/multer.js';

const uploadRouter = Router();

// Image Upload Route
uploadRouter.post("/upload/image", auth, upload.single("image"), uploadImageController);

// ZIP Upload Route
uploadRouter.post("/upload/zip", auth, upload.single("zipFile"), uploadZipController);




export default uploadRouter;    
