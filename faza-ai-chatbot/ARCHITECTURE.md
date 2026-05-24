# 🏗️ FAZA.AI - ARCHITECTURE & DESIGN GUIDE

## 📐 Application Architecture

### High-Level Overview
```
┌─────────────────────────────────────────────────────────┐
│                    Faza.Ai Application                  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │              React App (App.jsx)                │  │
│  │  - State Management (useState)                  │  │
│  │  - LocalStorage Persistence                    │  │
│  │  - Message Flow Control                        │  │
│  └──────────────────────────────────────────────────┘  │
│                          │                              │
│        ┌─────────────────┼─────────────────┐            │
│        │                 │                 │            │
│    ┌───▼────┐    ┌───────▼─────┐    ┌──────▼──┐       │
│    │Sidebar │    │ ChatWindow  │    │InputArea│       │
│    │- History│   │ - Messages  │    │- Input  │       │
│    │- Nav    │   │ - Auto Scroll│   │- Send   │       │
│    └────────┘    └─────────────┘    └─────────┘       │
│                          │                              │
│        ┌─────────────────┴─────────────────┐            │
│        │                                   │            │
│    ┌───▼──────────┐           ┌───────────▼──┐        │
│    │MessageBubble │           │TypingIndicator│        │
│    │- Markdown    │           │- Loading State│        │
│    │- Copy Button │           └───────────────┘        │
│    └──────────────┘                                    │
│                                                         │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│          geminiService.js (API Layer)                  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  ChatSession Class                               │  │
│  │  - sendMessage(message, onChunk)                │  │
│  │  - getHistory()                                 │  │
│  │  - clearHistory()                               │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Utility Functions                               │  │
│  │  - generateStreamingContent()                   │  │
│  │  - generateContent()                            │  │
│  │  - validateApiKey()                             │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│     Google Generative AI SDK (Gemini API)              │
│                                                         │
│  - GoogleGenerativeAI class                            │
│  - generateContentStream()                             │
│  - Chat interface dengan history                       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow Diagram

### Message Flow
```
User Input
    │
    ▼
InputArea (textarea)
    │
    ▼ onSendMessage()
App.jsx (handleSendMessage)
    │
    ├─ Add user message to state
    │  setMessages([...prev, userMsg])
    │
    ├─ Call ChatSession.sendMessage()
    │
    └─ Streaming Response Loop:
       │
       ├─ onChunk callback receives text chunk
       │
       ├─ Update AI message in real-time
       │  setMessages([...prev, aiMsg])
       │
       └─ After complete:
          ├─ Add to history
          ├─ Save to localStorage
          └─ Update conversation list
```

### State Management
```
App.jsx State:
├─ conversations: Array<{id, title, messages, createdAt}>
├─ activeConversation: {id, title, ...}
├─ messages: Array<{role, content, timestamp}>
├─ isLoading: boolean
├─ error: string | null
└─ chatSession: ChatSession instance

LocalStorage:
└─ faza_conversations: JSON string of all conversations
```

---

## 🎨 Component Tree

```
<App>
  ├─ <Sidebar>
  │  ├─ Header (Faza.Ai branding + New Chat button)
  │  ├─ ConversationsList
  │  │  └─ ConversationItem (each with delete button)
  │  └─ Footer (copyright)
  │
  └─ <div className="flex-1">
     ├─ <Header>
     │  ├─ Conversation Title
     │  ├─ Message Count
     │  └─ Loading Indicator
     │
     ├─ <ChatWindow>
     │  ├─ (conditional) <WelcomeMessage> OR
     │  ├─ MessagesList
     │  │  └─ <MessageBubble> (repeating)
     │  │     └─ Markdown-rendered content
     │  ├─ (conditional) <TypingIndicator>
     │  └─ (conditional) <ErrorMessage>
     │
     └─ <InputArea>
        ├─ <textarea> (auto-expand)
        ├─ Send Button
        ├─ Character Counter
        └─ Clear Chat Button
```

---

## 🔌 Component Props & State

### App.jsx
```javascript
State:
- conversations: Conversation[]
- activeConversation: Conversation | null
- messages: Message[]
- isLoading: boolean
- error: string | null
- chatSession: ChatSession

Methods:
- handleNewConversation()
- handleSendMessage(message: string)
- handleClearChat()
- handleDeleteConversation(id: string)
- loadConversation(id: string)
```

### Sidebar.jsx
```javascript
Props:
- conversations: Conversation[]
- activeConversation: Conversation | null
- onNewConversation: () => void
- onSelectConversation: (id: string) => void
- onDeleteConversation: (id: string) => void

