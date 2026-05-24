import React, { useEffect, useRef } from 'react';
import MessageBubble, {
  TypingIndicator,
  WelcomeMessage,
  ErrorMessage,
} from './MessageBubble';

/**
 * ChatWindow Component
 * Menampilkan semua pesan dan handle auto-scroll
 */
const ChatWindow = ({ messages, isLoading, error }) => {
  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Auto-scroll ke pesan terbaru
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div
      ref={chatContainerRef}
      className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4"
    >
      {/* Empty State dengan Welcome Message */}
      {messages.length === 0 && !isLoading && !error && (
        <div className="flex items-center justify-center h-full">
          <WelcomeMessage />
        </div>
      )}

      {/* Messages List */}
      <div className="space-y-3">
        {messages.map((msg, index) => (
          <div key={index}>
            <MessageBubble message={msg.content} isUser={msg.role === 'user'} />

            {/* Spacing antara user dan assistant */}
            {index < messages.length - 1 && msg.role === 'user' && (
              <div className="h-2"></div>
            )}
          </div>
        ))}
      </div>

      {/* Loading State */}
      {isLoading && <TypingIndicator />}

      {/* Error Message */}
      {error && <ErrorMessage error={error} />}

      {/* Scroll anchor */}
      <div ref={chatEndRef} className="h-0" />
    </div>
  );
};

export default ChatWindow;
