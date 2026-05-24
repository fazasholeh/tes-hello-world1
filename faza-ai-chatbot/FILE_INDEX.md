# 📑 FAZA.AI - FILE INDEX & QUICK REFERENCE

## 📂 Complete Project Structure

```
faza-ai-chatbot/
│
├── 📋 CONFIGURATION FILES
│   ├── .env.example                  👈 API Key template (rename to .env)
│   ├── .gitignore                    👈 Git ignore rules
│   ├── .eslintrc.cjs                 👈 Code linting config
│   ├── package.json                  👈 Dependencies & scripts
│   ├── vite.config.js                👈 Vite build config
│   ├── tailwind.config.js            👈 Tailwind CSS theme
│   ├── postcss.config.js             👈 PostCSS plugins
│   └── index.html                    👈 HTML entry point
│
├── 📚 DOCUMENTATION FILES
│   ├── README.md                     👈 Project overview
│   ├── QUICK_START.md                👈 5-minute setup guide
│   ├── SETUP_GUIDE.md                👈 Detailed setup + troubleshooting
│   ├── SECURITY.md                   👈 API Key security best practices
│   ├── ARCHITECTURE.md               👈 Component architecture & design
│   ├── PROJECT_SUMMARY.md            👈 Feature overview & checklist
│   └── FILE_INDEX.md                 👈 This file
│
├── 🎨 SOURCE CODE
│   └── src/
│       ├── App.jsx                   👈 Main application component
│       ├── main.jsx                  👈 React entry point
│       ├── index.css                 👈 Global styles & Glassmorphism
│       │
│       ├── components/
│       │   ├── ChatWindow.jsx        👈 Message display component
│       │   ├── InputArea.jsx         👈 Message input component
│       │   ├── MessageBubble.jsx     👈 Individual message rendering
│       │   └── Sidebar.jsx           👈 Navigation & history sidebar
│       │
│       └── services/
│           └── geminiService.js      👈 Google Gemini API integration
│
└── public/                           👈 Static assets (favicon, etc)
```

---

## 📖 Documentation Guide

### For Getting Started
1. **First Time?** Start with → `QUICK_START.md` (5 minutes)
2. **Need Details?** Read → `SETUP_GUIDE.md` (Comprehensive)
3. **Have Issues?** Check → `SETUP_GUIDE.md` Troubleshooting section

### For Development
1. **Architecture?** → `ARCHITECTURE.md` (Component flow, state management)
2. **Features?** → `PROJECT_SUMMARY.md` (Overview + checklist)
3. **Code Reference?** → `README.md` (Dependencies + API reference)

### For Security
1. **API Key Setup?** → `SECURITY.md` (Environment variables)
2. **Production?** → `SECURITY.md` (Backend proxy section)
3. **Leaked Key?** → `SECURITY.md` (Emergency procedures)

---

## 🔑 Key Files Explained

### Configuration

#### `.env.example`
- **Purpose**: Template untuk environment variables
- **Action**: Rename ke `.env` dan add API key
- **API Key**: `VITE_GEMINI_API_KEY=AIzaSyB4NmNiaYWp_GED-cwVHhq766Y0t85Ko-c`
- **Important**: DON'T commit `.env` to git!

#### `package.json`
- **Purpose**: Dependencies & npm scripts
- **Scripts**:
  - `npm install` - Install dependencies
  - `npm run dev` - Start development server
  - `npm run build` - Build for production
  - `npm run preview` - Preview production build

#### `vite.config.js`
- **Purpose**: Vite build tool configuration
- **Default Port**: 5173 (auto open browser)
- **Build Output**: `dist/` folder

#### `tailwind.config.js`
- **Purpose**: Custom Tailwind CSS theme
- **Custom Colors**: Deep Blue, Purple, Frosted White
- **Custom Effects**: Glass effects, mesh gradients

### Source Code

#### `src/App.jsx` (600+ lines)
- **Main Logic**: Application state management
- **State**: conversations, messages, activeConversation, etc.
- **Functions**: handleSendMessage, handleNewConversation, etc.
- **Integration**: Orchestrates all components

