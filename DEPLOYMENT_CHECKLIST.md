# 🚀 Apollo Visa Tech - Quick Deployment Checklist

## Pre-Deployment (On Your Local Machine)

### 1. Build the Production Version
```bash
npm run build
```
✅ This creates a `dist` folder with optimized files

### 2. Test the Build Locally
```bash
npm run preview
```
✅ Verify everything works at http://localhost:4173

### 3. Prepare Files for Upload
Create a ZIP file containing:
- [ ] All files from `dist` folder
- [ ] `.htaccess` file (for Apache servers)
- [ ] `server.js` (if using Node.js on cPanel)

---

## cPanel Deployment (Choose One Method)

### 🎯 METHOD A: Static File Deployment (EASIEST - Recommended)

#### Step 1: Access cPanel
- [ ] Login to your cPanel account
- [ ] Open File Manager

#### Step 2: Navigate to Deployment Location
- [ ] Go to `public_html` folder
- [ ] Create subfolder (optional): `apollo-visa-tech`

#### Step 3: Upload Files
- [ ] Click "Upload" button
- [ ] Upload the ZIP file containing `dist` folder contents
- [ ] Extract the ZIP file
- [ ] Move all files from extracted folder to your target directory

#### Step 4: Configure .htaccess
- [ ] Upload the `.htaccess` file to the same directory
- [ ] Verify file permissions: 644

#### Step 5: Test Your Site
- [ ] Visit: `https://yourdomain.com/apollo-visa-tech`
- [ ] Test all pages and features
- [ ] Check browser console for errors

---

### 🎯 METHOD B: Node.js Deployment (If cPanel Supports Node.js)

#### Step 1: Setup Node.js App in cPanel
- [ ] Find "Setup Node.js App" in cPanel
- [ ] Click "Create Application"
- [ ] Configure:
  - Node.js version: 18.x or higher
  - Application mode: Production
  - Application root: `/home/username/apollo-visa-tech`
  - Application URL: Your domain/subdomain

#### Step 2: Upload Project Files
Upload via FTP or File Manager:
- [ ] package.json
- [ ] package-lock.json
- [ ] server.js
- [ ] vite.config.ts
- [ ] tsconfig.json
- [ ] All source files (.tsx, .ts)
- [ ] index.html

#### Step 3: Install Dependencies (via SSH or cPanel Terminal)
```bash
cd /home/username/apollo-visa-tech
npm install
npm install express compression
```

#### Step 4: Build the Application
```bash
npm run build
```

#### Step 5: Configure Startup
- [ ] In cPanel Node.js App interface
- [ ] Set Application startup file: `server.js`
- [ ] Click "Start App"

#### Step 6: Test
- [ ] Visit your configured domain
- [ ] Verify all features work

---

## Post-Deployment Verification

### Functionality Tests
- [ ] Home page loads correctly
- [ ] Navigation works (Home, About)
- [ ] Client registration form works
- [ ] Agency registration form works
- [ ] Login system works
- [ ] CGI Portal form submits data
- [ ] User profile displays correctly
- [ ] Admin access works (20 clicks + PIN: 4343)
- [ ] Admin dashboard displays
- [ ] CSV export downloads
- [ ] Chat widget opens and sends messages
- [ ] Language toggle works (EN/BN)

### Technical Tests
- [ ] All images load
- [ ] CSS styles applied correctly
- [ ] JavaScript functions work
- [ ] LocalStorage persists data
- [ ] No console errors
- [ ] Mobile responsive design works
- [ ] Page refresh doesn't break routing

### Security & Performance
- [ ] SSL certificate installed (HTTPS)
- [ ] .htaccess security headers active
- [ ] GZIP compression enabled
- [ ] Browser caching configured
- [ ] No sensitive data exposed in code

---

## Common Issues & Solutions

### ❌ Issue: Blank white page
**Solution:**
- Check browser console for errors
- Verify all files uploaded correctly
- Check file paths in index.html
- Ensure .htaccess is configured

### ❌ Issue: 404 error on page refresh
**Solution:**
- Add/verify .htaccess rewrite rules
- Ensure mod_rewrite is enabled on server

### ❌ Issue: CSS/JS files not loading
**Solution:**
- Check file paths in built files
- Verify assets folder uploaded
- Check vite.config.ts base path setting

### ❌ Issue: LocalStorage not working
**Solution:**
- Check browser privacy settings
- Verify HTTPS is enabled
- Test in different browser

---

## File Permissions (Important!)

Set correct permissions in cPanel File Manager:
- [ ] Folders: 755
- [ ] Files: 644
- [ ] .htaccess: 644

---

## Optional Enhancements

### Enable SSL (Free with Let's Encrypt)
- [ ] In cPanel, go to "SSL/TLS Status"
- [ ] Enable AutoSSL for your domain
- [ ] Update .htaccess to force HTTPS

### Setup Cloudflare (Free CDN)
- [ ] Create Cloudflare account
- [ ] Add your domain
- [ ] Update nameservers
- [ ] Enable caching and optimization

### Setup Email Notifications
- [ ] Configure SMTP in cPanel
- [ ] Update contact form if needed

---

## Backup Strategy

Before deployment:
- [ ] Backup current site (if replacing existing)
- [ ] Export any existing database data
- [ ] Save current .htaccess file

After deployment:
- [ ] Create backup of deployed files
- [ ] Document deployment date and version
- [ ] Save deployment configuration

---

## Support Resources

**cPanel Documentation:**
- File Manager: https://docs.cpanel.net/cpanel/files/file-manager/
- Node.js: https://docs.cpanel.net/cpanel/software/application-manager/

**Hosting Provider:**
- Contact your hosting support for:
  - Node.js availability
  - mod_rewrite status
  - SSL certificate issues
  - File permission problems

---

## Quick Command Reference

### Local Development
```bash
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Production Server (if using Node.js)
```bash
npm install --production  # Install only production dependencies
npm run build            # Build the app
node server.js           # Start the server
```

---

## Deployment Complete! 🎉

Your Apollo Visa Tech application should now be live and accessible to users.

**Next Steps:**
1. Share the URL with stakeholders
2. Monitor for any issues in first 24 hours
3. Set up analytics (Google Analytics, etc.)
4. Plan for regular backups
5. Document any custom configurations

**Live URL:** https://yourdomain.com/apollo-visa-tech

Good luck! 🚀
