import React, { useState, useCallback, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import InputArea from './components/InputArea';
import { ChatSession } from './services/geminiService';

/**
 * Main App Component
 * Orchestrates chat functionality, history management, dan streaming
 */
function App() {
  // State Management
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chatSession, setChatSession] = useState(null);

  // Initialize app
  useEffect(() => {
    // Load conversations dari localStorage
    const savedConversations = localStorage.getItem('faza_conversations');
    if (savedConversations) {
      try {
        const parsed = JSON.parse(savedConversations);
        setConversations(parsed);
        
        // Load first conversation
        if (parsed.length > 0) {
          loadConversation(parsed[0].id);
        }
      } catch (err) {
        console.error('Error loading conversations:', err);
      }
    }

    // Initialize chat session
    try {
      const session = new ChatSession();
      setChatSession(session);
    } catch (err) {
      setError('❌ Failed to initialize chat. Check your API key in .env file');
      console.error('Chat initialization error:', err);
    }
  }, []);

  /**
   * Load conversation dari storage
   */
  const loadConversation = useCallback((conversationId) => {
    const conversation = conversations.find((c) => c.id === conversationId);
    if (conversation) {
      setActiveConversation(conversation);
      setMessages(conversation.messages || []);
      setError(null);
    }
  }, [conversations]);

  /**
   * Create new conversation
   */
  const handleNewConversation = useCallback(() => {
    const newConversation = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date().toISOString(),
    };

    setConversations((prev) => [newConversation, ...prev]);
    setActiveConversation(newConversation);
    setMessages([]);
    setError(null);

    // Reset chat session
    if (chatSession) {
      chatSession.clearHistory();
    }
  }, [chatSession]);

  /**
   * Handle sending message dengan streaming
   */
  const handleSendMessage = useCallback(
    async (userMessage) => {
      if (!userMessage.trim() || !chatSession || !activeConversation) return;

      setError(null);
      setIsLoading(true);

      try {
        // Add user message
        const userMsg = {
          role: 'user',
          content: userMessage,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMsg]);

        // Prepare AI response message
        let aiResponseContent = '';
        const aiMsg = {
          role: 'assistant',
          content: '',
          timestamp: new Date(),
        };

        // Send message dengan streaming
        await chatSession.sendMessage(userMessage, (chunk) => {
          aiResponseContent += chunk;
          aiMsg.content = aiResponseContent;

          // Update AI message real-time
          setMessages((prev) => {
            const updated = [...prev];
            if (
              updated[updated.length - 1]?.role === 'assistant' &&
              updated[updated.length - 1]?.content === ''
            ) {
              updated[updated.length - 1] = aiMsg;
            } else {
              updated.push(aiMsg);
            }
            return updated;
          });
        });

        // Update conversation title dari first message
        if (messages.length === 0) {
          const title = userMessage.substring(0, 50);
          setConversations((prev) =>
            prev.map((conv) =>
              conv.id === activeConversation.id
                ? { ...conv, title }
                : conv
            )
          );
        }
      } catch (err) {
        console.error('Send message error:', err);
        setError(
          err.message ||
          'Failed to get response. Please check your API key.'
        );
      } finally {
        setIsLoading(false);
      }
    },
    [chatSession, activeConversation, messages]
  );

  /**
   * Handle clear chat
   */
  const handleClearChat = useCallback(() => {
    if (window.confirm('Clear all messages in this chat?')) {
      setMessages([]);
      setError(null);

      // Update conversation
      if (activeConversation) {
        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === activeConversation.id
              ? { ...conv, messages: [], title: 'New Chat' }
              : conv
          )
        );
      }

      // Reset chat session
      if (chatSession) {
        chatSession.clearHistory();
      }
    }
  }, [activeConversation, chatSession]);

  /**
   * Handle delete conversation
   */
  const handleDeleteConversation = useCallback((conversationId) => {
    if (window.confirm('Delete this conversation?')) {
      setConversations((prev) => prev.filter((c) => c.id !== conversationId));

      if (activeConversation?.id === conversationId) {
        handleNewConversation();
      }
    }
  }, [activeConversation, handleNewConversation]);

  /**
   * Save conversations ke localStorage
   */
  useEffect(() => {
    if (activeConversation && messages.length > 0) {
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeConversation.id
            ? { ...conv, messages }
            : conv
        )
      );
    }
  }, [messages, activeConversation]);

  // Save conversations ke localStorage
  useEffect(() => {
    localStorage.setItem('faza_conversations', JSON.stringify(conversations));
  }, [conversations]);

  return (
    <div className="flex h-screen bg-gradient-mesh">
      {/* Sidebar */}
      <Sidebar
        conversations={conversations}
        activeConversation={activeConversation}
        onNewConversation={handleNewConversation}
        onSelectConversation={loadConversation}
        onDeleteConversation={handleDeleteConversation}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="border-b border-glass bg-glass-light/30 backdrop-blur-lg px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-lg md:text-xl font-bold text-gradient truncate">
                {activeConversation?.title || 'Faza.Ai'}
              </h2>
              {messages.length > 0 && (
                <p className="text-sm text-slate-400 mt-1">
                  {messages.length} messages • Last: {new Date(messages[messages.length - 1]?.timestamp).toLocaleTimeString()}
                </p>
              )}
            </div>

            {/* Status Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 text-purple-400">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-xs">Generating...</span>
              </div>
            )}
          </div>
        </header>

        {/* Chat Window */}
        <ChatWindow messages={messages} isLoading={isLoading} error={error} />

        {/* Input Area */}
        <InputArea
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          onClearChat={handleClearChat}
        />
      </div>
    </div>
  );
}

export default App;