#### `src/services/geminiService.js` (200+ lines)
- **API Integration**: Google Generative AI SDK wrapper
- **Classes**: ChatSession (for chat history)
- **Methods**: sendMessage(), generateStreamingContent(), etc.
- **Security**: API key from environment variable

#### `src/components/ChatWindow.jsx`
- **Purpose**: Display messages with auto-scroll
- **Features**: Message list, loading states, typing indicator
- **Content**: Renders MessageBubble components

#### `src/components/MessageBubble.jsx`
- **Purpose**: Individual message rendering
- **Features**: Markdown rendering, copy button, syntax highlighting
- **Custom Components**: h1, code, links, tables, etc.

#### `src/components/InputArea.jsx`
- **Purpose**: User message input
- **Features**: Auto-expand textarea, send button, clear chat
- **Keyboard**: Enter to send, Shift+Enter for newline

#### `src/components/Sidebar.jsx`
- **Purpose**: Navigation & conversation history
- **Features**: New chat, delete chat, mobile toggle
- **Persistence**: Reads from App.jsx state

#### `src/index.css` (400+ lines)
- **Purpose**: Global styles & Glassmorphism effects
- **Sections**: Reset, scrollbar, glass components, animations
- **Features**: Custom Tailwind classes, keyframe animations

#### `index.html`
- **Purpose**: HTML template
- **Root Element**: `<div id="root"></div>`
- **Scripts**: Vite automatically injects React

---

## 🚀 Common Tasks & File References

### Task: Add API Key
**Files Involved**:
1. Create `.env` → Copy from `.env.example`
2. Add key → `VITE_GEMINI_API_KEY=your_key`
3. Verify → Check in `src/services/geminiService.js`

### Task: Change UI Colors
**Files to Edit**:
1. `tailwind.config.js` → Modify colors object
2. `src/index.css` → Update CSS variables
3. Components → Already use Tailwind classes

### Task: Add New Feature
**Files to Create/Edit**:
1. `src/components/NewComponent.jsx` → New component
2. `src/App.jsx` → Import and use component
3. `src/index.css` → Add styling if needed

### Task: Deploy to Production
**Files to Prepare**:
1. `.env` → Set production API key
2. `vite.config.js` → Already optimized
3. `package.json` → Already has build script
4. Deploy: `npm run build` → upload `dist/`

### Task: Debug Issue
**Files to Check** (in order):
1. `src/App.jsx` → State & main logic
2. `src/services/geminiService.js` → API calls
3. `src/index.css` → Styling issues
4. Browser console → Error messages

---

## 📊 File Statistics

| Category | File Count | Size |
|----------|-----------|------|
| Documentation | 7 files | ~100KB |
| Configuration | 8 files | ~10KB |
| Components | 5 files | ~15KB |
| Services | 1 file | ~8KB |
| Styles | 1 file | ~12KB |
| **Total** | **22 files** | **~145KB** |

---

## 🔄 Workflow Path

### For Setup
```
.env.example → .env (add key) → npm install → npm run dev ✅
```

### For Development
```
Edit component → Save → Hot reload → Browser refresh ✅
```

### For Production
```
Update .env → npm run build → Check dist/ → Deploy ✅
```

### For Debugging
```
Browser F12 → Check console → Read error → Check relevant file ✅
```

---

## 📝 Reading Order

### First Time Reading
1. `README.md` - Overview
2. `QUICK_START.md` - Setup
3. Try running locally
4. `PROJECT_SUMMARY.md` - Features

### Before Coding
1. `ARCHITECTURE.md` - Understand structure
2. Look at `src/App.jsx` - Main logic
3. Check `src/components/` - Component patterns
4. Reference `src/index.css` - Styling approach

### Before Deploying
1. `SETUP_GUIDE.md` - Production section
2. `SECURITY.md` - Security checklist
3. `PROJECT_SUMMARY.md` - Deployment checklist

