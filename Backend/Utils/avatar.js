const cloudinary = require('cloudinary').v2;
const stream = require('stream');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function avatarUpload(imageBuffer, publicId) {
    try {
      // Delete the existing image with the same public ID
      await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
  
      return new Promise((resolve, reject) => {
        // Upload the new image
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            public_id: publicId,
            overwrite: true,
            resource_type: 'image',
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result.secure_url); 
            }
          }
        );
  
        const bufferStream = new stream.Readable();
        bufferStream.push(imageBuffer);
        bufferStream.push(null);
  
        bufferStream.pipe(uploadStream);
      });
    } catch (error) {
      console.error('Error in avatarUpload:', error);
      throw error;
    }
  }
  
  module.exports = { avatarUpload };
  