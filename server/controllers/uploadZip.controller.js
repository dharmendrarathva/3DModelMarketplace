    import uploadZipToCloudinary from "../utils/uploadZipToCloudinary.js";
    import ProductModel from "../models/product.model.js";

    const uploadZipController = async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({
                    message: "No ZIP file uploaded",
                    error: true,
                    success: false
                });
            }

         
            const uploadedZip = await uploadZipToCloudinary(req.file);

            if (!uploadedZip?.secure_url) {
                return res.status(500).json({
                    message: "ZIP file upload to Cloudinary failed",
                    error: true,
                    success: false
                });
            }

            
            const { productId } = req.body;

            if (!productId) {
                return res.json({
                    message: "ZIP uploaded successfully but not linked to any product",
                    data: uploadedZip,
                    success: true,
                    error: false
                });
            }

            const updatedProduct = await ProductModel.findByIdAndUpdate(
                productId,
                {
                    $set: {
                        zipFile: {
                            filename: req.file.originalname || "Unknown.zip",
                            fileUrl: uploadedZip.secure_url,
                            publicId: uploadedZip.public_id
                        }
                    }
                },
                { new: true, runValidators: true }
            );

            if (!updatedProduct) {
                return res.status(404).json({
                    message: "Product not found",
                    error: true,
                    success: false
                });
            }

            return res.json({
                message: "ZIP uploaded and linked to product successfully",
                data: updatedProduct,
                success: true,
                error: false
            });

        } catch (error) {
            return res.status(500).json({
                message: error.message || "Internal Server Error",
                error: true,
                success: false
            });
        }
    };

    export default uploadZipController;
