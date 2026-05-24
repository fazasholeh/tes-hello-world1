# 🔐 SECURITY & API KEY MANAGEMENT

## ⚠️ CRITICAL: Jangan Expose API Key!

### Masalah Keamanan

**API Key Anda adalah kredensial sensitif yang memberikan akses ke:**
- Google Generative AI (Gemini)
- Potentially costly API calls
- Your account resources

**Jika API Key di-expose:**
- ❌ Orang lain bisa gunakan dengan nama Anda
- ❌ Biaya API bisa sangat mahal
- ❌ Potensi abuse dari pihak ketiga
- ❌ Susah untuk di-track dan di-revoke

---

## ✅ Best Practices untuk Faza.Ai

### 1. Environment Variables (.env)

#### Setup Secure .env
```bash
# 1. Create .env file
touch .env

# 2. Add API key (ganti dengan key Anda)
echo "VITE_GEMINI_API_KEY=AIzaSyB4NmNiaYWp_GED-cwVHhq766Y0t85Ko-c" > .env

# 3. Make sure .env dalam .gitignore
cat .gitignore | grep .env
# Output: .env
```

#### Akses Secure di Code
```javascript
// ✅ SECURE - API key dari environment variable
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// ❌ INSECURE - API key hardcoded
const apiKey = "AIzaSyB4NmNiaYWp_GED-cwVHhq766Y0t85Ko-c";
```

### 2. Git Security

#### Verify .env dalam .gitignore
```bash
# Check
cat .gitignore | grep -E "\.env|\.env\."

# If not exists, add:
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
echo ".env.*.local" >> .gitignore
```

#### Before First Commit
```bash
# Make sure .env is not staged
git status
# Should NOT show .env file

# If .env was accidentally committed:
git rm --cached .env
git add .gitignore
git commit -m "Remove .env from git tracking"
git push
# THEN regenerate API key di Google Cloud Console
```

### 3. Development Machine Security

#### Secure File Permissions
```bash
# Linux/macOS - Restrict .env access
chmod 600 .env
# Only owner dapat read/write

# Check permissions
ls -la .env
# Should show: -rw------- (600)
```

#### IDE Security
```bash
# VS Code - .env tidak visible di explorer
# .vscode/settings.json
{
  "files.exclude": {
    ".env": true,
    ".env.local": true
  }
}
```

### 4. Environment Variables Naming

#### Vite Convention
```
VITE_* - Accessible di browser (public)
Tanpa prefix - Only accessible di server/build
```

#### Contoh Safe vs Unsafe
```javascript
// ✅ SAFE - Prefixed dengan VITE_, diakses via import.meta.env
VITE_GEMINI_API_KEY=AIza...

// ❌ UNSAFE - Tanpa prefix, exposed di environment
GEMINI_API_KEY=AIza...  // Bisa di-leak jika build di-expose
```

---

## 🌐 Production Deployment Security

### Opsi 1: Vercel Environment Variables

**Setup Aman**:
```bash
# 1. Deploy tanpa .env file
# (Pastikan .env tidak dalam git)

# 2. Di Vercel Dashboard:
# Project Settings → Environment Variables

# 3. Add variable:
# Name: VITE_GEMINI_API_KEY
# Value: AIzaSyB4NmNiaYWp_GED-cwVHhq766Y0t85Ko-c
# Environments: Production, Preview, Development

# 4. Redeploy project
# Vercel otomatis inject variabel saat build
```

**Verification**:
```bash
# Di Vercel dashboard, cek deployment logs
# Harus ada: "Environment variables loaded"
# Jangan ada: "VITE_GEMINI_API_KEY=..." di logs
```

### Opsi 2: Netlify Environment Variables

**Setup**:
```
Netlify Dashboard → Site Settings → Build & Deploy → Environment
Add: VITE_GEMINI_API_KEY = your_key_here
```

### Opsi 3: Backend Proxy (RECOMMENDED untuk Production)

**Architecture**:
```
┌─────────────┐
│   Browser   │  Request ke backend
├─────────────┤
│   React App │  (No API Key exposed)
└──────┬──────┘
       │
       ▼
┌─────────────────────────┐
│  Backend/API Server     │
│  (Node.js/Python/etc)   │
├─────────────────────────┤
│  Stores API Key safely  │  Only server can access key
│  Implements Rate Limit  │
│  Logs requests          │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│  Google Gemini API      │
└─────────────────────────┘
```

