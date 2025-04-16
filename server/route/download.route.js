import express from 'express';
import { v2 as cloudinary } from 'cloudinary';

const downloadRouter = express.Router();


downloadRouter.get('/generate-signed-url/:publicId', async (req, res) => {
    try {
        const { publicId } = req.params;

        
        const signedUrl = cloudinary.url(publicId, {
            resource_type: 'raw',  
            sign_url: true,
            type: 'authenticated', 
            expires_at: Math.floor(Date.now() / 1000) + 600 // 10 minutes validity
        });

        res.json({ success: true, url: signedUrl });
    } catch (error) {
        console.error('Error generating signed URL:', error);
        res.status(500).json({ success: false, message: 'Failed to generate signed URL' });
    }
});

export default downloadRouter;
