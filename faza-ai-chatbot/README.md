# 🚀 Faza.Ai - Advanced AI Chatbot Application

Aplikasi web AI Chatbot modern dengan design Glassmorphism, streaming response, dan integrasi Google Gemini API.

## 📋 Spesifikasi Teknis

- **Framework**: React.js (Vite)
- **Styling**: Tailwind CSS + Glassmorphism
- **Icons**: Lucide-React
- **AI Integration**: Google Generative AI (Gemini API)
- **Design Pattern**: Modern UI dengan Mesh Gradient & Backdrop Blur

## 🛠️ Instalasi & Setup

### 1. **Clone atau Download Project**
```bash
cd faza-ai-chatbot
```

### 2. **Install Dependencies**
```bash
npm install
```

### 3. **Konfigurasi Environment Variables** ⚠️ PENTING

Buat file `.env` di root directory project:
```bash
echo "VITE_GEMINI_API_KEY=AIzaSyB4NmNiaYWp_GED-cwVHhq766Y0t85Ko-c" > .env
```

**ATAU** edit file `.env.example` yang sudah ada:
```env
VITE_GEMINI_API_KEY=AIzaSyB4NmNiaYWp_GED-cwVHhq766Y0t85Ko-c
```

### 4. **Pastikan .env di .gitignore**
```bash
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
echo ".env.*.local" >> .gitignore
```

### 5. **Jalankan Development Server**
```bash
npm run dev
```

Server akan berjalan di `http://localhost:5173`

### 6. **Build untuk Production**
```bash
npm run build
```

## 📁 Struktur Folder

```
faza-ai-chatbot/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ChatWindow.jsx
│   │   ├── Sidebar.jsx
│   │   ├── InputArea.jsx
│   │   └── MessageBubble.jsx
│   ├── services/
│   │   └── geminiService.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env.example
├── .gitignore
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🔐 Security Best Practices

### Mengapa API Key Harus di .env?
- **Client-side**: API Key disembunyikan di environment variables
- **Production**: Gunakan backend proxy atau server-side API calls
- **Git Safety**: `.env` file dijaga di `.gitignore`

### Untuk Production (RECOMMENDED):
```javascript
// Buat backend endpoint (Node.js/Express) untuk proxy API
// Jangan expose API Key ke client-side sama sekali
app.post('/api/chat', async (req, res) => {
  const response = await genAI.generateContent(req.body.message);
  res.json(response);
});
```

## ✨ Fitur Utama

### ✅ Chat Functionality
- Real-time streaming responses
- Markdown rendering untuk code blocks
- Auto-scroll ke pesan terbaru
- Typing indicators
- Copy button untuk setiap response

### ✅ Sidebar History
- Menyimpan riwayat percakapan lokal
- Quick access ke sesi sebelumnya
- Delete conversation history
- Sidebar collapse/expand

### ✅ UI/UX Modern
- Glassmorphism design dengan backdrop blur
- Mesh gradient background
- Smooth animations & transitions
- Responsive design (Mobile-friendly)
- Dark mode ready

### ✅ Input Features
- Multiline text input
- Auto-expand textarea
- Emoji support
- Clear chat button

## 🎨 Design Specifications

### Color Palette
- **Deep Blue**: #1e1b4b (Primary)
- **Purple**: #7c3aed (Accent)
- **Frosted White**: #f8fafc (Secondary)
- **Glass**: rgba(255, 255, 255, 0.1)

### Glassmorphism Effects
```css
backdrop-filter: blur(10px);
background: rgba(255, 255, 255, 0.1);
border: 1px solid rgba(255, 255, 255, 0.2);
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
```

## 📦 Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "@google/generative-ai": "^0.3.0",
  "lucide-react": "^0.344.0",
  "react-markdown": "^9.0.0",
  "remark-gfm": "^4.0.0"
}
```

## 🚀 Deployment Guide

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Environment Variables di Vercel Dashboard:**
- Tambahkan `VITE_GEMINI_API_KEY` di Project Settings → Environment Variables

### Netlify
```bash
# Drag & drop folder `/dist` ke Netlify
# Atau gunakan Netlify CLI
```

## 🐛 Troubleshooting

### "Cannot find module '@google/generative-ai'"
```bash
npm install @google/generative-ai
```

### API Key not working
- Pastikan `.env` file ada di root directory
- Restart dev server setelah mengubah `.env`
- Gunakan `import.meta.env.VITE_GEMINI_API_KEY` untuk akses di Vite

### CORS Error
- Gemini API berjalan di backend Google, seharusnya tidak ada CORS issue
- Jika ada error, pertimbangkan membuat backend proxy

## 📚 Dokumentasi Referensi

- [Google Generative AI SDK](https://github.com/google/generative-ai-js)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)

## 📝 License

MIT License - Feel free to use untuk personal maupun commercial projects.

## 👨‍💻 Author

Faza.Ai Chatbot - Built with React & Tailwind CSS

---

**Last Updated**: May 2026
**Version**: 1.0.0

⭐ Jika helpful, jangan lupa beri star!
