
import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile, Paperclip, MoreVertical } from 'lucide-react';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Luis T.', text: '¿Alguien sabe si el cielo está despejado en Oro Verde?', time: '18:45', isMe: false },
    { id: 2, sender: 'Yo', text: 'Aquí en Paraná está excelente. Salgo para allá en 15 min.', time: '18:47', isMe: true },
    { id: 3, sender: 'Ana P.', text: 'Recuerden que el domo 2 tiene un pequeño juego en el eje, úsenlo con cuidado.', time: '18:50', isMe: false },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: 'Yo',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };

    setMessages([...messages, newMessage]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)]">
      <div className="flex justify-between items-center mb-4 px-2">
        <h2 className="text-xl font-bold flex items-center gap-2 dark:text-white">
          Chat General
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
        </h2>
        <button className="text-slate-500 hover:text-blue-500 transition-colors"><MoreVertical size={20} /></button>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide"
      >
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}
          >
            {!msg.isMe && (
              <span className="text-[10px] font-black text-slate-500 mb-1 ml-2 uppercase tracking-tighter">{msg.sender}</span>
            )}
            <div 
              className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm shadow-sm ${
                msg.isMe 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white dark:bg-[#1c2128] text-slate-700 dark:text-slate-200 rounded-tl-none border border-slate-200 dark:border-white/5'
              }`}
            >
              {msg.text}
              <div className={`text-[9px] mt-1.5 font-bold uppercase ${msg.isMe ? 'text-blue-100/70 text-right' : 'text-slate-400'}`}>
                {msg.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="mt-4 flex gap-2 items-center bg-white dark:bg-[#161b22] border border-slate-200 dark:border-white/10 p-2 rounded-2xl shadow-xl">
        <button type="button" className="p-2 text-slate-400 hover:text-blue-500 transition-colors">
          <Smile size={20} />
        </button>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-1 bg-transparent text-sm outline-none px-2 dark:text-white"
        />
        <button type="button" className="p-2 text-slate-400 hover:text-blue-500 transition-colors">
          <Paperclip size={20} />
        </button>
        <button 
          type="submit"
          className="bg-blue-600 p-2.5 rounded-xl text-white shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default Chat;
