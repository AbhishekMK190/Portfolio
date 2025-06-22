# Contact Form Setup Guide

## Current Status
✅ **Fixed Issues:**
- Fixed the `toLowerCase()` error in App.tsx by adding a null check
- Created a working backend server for the contact form
- Set up mock mode for testing (no email credentials required)

## How to Test the Contact Form

1. **Start the backend server:**
   ```bash
   npm run server
   ```
   This will start the server on port 3001

2. **Start the frontend development server:**
   ```bash
   npm run dev
   ```
   This will start Vite on port 5173

3. **Test the contact form:**
   - Go to http://localhost:5173
   - Navigate to the Contact section
   - Fill out and submit the form
   - Check the server console for the submitted data (mock mode)

## Setting Up Real Email Functionality

To enable actual email sending, you need to:

### 1. Create a Gmail App Password
1. Go to your Google Account settings
2. Enable 2-Factor Authentication if not already enabled
3. Go to Security → App passwords
4. Generate a new app password for "Mail"
5. Copy the generated password

### 2. Set Environment Variables
Create a `.env` file in the project root:
```
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password-here
```

### 3. Restart the Server
After setting the environment variables, restart the server:
```bash
npm run server
```

## Server Features
- **CORS enabled** for cross-origin requests
- **Input validation** for all form fields
- **Error handling** with proper HTTP status codes
- **Mock mode** when email credentials are not provided
- **Real email sending** when credentials are configured

## API Endpoint
- **URL:** `http://localhost:3001/api/contact`
- **Method:** POST
- **Content-Type:** application/json
- **Body:** `{ name, email, message }`

## Troubleshooting
- If you get a 404 error, make sure the backend server is running on port 3001
- If emails aren't sending, check your Gmail app password and environment variables
- The server logs will show whether it's running in mock mode or real email mode 