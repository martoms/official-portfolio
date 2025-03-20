import cloudinary from 'cloudinary'

const config = useRuntimeConfig()

cloudinary.v2.config({
  cloud_name: config.cloudinaryCloudName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret
})

export default cloudinary.v2