### If Something Breaks
1. `SETUP_GUIDE.md` - Troubleshooting
2. `SECURITY.md` - API key issues
3. Browser console (F12) - Error messages

---

## 🎯 File Dependencies

```
App.jsx (main orchestrator)
├── Imports all components
├── Imports ChatSession from services
├── Uses localStorage API
└── Uses browser APIs (fetch, etc)

services/geminiService.js
├── Imports @google/generative-ai
├── Exports ChatSession class
└── Exports utility functions

Components/* (presentation layer)
├── ChatWindow.jsx
│   └── Uses MessageBubble, TypingIndicator
├── InputArea.jsx
│   └── Calls onSendMessage callback
├── MessageBubble.jsx
│   └── Uses react-markdown for rendering
└── Sidebar.jsx
    └── Displays conversation history

index.css
└── Provides all styling for all components
```

---

## 💡 Tips for Navigation

### Quick File Lookup
- **State management** → `src/App.jsx`
- **API calls** → `src/services/geminiService.js`
- **UI components** → `src/components/*.jsx`
- **Styling** → `src/index.css` atau `tailwind.config.js`
- **Configuration** → Root level `*.config.js` files

### Finding Specific Functionality
- **Chat sending** → `App.jsx` handleSendMessage()
- **Markdown rendering** → `MessageBubble.jsx` customComponents
- **Auto-scroll** → `ChatWindow.jsx` useEffect
- **Streaming** → `geminiService.js` sendMessage()

### Understanding Flow
1. User types → `InputArea.jsx`
2. Send click → `App.jsx` handleSendMessage()
3. API call → `geminiService.js` ChatSession.sendMessage()
4. Streaming update → `App.jsx` onChunk callback
5. Message render → `ChatWindow.jsx` + `MessageBubble.jsx`

---

## 🔐 Security Files

- ✅ `.env` - Stores API key securely
- ✅ `.gitignore` - Prevents .env from being committed
- ✅ `.eslintrc.cjs` - Code quality checks
- 📖 `SECURITY.md` - Security best practices

---

## 📌 Important Notes

### Never Edit Directly
- `.env.example` - Use as template only
- `node_modules/` - Auto-generated
- `dist/` - Build output

### Always Edit
- `src/` - Application code
- `src/index.css` - Styling
- `tailwind.config.js` - Theme
- `package.json` - Dependencies

### Be Careful With
- `.env` - Sensitive API key
- `.gitignore` - Security depends on this
- `src/services/geminiService.js` - API integration

---

## 🆘 Help Resources

**Quick Questions?**
→ Check `QUICK_START.md`

**Setup Issues?**
→ Check `SETUP_GUIDE.md` Troubleshooting

**Security Questions?**
→ Check `SECURITY.md`

**Architecture Questions?**
→ Check `ARCHITECTURE.md`

**Feature Questions?**
→ Check `PROJECT_SUMMARY.md`

**Still Stuck?**
→ Check all documentation files in order

---

## 📋 File Checklist

Before deployment, verify:
- [ ] `.env` file exists (not `.env.example`)
- [ ] API key is correct
- [ ] `.env` is in `.gitignore`
- [ ] All `package.json` dependencies installed
- [ ] `npm run build` completes successfully
- [ ] `dist/` folder generated
- [ ] No error in browser console
- [ ] Chat functionality works locally

---

## 🎓 Documentation Map

```
START HERE → README.md / QUICK_START.md
    ↓
Want to understand? → PROJECT_SUMMARY.md
    ↓
Need details? → SETUP_GUIDE.md
    ↓
Have errors? → SETUP_GUIDE.md Troubleshooting
    ↓
Security concerns? → SECURITY.md
    ↓
Want architecture? → ARCHITECTURE.md
    ↓
Need file reference? → FILE_INDEX.md (this file)
```

---

**Last Updated**: May 2026
**Total Files**: 22
**Ready to Use**: ✅ YES

**Next Step**: Read `QUICK_START.md` or `README.md` to begin!
