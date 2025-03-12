// test-cloudinary.js
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

console.log('Environment variables:', {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY ? 'Present' : 'Missing',
  api_secret: process.env.CLOUDINARY_API_SECRET ? 'Present' : 'Missing',
});

try {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  
  console.log('Cloudinary configured successfully');
  
  // Test a simple Cloudinary API call
  cloudinary.api.ping((error, result) => {
    if (error) {
      console.error('Cloudinary API error:', error);
    } else {
      console.log('Cloudinary API success:', result);
    }
  });
} catch (error) {
  console.error('Cloudinary configuration error:', error);
}