**Backend Implementation (Node.js/Express)**:
```javascript
// server.js (Backend)
import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL }));

// ✅ API key di server saja - SECURE
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Rate limiting
const requestCounts = new Map();

const rateLimit = (req, res, next) => {
  const clientIp = req.ip;
  const count = (requestCounts.get(clientIp) || 0) + 1;
  
  if (count > 100) { // 100 requests per minute
    return res.status(429).json({ error: 'Rate limit exceeded' });
  }
  
  requestCounts.set(clientIp, count);
  setTimeout(() => requestCounts.delete(clientIp), 60000);
  
  next();
};

app.post('/api/chat', rateLimit, async (req, res) => {
  try {
    const { message } = req.body;
    
    // Validate input
    if (!message || message.length > 5000) {
      return res.status(400).json({ error: 'Invalid input' });
    }
    
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(message);
    const response = await result.response;
    
    res.json({ text: response.text() });
  } catch (error) {
    console.error('API Error:', error);
    // ✅ Don't leak error details to client
    res.status(500).json({ error: 'Processing failed' });
  }
});

app.listen(process.env.PORT || 3001);
```

**Frontend Update**:
```javascript
// src/services/geminiService.js (Frontend)
export const generateContent = async (prompt) => {
  try {
    // ✅ Call backend endpoint, bukan Gemini API langsung
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: prompt })
    });
    
    const data = await response.json();
    return data.text;
  } catch (error) {
    throw new Error('Failed to get response');
  }
};
```

---

## 🔄 API Key Rotation (Best Practice)

### Kapan Harus Rotate?
- Setelah accidental exposure
- Setiap 3-6 bulan (proactive)
- Setelah staff change
- Setelah security incident

### Cara Rotate API Key
```bash
# 1. Generate key baru di Google Cloud Console
# https://makersuite.google.com/app/apikey

# 2. Update di production:
# - Vercel: Update environment variable
# - Netlify: Update environment variable
# - Self-hosted: Update .env, redeploy

# 3. Test aplikasi dengan key baru

# 4. Delete old key di Google Cloud Console

# 5. Verify old key tidak bisa digunakan
curl -H "Authorization: Bearer OLD_KEY" https://api.google.com
# Should return 401 Unauthorized
```

---

## 🚨 If API Key Exposed

### Immediate Actions
```bash
# 1. IMMEDIATELY go to:
# https://cloud.google.com/docs/authentication/api-keys#api_key_restrictions

# 2. Disable the exposed key:
# Google Cloud Console → APIs & Services → Credentials
# Click on key → Delete

# 3. Generate new key

# 4. Update everywhere:
echo "VITE_GEMINI_API_KEY=YOUR_NEW_KEY" > .env

# 5. Redeploy application
git add .
git commit -m "Update API key"
git push

# 6. Monitor usage untuk suspicious activities
```

### Check for Exposure
```bash
# 1. Search GitHub
# https://github.com/search?q=AIzaSyB4NmNiaYWp_GED-cwVHhq766Y0t85Ko-c

# 2. Search Google
# https://www.google.com/search?q=AIzaSyB4NmNiaYWp_GED-cwVHhq766Y0t85Ko-c

# 3. Check git history
git log -p --all -S "AIza"  # Search all commits

# 4. Regenerate key jika ditemukan
```

---

## 📋 Security Checklist

- [ ] .env file created and populated
- [ ] .env added to .gitignore
- [ ] .env file permissions set to 600 (Linux/macOS)
- [ ] API key tidak hardcoded di source code
- [ ] import.meta.env digunakan untuk akses
- [ ] .env tidak di-commit ke git
- [ ] Production menggunakan environment variables
- [ ] Error messages tidak leak API key
- [ ] Input validation implemented
- [ ] Rate limiting implemented (if self-hosted)
- [ ] HTTPS/SSL configured (production)
- [ ] CORS properly configured
- [ ] API key rotation schedule established

---

## 🛠️ Debugging tanpa Expose Key

### Safe Logging
```javascript
// ✅ SAFE - Log tanpa key details
console.log('API initialized successfully');

// ❌ UNSAFE - Log dengan key details
console.log('API Key:', apiKey);
console.log('Using key AIzaSyB4...');
```

### Environment Validation
```javascript
// Validate tanpa expose
const validateConfig = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('VITE_GEMINI_API_KEY not configured');
  }
  
  // Check format without revealing key
  if (!apiKey.startsWith('AIza') || apiKey.length < 40) {
    throw new Error('Invalid API key format');
  }
  
  console.log('✅ Configuration valid');
};
```

---

## 📚 References

- [Google Cloud Security Best Practices](https://cloud.google.com/docs/authentication/api-keys)
- [OWASP API Security](https://owasp.org/www-project-api-security/)
- [Environment Variables Best Practices](https://12factor.net/config)

---

**Last Updated**: May 2026
**Status**: Production Ready ✅

**Remember**: Your API key is like your password. Protect it! 🔒
