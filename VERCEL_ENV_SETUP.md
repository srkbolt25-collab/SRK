# Quick Vercel Environment Variables Setup

## Primary Cloudinary Account (Add these to Vercel)

Go to your Vercel project → Settings → Environment Variables and add:

| Variable Name | Value | Environments |
|--------------|-------|--------------|
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name | Production, Preview, Development |
| `CLOUDINARY_API_KEY` | Your Cloudinary API key | Production, Preview, Development |
| `CLOUDINARY_API_SECRET` | Your Cloudinary API secret | Production, Preview, Development |

**Important**: Replace the placeholder values above with your actual Cloudinary credentials. Never commit these to your code repository.

## Optional Variables

| Variable Name | Value | Description |
|--------------|-------|-------------|
| `CLOUDINARY_FOLDER` | `products` | Default folder for uploads (optional) |

## Secondary Account (Optional - Add later if needed)

If you want to add a second Cloudinary account later:

| Variable Name | Value | Environments |
|--------------|-------|--------------|
| `CLOUDINARY_CLOUD_NAME_2` | `your-secondary-cloud-name` | Production, Preview, Development |
| `CLOUDINARY_API_KEY_2` | `your-secondary-api-key` | Production, Preview, Development |
| `CLOUDINARY_API_SECRET_2` | `your-secondary-api-secret` | Production, Preview, Development |

## After Adding Variables

1. Go to **Deployments** tab
2. Click **⋯** (three dots) on the latest deployment
3. Select **Redeploy**
4. Or push a new commit to trigger automatic redeploy

## Local Development Setup

For local development, create a `.env.local` file in the `Bolt` directory:

```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLOUDINARY_FOLDER=products
```

**Note**: 
- `.env.local` is already in `.gitignore` and will not be committed to git.
- Replace the placeholder values with your actual Cloudinary credentials.
- Never commit `.env.local` or any `.env` files to your repository.

