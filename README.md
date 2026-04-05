# file-drop

Minimal file hosting app. Upload files from the browser, store them in S3, and share download links — no login required.

Built with Node.js + Express on the backend and a plain HTML/CSS/JS frontend.

## Stack

- **Backend:** Node.js, Express, Multer
- **Storage:** AWS S3 (`@aws-sdk/client-s3`)
- **Frontend:** Vanilla HTML/CSS/JS (no framework)

## Setup

**1. Clone and install**

```bash
git clone https://github.com/YOUR_USER/file-drop.git
cd file-drop
npm install
```

**2. Configure environment variables**

Create a `.env` file in the root:

```env
PORT=3000
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
S3_BUCKET_NAME=your_bucket_name
```

**3. Run**

```bash
node src/app.js
```

Open `http://localhost:3000` in your browser.

## Features

- Drag & drop or click to select files
- Upload directly to S3
- List all uploaded files with size and date
- Download any file

## Notes

- Make sure your S3 bucket exists and your IAM credentials have `s3:PutObject`, `s3:GetObject`, and `s3:ListBucket` permissions.
- `.env` is gitignored — never commit credentials.
