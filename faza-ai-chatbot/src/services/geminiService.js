import { GoogleGenerativeAI } from '@google/generative-ai';

// ⚠️ API Key diambil dari environment variable
// Pastikan VITE_GEMINI_API_KEY ada di file .env
const getApiKey = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error(
      '❌ Error: VITE_GEMINI_API_KEY tidak ditemukan!\n' +
      'Pastikan file .env ada di root project dengan format:\n' +
      'VITE_GEMINI_API_KEY=your_api_key_here\n\n' +
      'Dapatkan API key dari: https://makersuite.google.com/app/apikey'
    );
  }
  
  return apiKey;
};

// Inisialisasi Gemini AI
let genAI = null;

const initializeGenAI = () => {
  if (!genAI) {
    const apiKey = getApiKey();
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
};

// Model configuration
const MODEL_NAME = 'gemini-pro';

/**
 * Generate content dengan streaming
 * @param {string} prompt - User message/prompt
 * @param {function} onChunk - Callback untuk setiap chunk yang diterima
 * @returns {Promise<string>} - Full response text
 */
export const generateStreamingContent = async (prompt, onChunk) => {
  try {
    const aiInstance = initializeGenAI();
    const model = aiInstance.getGenerativeModel({ model: MODEL_NAME });

    // Streaming request
    const result = await model.generateContentStream(prompt);

    let fullText = '';

    // Process streaming response
    for await (const chunk of result.stream) {
      const text = chunk.text();
      fullText += text;
      
      // Call callback untuk update UI real-time
      if (onChunk) {
        onChunk(text);
      }
    }

    return fullText;
  } catch (error) {
    console.error('❌ Gemini API Error:', error);
    
    // User-friendly error messages
    if (error.message.includes('API key')) {
      throw new Error('Invalid API Key. Cek konfigurasi .env file Anda.');
    } else if (error.message.includes('429')) {
      throw new Error('Rate limit tercapai. Tunggu beberapa saat sebelum mencoba lagi.');
    } else if (error.message.includes('500')) {
      throw new Error('Server Gemini API sedang maintenance. Coba lagi nanti.');
    }
    
    throw new Error(`Error: ${error.message}`);
  }
};

/**
 * Generate content tanpa streaming (untuk use case tertentu)
 * @param {string} prompt - User message
 * @returns {Promise<string>} - Response text
 */
export const generateContent = async (prompt) => {
  try {
    const aiInstance = initializeGenAI();
    const model = aiInstance.getGenerativeModel({ model: MODEL_NAME });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    return response.text();
  } catch (error) {
    console.error('❌ Gemini API Error:', error);
    throw new Error(`Error: ${error.message}`);
  }
};

/**
 * Chat interface dengan history
 */
export class ChatSession {
  constructor() {
    const aiInstance = initializeGenAI();
    const model = aiInstance.getGenerativeModel({ model: MODEL_NAME });
    this.chat = model.startChat({
      generationConfig: {
        maxOutputTokens: 2048,
      },
    });
    this.history = [];
  }

  /**
   * Send message dan get streaming response
   * @param {string} message - User message
   * @param {function} onChunk - Callback untuk streaming chunks
   * @returns {Promise<string>} - Full response
   */
  async sendMessage(message, onChunk) {
    try {
      // Add user message to history
      this.history.push({
        role: 'user',
        content: message,
        timestamp: new Date(),
      });

      // Send message dengan streaming
      const result = await this.chat.sendMessageStream(message);

      let fullText = '';

      // Process streaming
      for await (const chunk of result.stream) {
        const text = chunk.text();
        fullText += text;
        
        if (onChunk) {
          onChunk(text);
        }
      }

      // Add AI response to history
      this.history.push({
        role: 'assistant',
        content: fullText,
        timestamp: new Date(),
      });

      return fullText;
    } catch (error) {
      console.error('❌ Chat Error:', error);
      throw new Error(`Chat Error: ${error.message}`);
    }
  }

  /**
   * Get chat history
   * @returns {Array} - Conversation history
   */
  getHistory() {
    return this.history;
  }

  /**
   * Clear chat history
   */
  clearHistory() {
    this.history = [];
    const aiInstance = initializeGenAI();
    const model = aiInstance.getGenerativeModel({ model: MODEL_NAME });
    this.chat = model.startChat({
      generationConfig: {
        maxOutputTokens: 2048,
      },
    });
  }
}

/**
 * Utility: Validate API key format
 */
export const validateApiKey = () => {
  try {
    const apiKey = getApiKey();
    return apiKey.startsWith('AIza') && apiKey.length > 30;
  } catch {
    return false;
  }
};

export default {
  generateStreamingContent,
  generateContent,
  ChatSession,
  validateApiKey,
};