State:
- isOpen: boolean (mobile sidebar toggle)
```

### ChatWindow.jsx
```javascript
Props:
- messages: Message[]
- isLoading: boolean
- error: string | null

No local state (presentational component)
```

### InputArea.jsx
```javascript
Props:
- onSendMessage: (message: string) => void
- isLoading: boolean
- onClearChat: () => void

State:
- message: string (textarea value)
- rows: number (auto-expand height)
```

### MessageBubble.jsx
```javascript
Props:
- message: string (markdown content)
- isUser: boolean

State:
- isCopied: boolean (copy button feedback)
```

---

## 🌀 Message Lifecycle

### 1. User Types & Sends
```javascript
User types "Hello"
    ↓
textarea onChange → setMessage("Hello")
    ↓
User clicks Send / Presses Enter
    ↓
handleSendMessage("Hello")
```

### 2. Message Processing
```javascript
handleSendMessage()
    ↓
Create userMsg object
    ↓
Add to messages state
    ↓
Call chatSession.sendMessage("Hello", onChunk)
```

### 3. Streaming Response
```javascript
chatSession.sendMessage() starts
    ↓
For each chunk from API:
    ├─ onChunk(chunk) called
    ├─ Update aiMsg.content += chunk
    └─ Update messages state
    ↓
All chunks received
    ↓
Save to localStorage
```

### 4. Persistence
```javascript
messages state updated
    ↓
useEffect watches messages
    ↓
Update activeConversation.messages
    ↓
useEffect watches conversations
    ↓
Save to localStorage
```

---

## 🎯 Styling Architecture

### Tailwind Layers
```css
/* Base Layer - HTML elements */
@layer base {
  * { transition-colors 250ms; }
  body { font-family: 'Segoe UI'; }
}

/* Components Layer - Custom classes */
@layer components {
  .glass-container { ... }
  .glass-card { ... }
  .glass-button { ... }
  .btn-primary { ... }
}

