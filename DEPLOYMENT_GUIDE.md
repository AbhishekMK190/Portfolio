# Portfolio Deployment Guide

## Overview
This guide will help you deploy your portfolio with a working contact form using:
- **Frontend**: Vercel (React/Vite app)
- **Backend**: Railway (Express.js server)

## Prerequisites
- GitHub account
- Vercel account (free)
- Railway account (free tier available)

## Step 1: Prepare Your Repository

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

## Step 2: Deploy Backend to Railway

1. **Go to [Railway.app](https://railway.app)** and sign in with GitHub

2. **Create a new project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your portfolio repository

3. **Configure the deployment**:
   - Railway will automatically detect it's a Node.js project
   - Set the root directory to `/` (root of your repo)

4. **Add environment variables**:
   - Go to your project settings
   - Add these variables:
     ```
     EMAIL_USER=abkalghatgi1@gmail.com
     EMAIL_PASS=yzwl mpew dlpx pnxt
     NODE_ENV=production
     ```

5. **Deploy**:
   - Railway will automatically build and deploy your server
   - Note the generated URL (e.g., `https://your-app-name.railway.app`)

## Step 3: Deploy Frontend to Vercel

1. **Go to [Vercel.com](https://vercel.com)** and sign in with GitHub

2. **Import your repository**:
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect it's a Vite project

3. **Configure the deployment**:
   - **Framework Preset**: Vite
   - **Root Directory**: `/` (leave empty)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. **Add environment variables**:
   - Go to Project Settings → Environment Variables
   - Add:
     ```
     VITE_API_URL=https://your-railway-app-url.railway.app
     ```
   - Replace with your actual Railway URL

5. **Deploy**:
   - Click "Deploy"
   - Vercel will build and deploy your frontend

## Step 4: Test Your Deployment

1. **Test the contact form**:
   - Go to your Vercel URL
   - Navigate to the Contact section
   - Fill out and submit the form
   - Check your email for the message

2. **Verify backend health**:
   - Visit `https://your-railway-url.railway.app/api/health`
   - Should return `{"status":"OK"}`

## Step 5: Custom Domain (Optional)

### For Vercel (Frontend):
1. Go to your Vercel project settings
2. Add your custom domain
3. Update your Railway environment variable with the new domain

### For Railway (Backend):
1. Go to your Railway project settings
2. Add a custom domain
3. Update your Vercel environment variable with the new backend URL

## Troubleshooting

### Common Issues:

1. **CORS Errors**:
   - Make sure `VITE_API_URL` in Vercel matches your Railway URL
   - Check that Railway environment variables are set correctly

2. **Email Not Sending**:
   - Verify `EMAIL_USER` and `EMAIL_PASS` are set in Railway
   - Check Railway logs for error messages
   - Ensure Gmail app password is correct

3. **Build Failures**:
   - Check that all dependencies are in `package.json`
   - Verify Node.js version compatibility

### Checking Logs:

- **Vercel**: Go to your project → Functions → View Function Logs
- **Railway**: Go to your project → Deployments → View Logs

## Environment Variables Summary

### Railway (Backend):
```
EMAIL_USER=abkalghatgi1@gmail.com
EMAIL_PASS=yzwl mpew dlpx pnxt
NODE_ENV=production
```

### Vercel (Frontend):
```
VITE_API_URL=https://your-railway-app-url.railway.app
```

## Cost
- **Vercel**: Free tier includes unlimited deployments
- **Railway**: Free tier includes $5 credit monthly (usually sufficient for small projects)

## Alternative Deployment Options

If you prefer other platforms:

1. **Netlify + Railway**: Similar to Vercel + Railway
2. **Heroku**: Can host both frontend and backend (paid)
3. **DigitalOcean App Platform**: Can host both (paid)
4. **AWS/GCP/Azure**: More complex but more control

## Security Notes

- Never commit `.env` files to Git
- Use environment variables for all sensitive data
- Consider rate limiting for the contact form in production
- Monitor your Railway usage to stay within free tier limits 