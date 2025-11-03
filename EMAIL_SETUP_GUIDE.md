# 📧 Email Setup Guide for Contact Form

Your contact form is already integrated with Nodemailer! You just need to configure it with your Gmail account.

## 🚀 Quick Setup (Gmail)

### Step 1: Enable 2-Factor Authentication

1. Go to your [Google Account](https://myaccount.google.com/)
2. Click **Security** in the left sidebar
3. Scroll to "2-Step Verification"
4. Click **Get Started** and follow the instructions
5. Complete the setup

### Step 2: Generate App Password

1. Still in **Security**, scroll to "2-Step Verification"
2. Scroll down to **App passwords**
3. Click on **App passwords**
4. You may need to sign in again
5. In "Select app" dropdown, choose **Mail**
6. In "Select device" dropdown, choose **Other (Custom name)**
7. Type: `Portfolio Website`
8. Click **Generate**
9. **COPY THE 16-CHARACTER PASSWORD** (you won't see it again!)
   - Example: `abcd efgh ijkl mnop`

### Step 3: Update Your .env File

Open `backend/.env` and update these lines:

```env
# Email Configuration (for contact form)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=jabirjamal922@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop        ← Paste your 16-char app password here
EMAIL_FROM=noreply@jabirjamal.com
CONTACT_EMAIL=jabirjamal922@gmail.com  ← Where you want to receive messages
```

**Important Notes:**
- `EMAIL_USER` - Your Gmail address
- `EMAIL_PASS` - The 16-character app password (WITH spaces or without both work)
- `EMAIL_FROM` - Can be any email format (just for display)
- `CONTACT_EMAIL` - Your actual email where messages will arrive

### Step 4: Restart Backend Server

```bash
cd backend
npm run dev
```

### Step 5: Test the Contact Form

1. Go to http://localhost:3000/contact
2. Fill in the form
3. Click "Send Message"
4. Check your email inbox (jabirjamal922@gmail.com)
5. You should receive an email with the form submission!

---

## ✅ Complete .env Example

Here's your complete `backend/.env` file with email configured:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://127.0.0.1:27017/portfolio

# JWT Secret
JWT_SECRET=my_super_secret_key_12345

# Email Configuration (for contact form)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=jabirjamal922@gmail.com
EMAIL_PASS=your_16_character_app_password_here
EMAIL_FROM=noreply@jabirjamal.com
CONTACT_EMAIL=jabirjamal922@gmail.com

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

---

## 📬 How the Email Will Look

When someone submits the contact form, you'll receive an email like this:

```
From: noreply@jabirjamal.com
To: jabirjamal922@gmail.com
Subject: Portfolio Contact: [Their Subject]

New Contact Form Submission

Name: John Doe
Email: john@example.com
Subject: Interested in hiring you
Message:
Hi Jabir, I came across your portfolio and I'm impressed with your work. 
I'd like to discuss a project opportunity with you.

---
Sent from Portfolio Website
```

---

## 🐛 Troubleshooting

### Email Not Sending?

**Check 1: Is 2FA enabled?**
```
Google Account → Security → 2-Step Verification → ON
```

**Check 2: App Password correct?**
- Must be exactly 16 characters
- From App Passwords section (not your regular Gmail password)

**Check 3: Check backend console**
```bash
cd backend
npm run dev
# Look for email errors when form is submitted
```

**Check 4: Test in MongoDB**
Even if email fails, the submission is saved in the database:
```bash
mongosh
use portfolio
db.contacts.find().pretty()
```

### Still Not Working?

**Check backend logs:**
```bash
# When you submit the form, watch the terminal
# You'll see either:
✅ Email sent successfully
# OR
❌ Email sending failed: [error message]
```

**Common Errors:**

| Error | Solution |
|-------|----------|
| "Invalid login" | Check EMAIL_USER and EMAIL_PASS |
| "Username and Password not accepted" | Generate new App Password |
| "Connection timeout" | Check EMAIL_HOST and EMAIL_PORT |
| "self signed certificate" | Make sure `secure: false` in emailService.js |

---

## 🔧 Alternative Email Services

If Gmail doesn't work, try these alternatives:

### Option 1: Outlook/Hotmail

```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=your_email@outlook.com
EMAIL_PASS=your_password
```

### Option 2: SendGrid (Free Plan)

1. Sign up at [SendGrid](https://sendgrid.com)
2. Create API key
3. Update `backend/utils/emailService.js`:

```javascript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY
  }
});
```

4. Update `.env`:
```env
SENDGRID_API_KEY=your_sendgrid_api_key
```

### Option 3: Mailtrap (For Testing)

Perfect for development/testing:

1. Sign up at [Mailtrap](https://mailtrap.io)
2. Get credentials from your inbox
3. Update `.env`:

```env
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=your_mailtrap_username
EMAIL_PASS=your_mailtrap_password
```

**Note:** Mailtrap captures emails in your test inbox instead of actually sending them.

---

## 🔐 Security Best Practices

1. **Never commit .env file** - It's already in .gitignore
2. **Use App Passwords** - Never use your actual Gmail password
3. **Rotate passwords** - Change app password if leaked
4. **Environment Variables** - Always use .env for sensitive data
5. **Production** - Use different credentials for production

---

## 📊 How It Works

```
User fills form → Frontend sends POST request → Backend receives data
                                                          ↓
                                           Saves to MongoDB database
                                                          ↓
                                           Sends email via Nodemailer
                                                          ↓
                                           Email arrives in your inbox
```

---

## ✅ Final Checklist

- [ ] 2FA enabled on Gmail account
- [ ] App Password generated
- [ ] `backend/.env` updated with EMAIL_USER and EMAIL_PASS
- [ ] Backend restarted
- [ ] Test form submission
- [ ] Email received in inbox
- [ ] Check spam folder if not in inbox

---

## 🎉 Success!

Once configured, every contact form submission will:
1. ✅ Save to your MongoDB database
2. ✅ Send you an email notification
3. ✅ Show success message to the user

You can view all submissions in the database:
```bash
mongosh
use portfolio
db.contacts.find().pretty()
```

---

## 🆘 Quick Help

**Quick Test Command:**

After setup, test if email config is working:

```bash
cd backend
node -e "require('dotenv').config(); console.log('EMAIL_USER:', process.env.EMAIL_USER); console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '✅ Set' : '❌ Not set');"
```

Should show:
```
EMAIL_USER: jabirjamal922@gmail.com
EMAIL_PASS: ✅ Set
```

---

**Need more help?** Check the main [README.md](README.md) or [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

**Your contact form is ready to use!** 🚀📧
