import { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';

const AIAssistant = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hey! 👾 I'm GearBot, your gaming gear assistant! Ask me anything about our products, recommendations, or help building your setup!"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          system: `You are GearBot, an AI shopping assistant for GearForge — a premium gaming accessories e-commerce store. 

GearForge sells these categories: Keyboards, Mouse, Headsets, Controllers, Chairs, Mousepads, Webcams, Microphones.

Popular products include:
- Razer BlackWidow V3 Keyboard - ₹4,999
- Corsair K95 RGB Keyboard - ₹7,999
- Logitech G502 HERO Mouse - ₹3,499
- HyperX Cloud II Headset - ₹5,999
- Xbox Elite Controller Series 2 - ₹9,999
- Secretlab Titan Gaming Chair - ₹34,999
- Blue Yeti Microphone - ₹8,999
- Logitech C922 Webcam - ₹7,499

Help customers with:
- Product recommendations based on budget and needs
- Comparing products
- Building gaming setups
- Technical questions about gaming gear

Keep responses concise, friendly, and gaming-themed. Use gaming emojis occasionally. Always recommend products from our store.`,
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      const data = await response.json();
      const assistantMessage = {
        role: 'assistant',
        content: data.content[0].text
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting right now. Please try again! 🎮"
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 z-50 glass rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-primary/30"
          style={{ height: '500px' }}>
          
          {/* Header */}
          <div className="bg-primary px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaRobot className="text-white text-lg" />
              <div>
                <p className="text-white font-bold text-sm">GearBot</p>
                <p className="text-purple-200 text-xs">AI Shopping Assistant</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white hover:text-purple-200 transition">
              <FaTimes />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-surface">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                    <FaRobot className="text-white text-xs" />
                  </div>
                )}
                <div className={`max-w-xs px-4 py-2 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-primary text-white rounded-tr-none'
                    : 'bg-surfaceLight text-gray-200 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                  <FaRobot className="text-white text-xs" />
                </div>
                <div className="bg-surfaceLight px-4 py-3 rounded-2xl rounded-tl-none">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-surface border-t border-border flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about gaming gear..."
              className="flex-1 bg-surfaceLight border border-border rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-primary transition"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="bg-primary hover:bg-purple-700 disabled:opacity-50 text-white p-2 rounded-lg transition"
            >
              <FaPaperPlane className="text-sm" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary hover:bg-purple-700 text-white rounded-full shadow-lg flex items-center justify-center transition hover:scale-110"
      >
        {open ? <FaTimes className="text-xl" /> : <FaRobot className="text-xl" />}
      </button>
    </>
  );
};

export default AIAssistant;