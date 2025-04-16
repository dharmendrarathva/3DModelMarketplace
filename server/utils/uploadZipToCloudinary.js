import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLODINARY_CLOUD_NAME,
    api_key: process.env.CLODINARY_API_KEY,
    api_secret: process.env.CLODINARY_API_SECRET_KEY
});

const uploadZipToCloudinary = async (zipFile) => {
    try {
        const buffer = zipFile?.buffer || Buffer.from(await zipFile.arrayBuffer());

        const uploadZip = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { 
                    folder: "3DMMP-ZIP", 
                    resource_type: "raw", 
                    format: "file.zip",
            
                }, 
                (error, uploadResult) => {
                    if (error) return reject(error);
                    return resolve(uploadResult);
                }
            ).end(buffer);
        });

        return uploadZip;
    } catch (error) {
        throw new Error("ZIP file upload failed: " + error.message);
    }
};

export default uploadZipToCloudinary;