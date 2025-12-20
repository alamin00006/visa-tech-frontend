# 🚀 Quick Deployment Guide for Apollo Visa Tech

## Fastest Way to Deploy to cPanel (3 Steps)

### Step 1: Build the Application
Double-click `build-for-cpanel.bat` or run:
```bash
npm run build
```

This creates a `dist` folder with all production files.

### Step 2: Upload to cPanel
1. Login to your cPanel
2. Open **File Manager**
3. Go to `public_html` folder
4. Upload the file: `apollo-visa-tech-deploy.zip` (created by the build script)
5. Right-click and **Extract** the ZIP file
6. Delete the ZIP file after extraction

### Step 3: Access Your Site
Visit: `https://yourdomain.com`

**That's it! Your site is live! 🎉**

---

## What Gets Deployed?

The `dist` folder contains:
- ✅ Optimized HTML, CSS, JavaScript
- ✅ All images and assets
- ✅ Minified and compressed files
- ✅ Production-ready code

The `.htaccess` file provides:
- ✅ React Router support (no 404 on refresh)
- ✅ GZIP compression
- ✅ Browser caching
- ✅ Security headers

---

## File Structure After Deployment

```
public_html/
├── index.html              (Main HTML file)
├── .htaccess              (Server configuration)
└── assets/
    ├── index-[hash].js    (JavaScript bundle)
    ├── index-[hash].css   (Styles)
    └── [other assets]
```

---

## Important URLs

- **Live Site**: https://yourdomain.com
- **Admin Access**: Click the lock icon 20 times, enter PIN: `4343`
- **Contact Number**: 01300172795

---

## Testing Your Deployment

After deployment, test these features:

### Basic Navigation
- [ ] Home page loads
- [ ] About page works
- [ ] Navigation menu functions

### User Features
- [ ] Client registration
- [ ] Agency registration  
- [ ] Login system
- [ ] CGI Portal form submission
- [ ] User profile display

### Admin Features
- [ ] Admin access (20 clicks + PIN 4343)
- [ ] Dashboard displays
- [ ] User management
- [ ] Appointment CRUD operations
- [ ] CSV export

### Other Features
- [ ] Chat widget works
- [ ] Language toggle (EN/BN)
- [ ] Mobile responsive
- [ ] LocalStorage persists data

---

## Troubleshooting

### Problem: Blank page after deployment
**Solution**: 
- Check browser console (F12) for errors
- Verify all files uploaded correctly
- Ensure .htaccess is in the same folder as index.html

### Problem: 404 error when refreshing pages
**Solution**:
- Make sure .htaccess file is uploaded
- Check if mod_rewrite is enabled (contact hosting support)

### Problem: Styles not loading
**Solution**:
- Clear browser cache (Ctrl + Shift + Delete)
- Check if assets folder uploaded correctly
- Verify file permissions (644 for files, 755 for folders)

---

## Advanced Deployment Options

For more deployment methods and detailed instructions, see:
- **CPANEL_DEPLOYMENT_GUIDE.md** - Complete deployment guide
- **DEPLOYMENT_CHECKLIST.md** - Step-by-step checklist

---

## Need Help?

1. Check the deployment guides in this folder
2. Review cPanel error logs
3. Contact your hosting provider
4. Check browser console for JavaScript errors

---

## Production Optimization Tips

### Enable SSL (HTTPS)
1. In cPanel, go to "SSL/TLS Status"
2. Enable AutoSSL for your domain
3. Uncomment HTTPS redirect in .htaccess

### Setup Cloudflare (Free CDN)
1. Create account at cloudflare.com
2. Add your domain
3. Update nameservers
4. Enable caching

### Monitor Performance
- Use Google PageSpeed Insights
- Enable cPanel metrics
- Monitor error logs regularly

---

## Version Information

- **Application**: Apollo Visa Tech v1.0.0
- **Framework**: React 19.2.3
- **Build Tool**: Vite 6.2.0
- **Deployment Type**: Static Site (SPA)

---

## Support

For technical support:
- **Phone**: 01300172795
- **Documentation**: See CPANEL_DEPLOYMENT_GUIDE.md

---

**Happy Deploying! 🚀**
