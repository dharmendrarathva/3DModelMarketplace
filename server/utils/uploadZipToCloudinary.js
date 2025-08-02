import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLODINARY_CLOUD_NAME,
    api_key: process.env.CLODINARY_API_KEY,
    api_secret: process.env.CLODINARY_API_SECRET_KEY
});

// const uploadZipToCloudinary = async (zipFile) => {
//     try {
//         const buffer = zipFile?.buffer || Buffer.from(await zipFile.arrayBuffer());

//         const uploadZip = await new Promise((resolve, reject) => {
//             cloudinary.uploader.upload_stream(
//                 // { 
//                 //     folder: "3DMMP-ZIP", 
//                 //     resource_type: "raw", 
//                 //     format: "file.zip",
            
//                 // }, 
//                  {
//     folder: "3DMMP-ZIP",
//     resource_type: "raw",
//     type: "upload", // ✅ This makes it public
//     format: "zip",
//   },
//                 (error, uploadResult) => {
//                     if (error) return reject(error);
//                     return resolve(uploadResult);
//                 }
//             ).end(buffer);
//         });

//         return uploadZip;
//     } catch (error) {
//         throw new Error("ZIP file upload failed: " + error.message);
//     }
// };
const uploadZipToCloudinary = async (zipFile) => {
  try {
    const buffer = zipFile?.buffer || Buffer.from(await zipFile.arrayBuffer());

    const uploadZip = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "3DMMP-ZIP",
          resource_type: "raw",
          format: "zip",
          type: "upload", // ✅ make it public
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



// mport { v2 as cloudinary } from "cloudinary";

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Upload file to Cloudinary
// export const uploadToCloudinary = async (file: any) => {
//   try {
//     const result = await cloudinary.uploader.upload(file, {
//       resource_type: "auto",
//       folder: "3d-marketplace",
//     });
//     return {
//       url: result.secure_url,
//       publicId: result.public_id,
//     };
//   } catch (error) {
//     console.error("Cloudinary upload error:", error);
//     throw new Error("Failed to upload file to Cloudinary");
//   }
// };

// // Delete file from Cloudinary
// export const deleteFromCloudinary = async (publicId: string) => {
//   try {
//     const result = await cloudinary.uploader.destroy(publicId);
//     return result;
//   } catch (error) {
//     console.error("Cloudinary delete error:", error);
//     throw new Error("Failed to delete file from Cloudinary");
//   }
// };
