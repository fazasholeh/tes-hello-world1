import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * Component untuk menampilkan pesan individual dengan Markdown support
 */
const MessageBubble = ({ message, isUser }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Custom markdown components untuk styling lebih baik
  const customComponents = {
    // Heading
    h1: ({ node, ...props }) => (
      <h1 className="text-2xl font-bold mt-4 mb-2 text-purple-300" {...props} />
    ),
    h2: ({ node, ...props }) => (
      <h2 className="text-xl font-bold mt-3 mb-2 text-purple-300" {...props} />
    ),
    h3: ({ node, ...props }) => (
      <h3 className="text-lg font-bold mt-2 mb-1 text-purple-300" {...props} />
    ),

    // Code block
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : '';

      return inline ? (
        <code
          className="bg-deep-blue-light/50 px-2 py-1 rounded text-sm font-mono text-purple-200"
          {...props}
        >
          {children}
        </code>
      ) : (
        <pre className="bg-deep-blue-light/60 border border-glass rounded-lg p-4 overflow-x-auto my-3 shadow-glass">
          <div className="text-xs text-slate-400 mb-2 font-mono">{language}</div>
          <code className="text-purple-100 font-mono text-sm" {...props}>
            {children}
          </code>
        </pre>
      );
    },

    // Links
    a: ({ node, ...props }) => (
      <a
        className="text-purple-400 hover:text-purple-300 underline transition-colors"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    ),

    // Lists
    ul: ({ node, ...props }) => (
      <ul className="list-disc list-inside my-2 space-y-1" {...props} />
    ),
    ol: ({ node, ...props }) => (
      <ol className="list-decimal list-inside my-2 space-y-1" {...props} />
    ),
    li: ({ node, ...props }) => (
      <li className="text-slate-100 ml-2" {...props} />
    ),

    // Blockquote
    blockquote: ({ node, ...props }) => (
      <blockquote
        className="border-l-4 border-purple-accent pl-4 py-2 my-2 text-slate-300 italic bg-glass-light/30 rounded"
        {...props}
      />
    ),

    // Paragraphs
    p: ({ node, ...props }) => (
      <p className="text-slate-100 mb-2 leading-relaxed" {...props} />
    ),

    // Tables
    table: ({ node, ...props }) => (
      <div className="overflow-x-auto my-2">
        <table
          className="border-collapse border border-glass rounded-lg overflow-hidden"
          {...props}
        />
      </div>
    ),
    th: ({ node, ...props }) => (
      <th
        className="border border-glass bg-glass-light/50 px-3 py-2 text-purple-200 font-semibold text-left"
        {...props}
      />
    ),
    td: ({ node, ...props }) => (
      <td className="border border-glass px-3 py-2 text-slate-100" {...props} />
    ),

    // Horizontal rule
    hr: ({ node, ...props }) => (
      <hr className="border-glass my-4" {...props} />
    ),
  };

  return (
    <div className={`message-${isUser ? 'user' : 'ai'}`}>
      <div
        className={`bubble-${isUser ? 'user' : 'ai'} px-4 py-3 relative group`}
      >
        {/* Content dengan Markdown Rendering */}
        <div className="prose prose-invert prose-sm max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={customComponents}
          >
            {message}
          </ReactMarkdown>
        </div>

        {/* Copy Button - Hanya untuk AI Messages */}
        {!isUser && (
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-glass-light rounded-lg"
            title="Copy message"
          >
            {isCopied ? (
              <Check size={16} className="text-green-400" />
            ) : (
              <Copy size={16} className="text-slate-300" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * Typing Indicator Component
 */
export const TypingIndicator = () => {
  return (
    <div className="message-ai">
      <div className="bubble-ai px-4 py-3">
        <div className="typing-indicator">
          <div className="typing-dot"></div>
          <div className="typing-dot" style={{ animationDelay: '0.1s' }}></div>
          <div className="typing-dot" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

/**
 * Error Message Component
 */
export const ErrorMessage = ({ error }) => {
  return (
    <div className="message-ai mb-4">
      <div className="bubble-ai px-4 py-3 bg-red-500/20 border-red-500/50">
        <p className="text-red-200 font-semibold mb-1">⚠️ Error</p>
        <p className="text-red-100 text-sm">{error}</p>
      </div>
    </div>
  );
};

/**
 * Welcome Message Component
 */
export const WelcomeMessage = () => {
  return (
    <div className="message-ai mb-4">
      <div className="bubble-ai px-4 py-3">
        <p className="text-lg font-semibold text-purple-300 mb-2">
          👋 Selamat datang di Faza.Ai!
        </p>
        <p className="text-slate-100 text-sm leading-relaxed">
          Saya adalah AI Assistant yang siap membantu Anda. Mulai percakapan dengan
          mengajukan pertanyaan atau meminta bantuan dengan apa pun yang Anda butuhkan.
        </p>
        <div className="mt-3 text-xs text-slate-400">
          💡 Tip: Saya dapat membantu dengan coding, writing, analisis, dan banyak lagi!
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
