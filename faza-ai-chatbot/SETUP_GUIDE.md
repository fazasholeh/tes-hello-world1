# 🚀 FAZA.AI - SETUP & DEPLOYMENT GUIDE

## 📋 Daftar Isi
1. [Quick Start (5 menit)](#quick-start)
2. [Konfigurasi .env](#konfigurasi-env)
3. [Development Setup](#development-setup)
4. [Troubleshooting](#troubleshooting)
5. [Production Deployment](#production-deployment)

---

## 🎯 Quick Start

### Langkah 1: Install Dependencies
```bash
cd faza-ai-chatbot
npm install
```

### Langkah 2: Setup Environment Variables
```bash
# Copy template
cp .env.example .env

# Edit .env dan masukkan API key
nano .env  # atau gunakan text editor favorit Anda
```

### Langkah 3: Run Development Server
```bash
npm run dev
```

Server akan otomatis buka di `http://localhost:5173`

### Langkah 4: Mulai Chatting! 🎉
Klik "New Chat" dan mulai percakapan dengan Faza.Ai

---

## 🔐 Konfigurasi .env

### Memahami Environment Variables

#### Apa itu .env?
File `.env` menyimpan variabel konfigurasi sensitif yang tidak boleh di-commit ke git.

#### Mengapa Penting?
- **Security**: API Key tersembunyi dari public
- **Flexibility**: Gampang switch antara development dan production
- **Best Practice**: Standard di semua aplikasi modern

### Setup Langkah demi Langkah

#### Opsi 1: Manual Copy-Paste
```bash
# 1. Buka text editor
nano .env  # macOS/Linux
code .env  # VS Code

# 2. Paste kode berikut:
VITE_GEMINI_API_KEY=AIzaSyB4NmNiaYWp_GED-cwVHhq766Y0t85Ko-c

# 3. Save file (Ctrl+S atau Cmd+S)
```

#### Opsi 2: Command Line
```bash
echo "VITE_GEMINI_API_KEY=AIzaSyB4NmNiaYWp_GED-cwVHhq766Y0t85Ko-c" > .env
```

#### Opsi 3: Rename Template
```bash
cp .env.example .env
# Edit .env dan uncomment/update nilai
```

### Verifikasi Setup
```bash
# Check jika .env exists
ls -la .env

# Check jika key valid
cat .env | grep VITE_GEMINI_API_KEY
```

---

## 💻 Development Setup

### Full Installation Script
```bash
#!/bin/bash
# Paste di terminal dan run

# 1. Navigate to project
cd faza-ai-chatbot

# 2. Install dependencies
npm install

# 3. Create .env
echo "VITE_GEMINI_API_KEY=AIzaSyB4NmNiaYWp_GED-cwVHhq766Y0t85Ko-c" > .env

# 4. Verify
echo "✅ Setup complete!"
npm run dev
```

### Project Structure
```
faza-ai-chatbot/
├── src/
│   ├── components/
│   │   ├── ChatWindow.jsx      # Chat display component
│   │   ├── InputArea.jsx       # Message input
│   │   ├── MessageBubble.jsx   # Message rendering
│   │   └── Sidebar.jsx         # History sidebar
│   ├── services/
│   │   └── geminiService.js    # Gemini API integration
│   ├── App.jsx                 # Main app logic
│   ├── main.jsx                # React entry point
│   └── index.css               # Global styles
├── public/
├── .env.example                # Environment template
├── package.json                # Dependencies
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind theme
└── index.html                  # HTML template
```

### Important Files

#### `src/services/geminiService.js`
- Handles Gemini API communication
- Implements streaming responses
- Error handling dan validation

#### `src/App.jsx`
- Main application logic
- State management dengan useState
- LocalStorage untuk chat history

#### `.env`
- **JANGAN commit ke git!**
- Hanya ada di local machine
- Jangan share dengan orang lain

---

## 🐛 Troubleshooting

### Error 1: "Cannot find module '@google/generative-ai'"
**Penyebab**: Dependencies belum terinstall

**Solusi**:
```bash
npm install
# atau
npm install @google/generative-ai
```

### Error 2: "VITE_GEMINI_API_KEY not found"
**Penyebab**: .env file tidak ada atau tidak di-read

**Solusi**:
```bash
# 1. Check jika .env exists
ls -la .env

# 2. If not exists, create it
echo "VITE_GEMINI_API_KEY=AIzaSyB4NmNiaYWp_GED-cwVHhq766Y0t85Ko-c" > .env

# 3. Restart dev server
npm run dev
```

### Error 3: "API key is invalid"
**Penyebab**: API Key tidak valid atau sudah expired

**Solusi**:
```bash
# 1. Verify API key format
# Harus dimulai dengan "AIza"
# Minimal 40 karakter

# 2. Check di https://makersuite.google.com/app/apikey
# Pastikan API enabled di Google Cloud Console

# 3. Update .env dengan key yang benar
nano .env

# 4. Restart dev server
npm run dev
```

### Error 4: "Port 5173 already in use"
**Penyebab**: Proses lain menggunakan port yang sama

**Solusi**:
```bash
# Option 1: Kill existing process
# macOS/Linux
lsof -ti:5173 | xargs kill -9

# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Option 2: Use different port
npm run dev -- --port 5174
```

### Error 5: Chat tidak merespons
**Penyebab**: 
- API quota habis
- Rate limit tercapai
- Network error

**Solusi**:
```bash
# 1. Check browser console (F12)
# 2. Look for detailed error message
# 3. Cek internet connection
# 4. Try again after a few minutes
# 5. Check Google Cloud console quota
```

### CORS Error (Should Not Happen)
**Jika terjadi**: Gemini API berjalan di backend Google (no CORS issue)

**Jika tetap error**: Setup backend proxy (advanced)
```javascript
// Express backend
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  const response = await genAI.generateContent(message);
  res.json(response);
});
```

---

## 🚀 Production Deployment

### Pre-deployment Checklist
- [ ] Semua features tested
- [ ] .env tidak di-commit
- [ ] .gitignore includes .env
- [ ] API key aman
- [ ] Responsive design ok

### Option 1: Deploy ke Vercel (RECOMMENDED)

**Why Vercel?**
- Free tier generous
- Zero-config React/Vite
- Automatic HTTPS
- Instant deploys

**Steps**:
```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login ke Vercel
vercel login

# 3. Deploy
vercel

# 4. Set environment variables di dashboard
# - Go to Project Settings
# - Add "VITE_GEMINI_API_KEY" dengan value Anda
# - Re-deploy
```

### Option 2: Deploy ke Netlify

**Steps**:
```bash
# 1. Build project
npm run build

# 2. Drag dist/ folder ke Netlify dashboard
# atau

# 3. Connect GitHub
# - Push code ke GitHub
# - Connect repo ke Netlify
# - Set build command: npm run build
# - Set publish directory: dist

# 4. Set environment variables
# - Build & Deploy > Environment
# - Add VITE_GEMINI_API_KEY
```

### Option 3: Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG VITE_GEMINI_API_KEY
ENV VITE_GEMINI_API_KEY=$VITE_GEMINI_API_KEY

RUN npm run build

FROM node:18-alpine
RUN npm install -g serve
WORKDIR /app
COPY --from=0 /app/dist ./dist

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

```bash
# Build & Run
docker build --build-arg VITE_GEMINI_API_KEY=your_key_here -t faza-ai .
docker run -p 3000:3000 faza-ai
```

### Option 4: Self-hosted (VPS)

```bash
# 1. SSH ke server
ssh user@your-server.com

# 2. Clone repo
git clone https://github.com/yourusername/faza-ai-chatbot.git
cd faza-ai-chatbot

# 3. Setup .env
echo "VITE_GEMINI_API_KEY=your_key" > .env

# 4. Install & Build
npm install
npm run build

# 5. Install PM2 untuk production process manager
npm install -g pm2

# 6. Start application
pm2 start "npm run preview" --name "faza-ai"
pm2 startup
pm2 save

# 7. Setup Nginx reverse proxy
# Configure /etc/nginx/sites-available/faza-ai
```

### Backend Proxy Setup (For Production Security)

**Recommended architecture**:
```
Client (React) → Backend API → Gemini API
```

**Node.js/Express Backend**:
```javascript
import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(message);
    const response = await result.response;
    
    res.json({ text: response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(process.env.PORT || 3001);
```

---

## 📊 Performance Optimization

### Frontend
```javascript
// Lazy load components
const ChatWindow = lazy(() => import('./components/ChatWindow'));

// Optimize message rendering
const MessageBubble = memo(({ message, isUser }) => {
  // component
});
```

### Build Optimization
```bash
# Check bundle size
npm run build
# Check dist/ folder size

# Use Vite's analyze plugin
npm install --save-dev rollup-plugin-visualizer
```

---

## 🔒 Security Best Practices

### 1. API Key Protection
✅ **DO**:
```javascript
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
```

❌ **DON'T**:
```javascript
const apiKey = "AIzaSy..."; // Hardcoded!
```

### 2. Input Validation
```javascript
const sanitizeInput = (input) => {
  return input.trim().slice(0, 5000); // Max 5000 chars
};
```

### 3. Rate Limiting
Implement di backend untuk prevent abuse

### 4. Error Messages
```javascript
// ✅ Safe error
throw new Error('Failed to process request');

// ❌ Unsafe error
throw new Error(`API Key: ${apiKey} is invalid`);
```

---

## 📞 Support & Resources

### Official Documentation
- [Google Generative AI SDK](https://github.com/google/generative-ai-js)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)

### Useful Links
- Get API Key: https://makersuite.google.com/app/apikey
- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com

### Community
- GitHub Issues: Report bugs
- Discussions: Feature requests
- Stack Overflow: General questions

---

## 📝 Changelog

### v1.0.0 (Initial Release)
- ✅ Full chat functionality
- ✅ Streaming responses
- ✅ Chat history persistence
- ✅ Glassmorphism UI
- ✅ Markdown rendering
- ✅ Responsive design

---

**Last Updated**: May 2026
**Version**: 1.0.0
**Status**: Production Ready ✅

Happy chatting! 🚀
