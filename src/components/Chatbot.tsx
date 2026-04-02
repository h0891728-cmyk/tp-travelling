import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { chatWithBot } from '../lib/localBot';
import ReactMarkdown from 'react-markdown';

type Message = {
  id: string;
  role: 'user' | 'model';
  text: string;
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hello! ðŸ‘‹ I'm your travel assistant. Where are you dreaming of going next, or what can I help you organize today?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom of the chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim() || isLoading) return;

    const userText = inputMessage.trim();
    setInputMessage('');
    
    // Add user message to state
    const newUserMsg: Message = { id: Date.now().toString(), role: 'user', text: userText };
    setMessages(prev => [...prev, newUserMsg]);
    setIsLoading(true);

    try {
      // Format history for Gemini API
      const historyForGemini = messages.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));

      // Send to local bot
      const responseText = await chatWithBot(userText, historyForGemini);

      // Add response
      if (responseText) {
        setMessages(prev => [
          ...prev, 
          { id: (Date.now() + 1).toString(), role: 'model', text: responseText }
        ]);
      }
    } catch (error) {
       setMessages(prev => [
          ...prev, 
          { id: (Date.now() + 1).toString(), role: 'model', text: "I'm having connectivity issues right now. Could you please try again?" }
        ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div 
          className="mb-4 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col transform transition-all duration-300 ease-in-out"
          style={{ height: '500px', maxHeight: '80vh' }}
        >
          {/* Header */}
          <div className="bg-[#61c5a8] p-4 text-white flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded-full">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Travel Assistant</h3>
                <p className="text-xs text-[#e0f4ed] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-300 rounded-full inline-block animate-pulse"></span>
                  Online
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-[#e0f4ed] hover:text-white hover:bg-white/10 p-1 rounded-md transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50 space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-2 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {/* Avatar */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === 'user' ? 'bg-slate-200 text-slate-600' : 'bg-[#e0f4ed] text-[#61c5a8]'
                  }`}>
                    {message.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  
                  {/* Bubble */}
                  <div className={`px-4 py-2.5 rounded-2xl text-sm ${
                    message.role === 'user' 
                      ? 'bg-[#61c5a8] text-white rounded-tr-none' 
                      : 'bg-white text-slate-700 border border-slate-100 shadow-sm rounded-tl-none prose prose-sm prose-slate max-w-none'
                  }`}>
                    {message.role === 'user' ? (
                      message.text
                    ) : (
                      // @ts-ignore
                      <ReactMarkdown components={{
                        p: ({node, ...props}) => <p className="m-0 break-words" {...props} />,
                        a: ({node, ...props}) => <a className="text-[#61c5a8] hover:underline" {...props} />,
                        ul: ({node, ...props}) => <ul className="pl-4 my-1 space-y-1 list-disc" {...props} />,
                        ol: ({node, ...props}) => <ol className="pl-4 my-1 space-y-1 list-decimal" {...props} />,
                        li: ({node, ...props}) => <li className="m-0" {...props} />
                      }}>
                        {message.text}
                      </ReactMarkdown>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-2 max-w-[85%]">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#e0f4ed] text-[#61c5a8] flex items-center justify-center">
                    <Bot size={16} />
                  </div>
                  <div className="px-4 py-3 bg-white text-slate-700 border border-slate-100 shadow-sm rounded-2xl rounded-tl-none flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-[#61c5a8]/60 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-[#61c5a8]/60 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-[#61c5a8]/60 rounded-full animate-bounce"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-slate-100">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about a destination..."
                className="flex-1 bg-slate-50 border border-slate-200 text-sm rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#61c5a8]/30 focus:border-[#61c5a8] transition-all"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="bg-[#61c5a8] text-white p-2.5 rounded-full hover:bg-[#4eb396] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex-shrink-0"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} className="ml-0.5" />}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-[#61c5a8] text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center ${
          isOpen ? 'scale-0 opacity-0 absolute' : 'scale-100 opacity-100'
        }`}
        aria-label="Toggle Chat"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  );
};

export default Chatbot;
