# Cloudinary Setup Guide

This project supports using **two Cloudinary accounts** for image storage and management. This allows you to:
- Distribute storage across multiple accounts
- Separate different types of content (e.g., products vs. banners)
- Have backup storage options
- Manage quotas more effectively

## Environment Variables

### Primary Cloudinary Account (Required)

These are the main Cloudinary credentials that will be used by default. **Add these to your Vercel Environment Variables:**

```
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

**Note**: Do not commit these credentials to your code. Always use environment variables in Vercel.

### Secondary Cloudinary Account (Optional)

If you want to use a second Cloudinary account, add these variables:

```
CLOUDINARY_CLOUD_NAME_2=your-secondary-cloud-name
CLOUDINARY_API_KEY_2=your-secondary-api-key
CLOUDINARY_API_SECRET_2=your-secondary-api-secret
```

### Optional Configuration

```
CLOUDINARY_FOLDER=products  # Default folder for uploads (optional)
```

## Setting Up in Vercel

### Step 1: Access Your Vercel Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project (SRKBOLT)
3. Navigate to **Settings** → **Environment Variables**

### Step 2: Add Primary Cloudinary Variables

Click **Add New** and add each variable:

1. **Name**: `CLOUDINARY_CLOUD_NAME`
   - **Value**: Your Cloudinary cloud name
   - **Environment**: Production, Preview, Development (select all)

2. **Name**: `CLOUDINARY_API_KEY`
   - **Value**: Your Cloudinary API key
   - **Environment**: Production, Preview, Development (select all)

3. **Name**: `CLOUDINARY_API_SECRET`
   - **Value**: Your Cloudinary API secret
   - **Environment**: Production, Preview, Development (select all)

**Note**: Your Cloudinary account should be configured with **Dynamic Folders** to organize uploads into different folders dynamically.

### Step 3: Add Secondary Cloudinary Variables (Optional)

If you want to use a second account, repeat the process:

1. **Name**: `CLOUDINARY_CLOUD_NAME_2`
   - **Value**: Your secondary Cloudinary cloud name
   - **Environment**: Production, Preview, Development (select all)

2. **Name**: `CLOUDINARY_API_KEY_2`
   - **Value**: Your secondary Cloudinary API key
   - **Environment**: Production, Preview, Development (select all)

3. **Name**: `CLOUDINARY_API_SECRET_2`
   - **Value**: Your secondary Cloudinary API secret
   - **Environment**: Production, Preview, Development (select all)

### Step 4: Add Optional Folder Variable (Optional)

1. **Name**: `CLOUDINARY_FOLDER`
   - **Value**: `products` (or your preferred folder name)
   - **Environment**: Production, Preview, Development (select all)

### Step 5: Redeploy

After adding the environment variables:

1. Go to **Deployments** tab
2. Click the **⋯** (three dots) on the latest deployment
3. Select **Redeploy**
4. Or push a new commit to trigger a redeploy

## How to Use Different Accounts

### In Code

When uploading images, you can specify which account to use:

```typescript
import { uploadImageToCloudinary } from '@/lib/cloudinary'

// Use primary account (default)
const imageUrl = await uploadImageToCloudinary(file)

// Use secondary account
const imageUrl = await uploadImageToCloudinary(file, 'secondary')

// Use secondary account with custom folder
const imageUrl = await uploadImageToCloudinary(file, 'secondary', 'banners')
```

### Via API

When calling the `/api/upload` endpoint, you can pass the account in the form data:

```javascript
const formData = new FormData()
formData.append('file', file)
formData.append('account', 'secondary') // or 'primary'
formData.append('folder', 'banners') // optional

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData
})
```

## Getting Cloudinary Credentials

1. Go to [Cloudinary Dashboard](https://cloudinary.com/console)
2. Sign in to your account
3. Go to **Settings** → **Product Environment Settings**
4. Copy the following values:
   - **Cloud name** → `CLOUDINARY_CLOUD_NAME`
   - **API Key** → `CLOUDINARY_API_KEY`
   - **API Secret** → `CLOUDINARY_API_SECRET`

Repeat for your second account if you have one.

## Verification

After setting up, check your deployment logs in Vercel. You should see:

- `✅ Secondary Cloudinary account is configured` (if secondary account is set)
- `ℹ️ Secondary Cloudinary account not configured. Using primary account only.` (if only primary is set)

## Troubleshooting

### "Cloudinary is not configured" Error

- Make sure all three primary variables are set (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`)
- Verify the values are correct (no extra spaces)
- Redeploy after adding variables

### Secondary Account Not Working

- Check that all three secondary variables are set (with `_2` suffix)
- Verify the account credentials are correct
- Check deployment logs for error messages

### Images Not Uploading

- Check file size limits (5MB for images, 10MB for videos)
- Verify file types are allowed (JPEG, PNG, WebP, GIF, MP4, etc.)
- Check Cloudinary account quotas and limits
- Review Vercel function logs for detailed error messages

## Best Practices

1. **Use Primary for Main Content**: Use the primary account for most uploads (products, banners, etc.)
2. **Use Secondary for Specific Content**: Use secondary for backups, specific content types, or when primary quota is reached
3. **Organize with Folders**: Use the `folder` parameter to organize images by type (products, banners, contacts, etc.)
4. **Monitor Usage**: Regularly check Cloudinary dashboard for storage and bandwidth usage
5. **Keep Secrets Secure**: Never commit `.env` files or expose API secrets in client-side code

