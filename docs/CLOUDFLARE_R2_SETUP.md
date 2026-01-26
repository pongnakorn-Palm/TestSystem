# Cloudflare R2 Setup Guide

This guide explains how to configure Cloudflare R2 storage for the Bank Passbook Image Upload feature.

## Required Environment Variables

Add these variables to your `backend/.env` file:

```bash
# Cloudflare R2 Configuration
R2_ACCOUNT_ID=your_cloudflare_account_id
R2_ACCESS_KEY_ID=your_r2_access_key_id
R2_SECRET_ACCESS_KEY=your_r2_secret_access_key
R2_BUCKET_NAME=aiya-affiliate-passbooks
R2_PUBLIC_URL=https://pub-xxxxx.r2.dev
```

## Setup Steps

### 1. Create Cloudflare R2 Bucket

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **R2** from the sidebar
3. Click **Create bucket**
4. Name your bucket: `aiya-affiliate-passbooks`
5. Choose your preferred location
6. Click **Create bucket**

### 2. Enable Public Access (Optional)

If you want direct public URLs:

1. Go to your bucket settings
2. Navigate to **Settings** → **Public access**
3. Click **Connect Domain** or **Enable R2.dev subdomain**
4. Copy the public URL (e.g., `https://pub-xxxxx.r2.dev`)
5. Use this URL for the `R2_PUBLIC_URL` environment variable

### 3. Create API Token

1. In R2 dashboard, click **Manage R2 API Tokens**
2. Click **Create API token**
3. Configure permissions:
   - **Token name**: AIYA Affiliate Backend
   - **Permissions**: Object Read & Write
   - **Bucket**: Select your bucket (`aiya-affiliate-passbooks`)
4. Click **Create API Token**
5. **IMPORTANT**: Copy the credentials immediately:
   - Access Key ID → `R2_ACCESS_KEY_ID`
   - Secret Access Key → `R2_SECRET_ACCESS_KEY`

### 4. Find Your Account ID

1. In Cloudflare Dashboard, go to **R2**
2. Look at the top right corner for your **Account ID**
3. Copy this value → `R2_ACCOUNT_ID`

## Example Configuration

```bash
# Example .env configuration
R2_ACCOUNT_ID=a1b2c3d4e5f6g7h8i9j0
R2_ACCESS_KEY_ID=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
R2_SECRET_ACCESS_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
R2_BUCKET_NAME=aiya-affiliate-passbooks
R2_PUBLIC_URL=https://pub-12345abcdef.r2.dev
```

## Testing

After configuration:

1. Install dependencies:
   ```bash
   cd backend
   bun install
   ```

2. Start the backend server:
   ```bash
   bun run dev
   ```

3. Test the upload feature from the Partner Portal Profile tab

## File Storage Structure

Uploaded files will be stored with this naming pattern:
```
passbooks/{uuid}-{timestamp}.{extension}
```

Example:
```
passbooks/a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6-1706184532145.jpg
```

## Security Notes

- ⚠️ Never commit `.env` file to Git
- ✅ Keep your API tokens secure
- ✅ Restrict API token permissions to specific buckets
- ✅ Regularly rotate API tokens
- ✅ Backend validates file types (only images allowed)
- ✅ Backend validates file size (max 2MB)

## Troubleshooting

### "R2 storage is not configured" error

- Check that all R2 environment variables are set correctly
- Restart the backend server after updating `.env`
- Verify your Account ID is correct

### "Invalid file type" error

- Only JPEG, PNG, and WebP images are allowed
- Check the file extension and MIME type

### "File upload failed" error

- Verify API token has Write permissions
- Check bucket name is correct
- Ensure the bucket exists in your R2 account

## Cost

Cloudflare R2 Storage pricing:
- **Free tier**: 10 GB/month storage, 1 million Class A operations/month
- Storage: $0.015/GB/month beyond free tier
- No egress fees (free bandwidth)

For this application with typical usage, costs should stay within the free tier.
