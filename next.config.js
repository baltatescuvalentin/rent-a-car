/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
          'res.cloudinary.com', 
          'avatars.githubusercontent.com',
          'lh3.googleusercontent.com'
        ]
      },
    env: {
      CLOUDINARY_CLOUD_NAME_CLIENT: process.env.CLOUDINARY_CLOUD_NAME_CLIENT,
      CLOUDINARY_UPLOAD_PRESET_CLIENT: process.env.CLOUDINARY_UPLOAD_PRESET_CLIENT,
    }
}

module.exports = nextConfig
