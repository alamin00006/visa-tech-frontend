# 🌐 DNS Setup Guide for apolloit.info

## Current Issue: DNS_PROBE_FINISHED_NXDOMAIN

This error means your domain **apolloit.info** is not pointing to your hosting server yet.

---

## ✅ Good News - Your Files Are Ready!

Your cPanel deployment is **COMPLETE**:
- ✅ index.html uploaded
- ✅ .htaccess uploaded (1.6 KB)
- ✅ assets folder uploaded
- ✅ Permissions set correctly (755)
- ✅ Files extracted properly

**The only issue is DNS configuration!**

---

## 🔧 How to Fix DNS Issue

### Step 1: Find Your Hosting Server's IP Address

1. **In cPanel**, look for your server information:
   - Go to cPanel home
   - Look for "Server Information" or "Account Information"
   - Find your **Shared IP Address** or **Server IP**
   - Example: `123.456.789.012`

2. **OR Contact your hosting provider** and ask:
   - "What is the IP address for my hosting account?"
   - "What nameservers should I use for apolloit.info?"

---

### Step 2: Update DNS Records

You need to update DNS at your **domain registrar** (where you bought apolloit.info).

#### Option A: Point to Hosting IP (A Record)

1. Login to your domain registrar (GoDaddy, Namecheap, etc.)
2. Find DNS Management / DNS Settings
3. Add/Update these records:

```
Type: A
Host: @
Value: [Your hosting IP address]
TTL: 3600

Type: A
Host: www
Value: [Your hosting IP address]
TTL: 3600
```

#### Option B: Use Hosting Nameservers (Recommended)

1. In cPanel, find your nameservers (usually):
   ```
   ns1.yourhostingprovider.com
   ns2.yourhostingprovider.com
   ```

2. Login to your domain registrar
3. Update nameservers to match your hosting provider's nameservers

---

### Step 3: Wait for DNS Propagation

- **Typical wait time**: 1-24 hours
- **Usually takes**: 2-4 hours
- **Check status**: Use https://dnschecker.org

---

## 🔍 How to Check DNS Status

### Method 1: Online DNS Checker
1. Go to: https://dnschecker.org
2. Enter: apolloit.info
3. Select: A Record
4. Check if it shows your hosting IP

### Method 2: Command Line (Windows)
```cmd
nslookup apolloit.info
```

Should return your hosting server's IP address.

### Method 3: Ping Test
```cmd
ping apolloit.info
```

If it returns an IP address, DNS is working!

---

## 📋 Common DNS Configurations

### If using cPanel hosting (most common):

**Nameservers** (ask your hosting provider):
```
ns1.yourhostingprovider.com
ns2.yourhostingprovider.com
```

**OR A Records**:
```
@ → [Hosting IP]
www → [Hosting IP]
```

---

## ⚠️ Important Notes

1. **Don't change files in cPanel** - they're already correct!
2. **DNS changes take time** - be patient
3. **Contact hosting support** if you need:
   - Your server IP address
   - Your nameservers
   - Help with DNS setup

---

## 🎯 What to Do Right Now

### Immediate Actions:

1. **Find your hosting provider's information**:
   - Login to your hosting account
   - Look for "Server Information" or "Welcome Email"
   - Note down:
     - Server IP address
     - Nameservers (ns1, ns2)

2. **Contact your hosting provider** and ask:
   - "I've uploaded my website files to public_html"
   - "What DNS settings do I need for apolloit.info?"
   - "What is my server IP address?"

3. **Update DNS at domain registrar**:
   - Login to where you bought apolloit.info
   - Update nameservers OR A records
   - Save changes

4. **Wait 2-4 hours** for DNS to propagate

5. **Test again**: Visit https://apolloit.info

---

## 🔄 Alternative: Test with Server IP

While waiting for DNS, you can test if your site works:

1. Find your server IP (from cPanel)
2. Visit: `http://[YOUR_SERVER_IP]/`
3. If your site loads, everything is working!
4. Just need to wait for DNS

---

## 📞 Who to Contact

### For DNS Issues:
- **Domain Registrar** (where you bought apolloit.info)
  - They control DNS settings
  - Can help update nameservers

### For Hosting Issues:
- **Hosting Provider** (where cPanel is)
  - Can provide server IP
  - Can provide nameservers
  - Can verify files are uploaded correctly

---

## ✅ Once DNS is Working

After DNS propagates (2-24 hours), your site will be live at:
- https://apolloit.info
- https://www.apolloit.info

Then test all features:
- [ ] Home page loads
- [ ] Navigation works
- [ ] User registration
- [ ] Admin panel (20 clicks + PIN 4343)
- [ ] Chat widget
- [ ] Mobile responsive

---

## 🎉 Summary

**Your deployment is COMPLETE!** ✅

The only remaining step is **DNS configuration**, which is done at your domain registrar, not in cPanel.

**Next Steps:**
1. Contact hosting provider for server IP/nameservers
2. Update DNS at domain registrar
3. Wait 2-4 hours
4. Visit https://apolloit.info
5. Celebrate! 🎉

---

**Need Help?**
- Contact your hosting provider's support
- They can help with DNS configuration
- Show them this guide if needed
