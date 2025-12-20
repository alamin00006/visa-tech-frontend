# Apollo Visa Tech - cPanel Deployment Guide

## Prerequisites
- cPanel hosting account with Node.js support
- SSH access (optional but recommended)
- File Manager or FTP access

## Method 1: Deploy Pre-built Static Files (Recommended for cPanel)

### Step 1: Build the Application Locally

On your local machine, run:
```bash
npm run build
```

This creates a `dist` folder with optimized production files.

### Step 2: Upload to cPanel

1. **Login to cPanel**
2. **Navigate to File Manager**
3. **Go to public_html** (or your domain's root directory)
4. **Create a new folder** (e.g., `apollo-visa-tech`) or use the root
5. **Upload all files from the `dist` folder**:
   - index.html
   - assets/ folder (contains JS, CSS files)
   - Any other generated files

### Step 3: Configure .htaccess for React Router

Create a `.htaccess` file in the same directory:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>

# Enable GZIP compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/javascript "access plus 1 month"
  ExpiresByType application/pdf "access plus 1 month"
  ExpiresByType text/html "access plus 0 seconds"
</IfModule>
```

### Step 4: Access Your Application

Visit: `https://yourdomain.com/apollo-visa-tech` (or your configured path)

---

## Method 2: Deploy with Node.js App (If cPanel supports Node.js)

### Step 1: Setup Node.js Application in cPanel

1. **Login to cPanel**
2. **Find "Setup Node.js App"** (in Software section)
3. **Create Application**:
   - Node.js version: 18.x or higher
   - Application mode: Production
   - Application root: `/home/username/apollo-visa-tech`
   - Application URL: `yourdomain.com` or subdomain
   - Application startup file: Leave empty (we'll use package.json)

### Step 2: Upload Project Files via FTP/File Manager

Upload these files to the application root:
```
/home/username/apollo-visa-tech/
├── package.json
├── package-lock.json
├── vite.config.ts
├── tsconfig.json
├── index.html
├── index.tsx
├── App.tsx
├── constants.ts
├── db.ts
├── types.ts
└── .env.local (if needed)
```

### Step 3: Install Dependencies via SSH

```bash
cd /home/username/apollo-visa-tech
npm install
```

### Step 4: Build the Application

```bash
npm run build
```

### Step 5: Configure for Production

Create a simple server file `server.js`:

```javascript
const express = require('express');
const path = require('path');
const app = express();

// Serve static files from dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

Install Express:
```bash
npm install express
```

Update `package.json` to add start script:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "start": "node server.js"
  }
}
```

### Step 6: Start the Application

In cPanel Node.js App interface:
- Set Application startup file: `server.js`
- Click "Start App"

---

## Method 3: Quick Deploy via File Manager (Simplest)

### Step 1: Build Locally
```bash
npm run build
```

### Step 2: Compress dist folder
Create a ZIP file of the `dist` folder contents.

### Step 3: Upload & Extract
1. Login to cPanel File Manager
2. Navigate to `public_html`
3. Upload the ZIP file
4. Extract it
5. Move all files from `dist` folder to `public_html` (or subdirectory)

### Step 4: Add .htaccess
Create `.htaccess` file with the content from Method 1, Step 3.

---

## Important Notes

### 1. Environment Variables
If you have API keys in `.env.local`, they will be bundled during build. For production:
- Never commit `.env.local` to Git
- Set environment variables in cPanel if using Node.js method
- For static deployment, ensure no sensitive keys are exposed

### 2. Database Consideration
This app uses LocalStorage (client-side). For production:
- Consider migrating to a real database (MySQL, MongoDB)
- Update `db.ts` to use API calls instead of LocalStorage
- Set up backend API endpoints

### 3. SSL Certificate
- Enable SSL in cPanel (Let's Encrypt is free)
- Force HTTPS in .htaccess:
```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

### 4. Performance Optimization
- Enable Cloudflare (free CDN)
- Optimize images before upload
- Enable cPanel's built-in caching

---

## Troubleshooting

### Issue: Blank page after deployment
**Solution**: Check browser console for errors. Usually path issues.
- Verify all files uploaded correctly
- Check .htaccess configuration
- Ensure base path in vite.config.ts matches deployment path

### Issue: 404 on page refresh
**Solution**: .htaccess not configured properly
- Add the rewrite rules from Method 1, Step 3

### Issue: CSS/JS not loading
**Solution**: Path configuration
- Check if assets are in correct folder
- Verify vite.config.ts base path

---

## Recommended Deployment Steps (Easiest)

1. **Build locally**: `npm run build`
2. **Compress dist folder**: Create `dist.zip`
3. **Upload to cPanel**: File Manager → public_html
4. **Extract files**: Extract dist.zip
5. **Create .htaccess**: Add rewrite rules
6. **Test**: Visit your domain

Your application should now be live!

---

## Post-Deployment Checklist

- [ ] Test all pages (Home, About, Registration, Login, CGI Portal, Admin)
- [ ] Test user registration and login
- [ ] Test CGI form submission
- [ ] Test admin access (20 clicks + PIN 4343)
- [ ] Test chat widget
- [ ] Test language toggle (EN/BN)
- [ ] Test on mobile devices
- [ ] Verify SSL certificate
- [ ] Check browser console for errors
- [ ] Test LocalStorage persistence

---

## Support

For issues:
1. Check cPanel error logs
2. Check browser console
3. Verify file permissions (755 for folders, 644 for files)
4. Contact your hosting provider for Node.js support

Good luck with your deployment! 🚀
