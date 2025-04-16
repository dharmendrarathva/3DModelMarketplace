import multer from "multer";

// Use memoryStorage for fast processing
const storage = multer.memoryStorage();

// Allowed file types
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["application/zip", "application/x-zip-compressed", "application/octet-stream", "application/x-tar"];

    if (file.mimetype.startsWith("image/") || allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only images and ZIP files are allowed."), false);
    }
};

// File size limit (50MB max)
const upload = multer({ 
    storage, 
    fileFilter,
    limits: { fileSize: 50 * 1024 * 1024 }  // 50MB limit
});

export default upload;
