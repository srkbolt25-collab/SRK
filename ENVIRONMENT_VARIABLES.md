# Environment Variables for Deployment

This document lists all the environment variables required to deploy and run this Next.js application.

## Required Environment Variables

### MongoDB Database
These are **required** for database connectivity:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB_NAME=your_database_name
```

**How to get:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster or use an existing one
3. Go to Database Access → Add Database User
4. Go to Network Access → Add IP Address (or use 0.0.0.0/0 for all IPs)
5. Go to Database → Connect → Connect your application
6. Copy the connection string and replace `<password>` with your password
7. Use the database name you want to use

### Cloudinary (Image Upload)
These are **required** for image uploads:

```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_FOLDER=products
```

**How to get:**
1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up or log in
3. Go to Dashboard
4. Copy your Cloud Name, API Key, and API Secret
5. `CLOUDINARY_FOLDER` is optional - it defaults to 'products' if not set

## Deployment Instructions

### For Vercel Deployment:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable:
   - Click **Add New**
   - Enter the variable name (e.g., `MONGODB_URI`)
   - Enter the value
   - Select environment (Production, Preview, Development)
   - Click **Save**
4. After adding all variables, redeploy your application

### For Other Platforms:

Set these environment variables in your hosting platform's environment variable configuration section.

## Example .env.local file (for local development)

Create a `.env.local` file in the root directory:

```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB_NAME=your_database_name

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_FOLDER=products
```

**Note:** Never commit `.env.local` to git - it's already in `.gitignore`

## Security Notes

- Never commit environment variables to version control
- Use different values for development, staging, and production
- Rotate secrets regularly
- Use strong passwords for MongoDB
- Restrict MongoDB network access to only necessary IPs


### Admin Authentication
These are required for the SRK Bolt admin portal. Use strong, unique values and never expose them in client-side code.

```env
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=use_a_long_unique_password
ADMIN_SESSION_TOKEN=use_a_long_random_session_secret
```

`ADMIN_SESSION_TOKEN` should be a long random value (for example, 32+ random bytes represented as a secret string). The admin session is stored in an HTTP-only cookie and expires after 24 hours.

### Email Notifications (Recommended)
RFQ and datasheet requests are always stored in MongoDB and visible in the admin dashboard. To also send email notifications, configure:

```env
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_username
SMTP_PASSWORD=your_smtp_password
EMAIL_FROM=website@yourdomain.com
EMAIL_TO=sales@srkbolt.com
```

If these values are not configured, website submissions still save to MongoDB; only email notifications are disabled.
