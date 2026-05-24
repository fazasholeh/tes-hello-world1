import React, { useState } from 'react';
import { Menu, X, Plus, Trash2, MessageCircle } from 'lucide-react';

/**
 * Sidebar Component
 * Menampilkan chat history dan navigation
 */
const Sidebar = ({
  conversations,
  activeConversation,
  onNewConversation,
  onSelectConversation,
  onDeleteConversation,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Toggle Button - Mobile */}
      <button
        onClick={toggleSidebar}
        className="fixed bottom-6 right-6 md:hidden btn-primary z-50 shadow-lg"
        title="Toggle sidebar"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Container */}
      <div
        className={`fixed md:relative left-0 top-0 h-screen w-64 bg-glass-light border-r border-glass backdrop-blur-xl transform transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="border-b border-glass p-4 space-y-3">
          <h1 className="text-xl font-bold text-gradient">Faza.Ai</h1>

          <button
            onClick={() => {
              onNewConversation();
              setIsOpen(false);
            }}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            <span>New Chat</span>
          </button>
        </div>

        {/* Conversations List */}
        <div className="overflow-y-auto h-[calc(100vh-140px)] p-3 space-y-2">
          {conversations.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <MessageCircle size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">Belum ada percakapan</p>
            </div>
          ) : (
            conversations.map((conv) => (
              <div
                key={conv.id}
                className={`sidebar-item group ${
                  activeConversation?.id === conv.id ? 'active' : ''
                }`}
                onClick={() => {
                  onSelectConversation(conv.id);
                  setIsOpen(false);
                }}
              >
                <div className="flex items-start gap-2 justify-between">
                  {/* Title */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-100 truncate">
                      {conv.title || 'Untitled Chat'}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {conv.messageCount || 0} pesan
                    </p>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteConversation(conv.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-500/20 rounded"
                    title="Delete conversation"
                  >
                    <Trash2 size={14} className="text-red-400" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-glass p-3 bg-glass-light/30 text-xs text-slate-400">
          <p>© 2026 Faza.Ai</p>
          <p className="mt-1">Powered by Google Gemini</p>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
