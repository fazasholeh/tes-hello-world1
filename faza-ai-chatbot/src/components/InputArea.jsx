import React, { useRef, useEffect, useState } from 'react';
import { Send, Trash2, Loader } from 'lucide-react';

/**
 * InputArea Component
 * Textarea yang auto-expand dengan tombol send & clear
 */
const InputArea = ({ onSendMessage, isLoading, onClearChat }) => {
  const textareaRef = useRef(null);
  const [message, setMessage] = useState('');
  const [rows, setRows] = useState(1);

  // Auto-expand textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const newRows = Math.min(Math.ceil(scrollHeight / 24), 8); // Max 8 rows
      setRows(newRows);
      textareaRef.current.style.height = scrollHeight + 'px';
    }
  }, [message]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
      setRows(1);
    }
  };

  // Handle Enter to send (Shift+Enter untuk newline)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="border-t border-glass bg-glass-light/30 backdrop-blur-lg p-4 md:p-6 space-y-4">
      {/* Input Wrapper */}
      <div className="flex gap-2 items-end">
        {/* Textarea */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Ketik pesan Anda di sini... (Shift+Enter untuk newline)"
            rows={rows}
            disabled={isLoading}
            className="glass-input disabled:opacity-60 disabled:cursor-not-allowed"
          />
        </div>

        {/* Send Button */}
        <button
          onClick={handleSendMessage}
          disabled={isLoading || !message.trim()}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 min-w-max"
          title="Send message (Enter)"
        >
          {isLoading ? (
            <Loader size={20} className="animate-spin" />
          ) : (
            <Send size={20} />
          )}
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 justify-between items-center">
        <p className="text-xs text-slate-400">
          {message.length} karakter | Shift+Enter untuk newline
        </p>

        <button
          onClick={onClearChat}
          disabled={isLoading}
          className="btn-secondary text-red-400 hover:text-red-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          title="Clear chat history"
        >
          <Trash2 size={16} />
          <span className="text-sm">Clear</span>
        </button>
      </div>
    </div>
  );
};

export default InputArea;
