# Quick Vercel Environment Variables Setup

## Primary Cloudinary Account (Add these to Vercel)

Go to your Vercel project → Settings → Environment Variables and add:

| Variable Name | Value | Environments |
|--------------|-------|--------------|
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name | Production, Preview, Development |
| `CLOUDINARY_API_KEY` | Your Cloudinary API key | Production, Preview, Development |
| `CLOUDINARY_API_SECRET` | Your Cloudinary API secret | Production, Preview, Development |

**Important**: Replace the placeholder values above with your actual Cloudinary credentials. Never commit these to your code repository.


## MongoDB & Admin Variables (Required)

Add these alongside the Cloudinary variables:

| Variable Name | Value | Environments |
|--------------|-------|--------------|
| `MONGODB_URI` | Your MongoDB connection string | Production, Preview, Development |
| `MONGODB_DB_NAME` | Your SRK Bolt database name | Production, Preview, Development |
| `ADMIN_USERNAME` | Private admin username | Production, Preview, Development |
| `ADMIN_PASSWORD` | Strong private admin password | Production, Preview, Development |
| `ADMIN_SESSION_TOKEN` | Long random secret (32+ random bytes recommended) | Production, Preview, Development |

The admin credentials are no longer hard-coded in the website. Admin authentication now uses an HTTP-only session cookie.

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


## Email Notifications (Recommended)

Add these if RFQ and datasheet submissions should also be emailed. The admin dashboard will still receive MongoDB records without them.

| Variable Name | Example / Purpose |
|--------------|-------------------|
| `SMTP_HOST` | SMTP server hostname |
| `SMTP_PORT` | `587` (or your provider's port) |
| `SMTP_USER` | SMTP login |
| `SMTP_PASSWORD` | SMTP password / app password |
| `EMAIL_FROM` | Verified sender address |
| `EMAIL_TO` | `sales@srkbolt.com` or the inbox that should receive website leads |
