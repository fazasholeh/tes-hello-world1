# ⚡ QUICK START - API KEY SETUP

## 🔑 Your API Key

```
AIzaSyB4NmNiaYWp_GED-cwVHhq766Y0t85Ko-c
```

---

## ⏱️ 5-Minute Setup

### 1️⃣ Create .env File
```bash
echo "VITE_GEMINI_API_KEY=AIzaSyB4NmNiaYWp_GED-cwVHhq766Y0t85Ko-c" > .env
```

### 2️⃣ Install & Run
```bash
npm install && npm run dev
```

### ✅ Done!
Open `http://localhost:5173` dan mulai chat

---

## 📁 File Locations

### API Key
- **Location**: `.env` (root directory)
- **Format**: `VITE_GEMINI_API_KEY=your_key_here`
- **Keep Secret**: ✅ YES - Don't commit to git!

### Access in Code
- **File**: `src/services/geminiService.js`
- **Method**: `import.meta.env.VITE_GEMINI_API_KEY`
- **Type**: Environment Variable (Vite)

### Environment Configuration
- **Template**: `.env.example` (reference only)
- **Actual**: `.env` (local, never commit)
- **Git Ignore**: Yes - already in `.gitignore`

---

## 🔒 Security Checklist

- [ ] `.env` file created
- [ ] API key added
- [ ] `.env` not in git
- [ ] Running locally works
- [ ] No hardcoded API keys

---

## 🚨 If API Key Exposed

**Immediately**:
1. Delete from git history
2. Regenerate at https://makersuite.google.com/app/apikey
3. Update .env with new key
4. Redeploy

---

## 📞 Troubleshooting

### "API Key not found"
```bash
# Check file exists
ls -la .env

# Check content
cat .env

# Restart server
npm run dev
```

### "Invalid API key"
```bash
# Verify format
# Must start with: AIza
# Length: 39+ characters

# Regenerate at:
https://makersuite.google.com/app/apikey
```

### "Rate limit exceeded"
- Wait 5-10 minutes
- Check quota in Google Cloud Console
- Consider backend proxy for production

---

## 📚 Full Documentation

- **Setup**: See `SETUP_GUIDE.md`
- **Security**: See `SECURITY.md`
- **Architecture**: See `ARCHITECTURE.md`
- **Summary**: See `PROJECT_SUMMARY.md`

---

## 🎯 Next Steps

1. ✅ Create `.env` file
2. ✅ Add API key
3. ✅ Run `npm install`
4. ✅ Run `npm run dev`
5. ✅ Test chat
6. ✅ Customize UI
7. ✅ Deploy

---

**Happy coding! 🚀**

Need help? Check the documentation files or see TROUBLESHOOTING section.
