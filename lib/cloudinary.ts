import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'

// Primary Cloudinary account (default)
const primaryCloudName = process.env.CLOUDINARY_CLOUD_NAME
const primaryApiKey = process.env.CLOUDINARY_API_KEY
const primaryApiSecret = process.env.CLOUDINARY_API_SECRET

// Secondary Cloudinary account (optional)
const secondaryCloudName = process.env.CLOUDINARY_CLOUD_NAME_2
const secondaryApiKey = process.env.CLOUDINARY_API_KEY_2
const secondaryApiSecret = process.env.CLOUDINARY_API_SECRET_2

// Validate primary account
if (!primaryCloudName || !primaryApiKey || !primaryApiSecret) {
  console.warn('⚠️ Primary Cloudinary environment variables are not set. Image uploads will fail.')
  console.warn('Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your .env file')
}

// Check if secondary account is configured
const hasSecondaryAccount = secondaryCloudName && secondaryApiKey && secondaryApiSecret

if (hasSecondaryAccount) {
  console.log('✅ Secondary Cloudinary account is configured')
} else {
  console.log('ℹ️ Secondary Cloudinary account not configured. Using primary account only.')
}

// Configure primary account as default
cloudinary.config({
  cloud_name: primaryCloudName,
  api_key: primaryApiKey,
  api_secret: primaryApiSecret,
})

export type CloudinaryAccount = 'primary' | 'secondary'

/**
 * Get Cloudinary configuration for a specific account
 */
function getCloudinaryConfig(account: CloudinaryAccount = 'primary') {
  if (account === 'secondary') {
    if (!hasSecondaryAccount) {
      throw new Error('Secondary Cloudinary account is not configured. Please set CLOUDINARY_CLOUD_NAME_2, CLOUDINARY_API_KEY_2, and CLOUDINARY_API_SECRET_2 environment variables.')
    }
    return {
      cloud_name: secondaryCloudName!,
      api_key: secondaryApiKey!,
      api_secret: secondaryApiSecret!,
    }
  }
  
  if (!primaryCloudName || !primaryApiKey || !primaryApiSecret) {
    throw new Error('Primary Cloudinary account is not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET environment variables.')
  }
  
  return {
    cloud_name: primaryCloudName,
    api_key: primaryApiKey,
    api_secret: primaryApiSecret,
  }
}

/**
 * Create a Cloudinary instance with specific account credentials
 * Note: Each API route request has its own execution context, so reconfiguring is safe
 */
function createCloudinaryInstance(account: CloudinaryAccount = 'primary') {
  const config = getCloudinaryConfig(account)
  
  // Configure for the requested account
  // In Next.js API routes, each request runs in isolation, so this is safe
  cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.api_key,
    api_secret: config.api_secret,
  })
  
  return cloudinary
}

export default cloudinary

/**
 * Upload image to Cloudinary
 * @param file - File to upload
 * @param account - Which Cloudinary account to use ('primary' or 'secondary'). Defaults to 'primary'
 * @param folder - Optional folder name. Defaults to 'products' or CLOUDINARY_FOLDER env variable
 * @returns Promise<string> - The secure URL of the uploaded image
 */
export async function uploadImageToCloudinary(
  file: File,
  account: CloudinaryAccount = 'primary',
  folder?: string
): Promise<string> {
  try {
    const config = getCloudinaryConfig(account)
    const cloudinaryInstance = createCloudinaryInstance(account)

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    return new Promise((resolve, reject) => {
      cloudinaryInstance.uploader.upload_stream(
        {
          folder: folder || process.env.CLOUDINARY_FOLDER || 'products',
          resource_type: file.type.startsWith('video/') ? 'video' : 'auto',
          quality: 'auto',
          fetch_format: 'auto',
        },
        (error, result) => {
          if (error) {
            console.error(`Cloudinary upload error (${account} account):`, error)
            reject(new Error(error.message || 'Failed to upload to Cloudinary'))
          } else {
            resolve(result!.secure_url)
          }
        }
      ).end(buffer)
    })
  } catch (error) {
    console.error(`Error uploading to Cloudinary (${account} account):`, error)
    throw error
  }
}


/**
 * Upload a non-media document (for example a CV) to Cloudinary as a raw asset.
 */
export async function uploadRawFileToCloudinary(
  file: File,
  account: CloudinaryAccount = 'primary',
  folder = 'documents'
): Promise<string> {
  try {
    const cloudinaryInstance = createCloudinaryInstance(account)
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    return await new Promise((resolve, reject) => {
      cloudinaryInstance.uploader.upload_stream(
        {
          folder,
          resource_type: 'raw',
          use_filename: true,
          unique_filename: true,
        },
        (error, result) => {
          if (error) {
            console.error(`Cloudinary raw upload error (${account} account):`, error)
            reject(new Error(error.message || 'Failed to upload document to Cloudinary'))
            return
          }
          resolve(result!.secure_url)
        }
      ).end(buffer)
    })
  } catch (error) {
    console.error(`Error uploading raw file to Cloudinary (${account} account):`, error)
    throw error
  }
}

/**
 * Delete image from Cloudinary
 * @param publicId - Public ID of the image to delete
 * @param account - Which Cloudinary account to use ('primary' or 'secondary'). Defaults to 'primary'
 */
export async function deleteImageFromCloudinary(
  publicId: string,
  account: CloudinaryAccount = 'primary'
): Promise<void> {
  try {
    const cloudinaryInstance = createCloudinaryInstance(account)
    await cloudinaryInstance.uploader.destroy(publicId)
  } catch (error) {
    console.error(`Error deleting from Cloudinary (${account} account):`, error)
    throw error
  }
}

/**
 * Check if secondary Cloudinary account is available
 */
export function hasSecondaryCloudinaryAccount(): boolean {
  return hasSecondaryAccount
}