/* Utilities Layer - Tailwind utilities */
/* Automatically generated by Tailwind */
```

### Glass Effect Structure
```css
.glass-container {
  /* Blur effect */
  backdrop-filter: blur(10px);
  
  /* Semi-transparent background */
  background: rgba(255, 255, 255, 0.05);
  
  /* Subtle border */
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  /* Soft shadow */
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
```

### Color System
```css
/* Primary Brand */
--deep-blue: #1e1b4b

/* Accent */
--purple-accent: #7c3aed

/* Secondary */
--frosted: #f8fafc

/* Glass Overlay */
--glass: rgba(255, 255, 255, 0.1)
```

---

## 🔐 API Integration Architecture

### GoogleGenerativeAI Flow
```
Import SDK
    ↓
initializeGenAI()
    ├─ Create GoogleGenerativeAI instance
    └─ Store in genAI variable
    ↓
ChatSession.constructor()
    ├─ Get model: gemini-pro
    └─ Start chat: model.startChat()
    ↓
ChatSession.sendMessage()
    ├─ Send message with streaming
    │  chat.sendMessageStream(message)
    │
    └─ Process stream:
       ├─ For each chunk: onChunk(text)
       └─ Accumulate fullText
    ↓
Return response
```

### Environment Variable Access
```
.env file
└─ VITE_GEMINI_API_KEY=AIza...

import.meta.env
└─ VITE_GEMINI_API_KEY accessed during build

Vite Build Process
├─ Read .env file
├─ Inject variables
└─ Create optimized bundle

Browser Runtime
└─ Access via import.meta.env
   (No longer in .env, already bundled)
```

---

## 📦 Dependency Tree

```
faza-ai-chatbot
├─ react@18.2.0
│  └─ react-dom@18.2.0
│
├─ @google/generative-ai@0.3.0
│  └─ (Google's Generative AI SDK)
│
├─ lucide-react@0.344.0
│  └─ (Icon library)
│
├─ react-markdown@9.0.0
│  ├─ remark@14.x
│  ├─ remark-gfm@4.0.0
│  │  └─ (GitHub-flavored markdown)
│  └─ remarkast plugins
│
├─ highlight.js@11.9.0
│  └─ (Code syntax highlighting)
│
└─ tailwindcss@3.3.6
   ├─ postcss@8.4.31
   │  └─ (CSS processing)
   └─ autoprefixer@10.4.16
      └─ (Vendor prefixes)
```

---

## 🚀 Performance Optimization Strategy

### Code Splitting
```javascript
// Dynamic imports untuk lazy loading
const ChatWindow = lazy(() => 
  import('./components/ChatWindow')
);

// Suspense boundary dengan fallback
<Suspense fallback={<LoadingSpinner />}>
  <ChatWindow />
</Suspense>
```

### Memoization
```javascript
// Prevent unnecessary re-renders
const MessageBubble = memo(({ message, isUser }) => {
  return (/* component */);
}, (prevProps, nextProps) => {
  // Custom comparison logic
  return prevProps.message === nextProps.message;
});
```

### State Optimization
```javascript
// Split state untuk independent updates
const [messages, setMessages] = useState([]); // High frequency
const [conversations, setConversations] = useState([]); // Low frequency
const [error, setError] = useState(null); // Occasional
```

### Bundle Analysis
```bash
# Check what contributes to bundle size
npm run build

# Detailed breakdown
du -sh dist/*
ls -lh dist/*.js
```

---

## 🔄 Streaming Implementation Details

### How Streaming Works
```
1. Client sends message
   └─ chat.sendMessageStream(message)

2. Server starts generating response
   └─ Sends chunks via SSE/streaming

3. Client receives chunks iteratively
   ├─ onChunk("Hello") → setContent("Hello")
   ├─ onChunk(" ") → setContent("Hello ")
   ├─ onChunk("world") → setContent("Hello world")
   └─ ...continue until complete

4. User sees text appearing in real-time
   └─ Much better UX than waiting for full response
```

### Implementation
```javascript
const sendMessage = async (message, onChunk) => {
  const result = await chat.sendMessageStream(message);
  
  for await (const chunk of result.stream) {
    const text = chunk.text();
    onChunk(text); // Callback untuk UI update
  }
};
```

---

## 🗄️ Data Persistence Strategy

### LocalStorage Structure
```javascript
{
  "faza_conversations": [
    {
      "id": "1715000000000",
      "title": "Python Tips",
      "messages": [
        {
          "role": "user",
          "content": "How to...",
          "timestamp": "2025-05-13T10:00:00Z"
        },
        {
          "role": "assistant",
          "content": "Here's how...",
          "timestamp": "2025-05-13T10:00:05Z"
        }
      ],
      "createdAt": "2025-05-13T10:00:00Z"
    }
  ]
}
```

### Storage Limits
- Browser localStorage: ~5-10MB
- Average message: ~500 bytes
- Can store: ~10,000+ messages
- Auto-cleanup: Implement if needed

---

## 🧪 Testing Strategy (Optional)

### Unit Tests
```javascript
// geminiService.js testing
describe('ChatSession', () => {
  it('should send message and stream response', async () => {
    const session = new ChatSession();
    const response = await session.sendMessage('test');
    expect(response).toBeDefined();
  });
});
```

### Component Tests
```javascript
// MessageBubble.jsx testing
describe('MessageBubble', () => {
  it('should render markdown content', () => {
    const { getByText } = render(
      <MessageBubble message="**bold**" isUser={false} />
    );
    expect(getByText('bold')).toBeInTheDocument();
  });
});
```

---

## 📊 Monitoring & Analytics (Optional)

### Performance Metrics
```javascript
// Measure page load performance
const perfData = performance.getEntriesByType('navigation')[0];
console.log(`Load time: ${perfData.loadEventEnd - perfData.fetchStart}ms`);

// Measure streaming latency
const start = Date.now();
await chatSession.sendMessage(msg);
const latency = Date.now() - start;
```

### Error Tracking
```javascript
// Send errors to external service
const logError = (error) => {
  fetch('/api/logs', {
    method: 'POST',
    body: JSON.stringify({ error: error.message, stack: error.stack })
  });
};
```

---

## 🎓 Extension Points

### How to Add Features

#### 1. Voice Input
```javascript
// Add SpeechRecognition
const recognizer = new window.SpeechRecognition();
recognizer.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  handleSendMessage(transcript);
};
```

#### 2. File Upload
```javascript
// Add file input
<input 
  type="file" 
  onChange={(e) => {
    const file = e.target.files[0];
    // Process file...
  }}
/>
```

#### 3. Dark Mode
```javascript
// Toggle dark mode
const [isDark, setIsDark] = useState(false);
useEffect(() => {
  document.documentElement.classList.toggle('dark', isDark);
}, [isDark]);
```

---

**Version**: 1.0.0  
**Last Updated**: May 2026  
**Maintained**: Active ✅
