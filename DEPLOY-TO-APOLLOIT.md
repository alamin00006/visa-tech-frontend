# 🚀 Deploy Apollo Visa Tech to apolloit.info

## Quick Deployment Steps

### Step 1: Build the Application
Run one of these commands:
```bash
npm run build
```
OR
```bash
node node_modules/vite/bin/vite.js build
```

This creates a `dist` folder with production files.

### Step 2: Create Deployment Package

**Option A: Using PowerShell Script**
```powershell
powershell -ExecutionPolicy Bypass -File create-deployment-package.ps1
```

**Option B: Manual ZIP Creation**
1. Open the `dist` folder
2. Select all files inside dist
3. Also include the `.htaccess` file from root
4. Right-click → Send to → Compressed (zipped) folder
5. Name it: `apollo-visa-tech-deploy.zip`

### Step 3: Upload to cPanel

1. **Login to cPanel**
   - URL: Your hosting provider's cPanel URL
   - Domain: apolloit.info

2. **Navigate to File Manager**
   - Click "File Manager" in cPanel
   - Go to `public_html` directory

3. **Backup Existing Files (if any)**
   - Select all files in public_html
   - Click "Compress" → Create backup.zip
   - Download backup.zip to your computer

4. **Clear public_html**
   - Select all files in public_html
   - Click "Delete"

5. **Upload New Files**
   - Click "Upload" button
   - Select `apollo-visa-tech-deploy.zip`
   - Wait for upload to complete

6. **Extract Files**
   - Right-click on `apollo-visa-tech-deploy.zip`
   - Click "Extract"
   - Extract to: `/public_html/`
   - Click "Extract Files"

7. **Verify File Structure**
   Your public_html should now have:
   ```
   public_html/
   ├── index.html
   ├── .htaccess
   └── assets/
       ├── index-[hash].js
       ├── index-[hash].css
       └── [other assets]
   ```

8. **Set Permissions**
   - Select all files
   - Click "Permissions"
   - Files: 644
   - Folders: 755

9. **Delete ZIP File**
   - Select `apollo-visa-tech-deploy.zip`
   - Click "Delete"

### Step 4: Configure SSL (HTTPS)

1. In cPanel, go to **SSL/TLS Status**
2. Find `apolloit.info`
3. Click "Run AutoSSL"
4. Wait for SSL certificate to be installed
5. Your site will now work with HTTPS

### Step 5: Test Your Deployment

Visit: **https://apolloit.info**

Test these features:
- ✅ Home page loads
- ✅ Navigation works
- ✅ Language toggle (EN/BN)
- ✅ User registration
- ✅ Login system
- ✅ CGI Portal form
- ✅ Admin access (20 clicks + PIN 4343)
- ✅ Chat widget
- ✅ Mobile responsive

### Step 6: Verify HTTPS Redirect

1. Try visiting: http://apolloit.info (without https)
2. It should automatically redirect to: https://apolloit.info
3. If not, check if .htaccess was uploaded correctly

---

## Troubleshooting

### Problem: Blank Page
**Solution:**
- Check browser console (F12) for errors
- Verify all files uploaded correctly
- Check file permissions (644 for files, 755 for folders)

### Problem: 404 on Page Refresh
**Solution:**
- Ensure .htaccess file is in public_html
- Check if mod_rewrite is enabled (contact hosting support)

### Problem: CSS/JS Not Loading
**Solution:**
- Clear browser cache (Ctrl + Shift + Delete)
- Check if assets folder uploaded correctly
- Verify file paths in index.html

### Problem: HTTPS Not Working
**Solution:**
- Install SSL certificate in cPanel
- Wait 5-10 minutes for SSL to propagate
- Clear browser cache and try again

---

## Alternative: Direct File Upload (No ZIP)

If ZIP extraction doesn't work:

1. Build the project locally
2. Open `dist` folder
3. In cPanel File Manager, go to `public_html`
4. Click "Upload"
5. Drag and drop ALL files from dist folder
6. Also upload `.htaccess` from project root
7. Wait for all uploads to complete

---

## Post-Deployment Checklist

- [ ] Site loads at https://apolloit.info
- [ ] All pages accessible
- [ ] Forms work correctly
- [ ] Admin panel accessible
- [ ] Chat widget functional
- [ ] Mobile responsive
- [ ] HTTPS redirect working
- [ ] No console errors
- [ ] LocalStorage working

---

## Important Notes

1. **Domain**: apolloit.info
2. **Admin PIN**: 4343 (after 20 clicks on lock icon)
3. **Contact**: 01300172795
4. **HTTPS**: Enabled by default in .htaccess
5. **Database**: Uses browser LocalStorage (client-side)

---

## Need Help?

1. Check cPanel error logs
2. Review browser console (F12)
3. Contact your hosting provider
4. Verify DNS settings point to correct server

---

## Performance Tips

### Enable Cloudflare (Free CDN)
1. Create account at cloudflare.com
2. Add apolloit.info
3. Update nameservers at your domain registrar
4. Enable caching and minification

### Monitor Site Performance
- Use Google PageSpeed Insights
- Check GTmetrix for optimization tips
- Monitor cPanel bandwidth usage

---

**Your Apollo Visa Tech application is now live at https://apolloit.info! 🎉**
