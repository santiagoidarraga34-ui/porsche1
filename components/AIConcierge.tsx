import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles, Mic, Volume2, Search, MapPin, Headset, AlertCircle, ChevronLeft } from 'lucide-react';
import { chatWithConcierge, findPorscheCenters, getAdvancedPorscheInsight } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

export default function AIConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: "Bienvenido a la Porsche Exclusive Experience. Soy su concierge personal. ¿Cómo puedo asistirle en su viaje automotriz hoy?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'chat' | 'thinking' | 'maps' | 'support'>('chat');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      let responseText = "";
      if (mode === 'thinking') {
        responseText = await getAdvancedPorscheInsight(userMessage);
      } else if (mode === 'maps') {
        const result = await findPorscheCenters(userMessage);
        responseText = result.text;
      } else {
        responseText = await chatWithConcierge(userMessage, messages);
      }
      
      setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Me disculpo, pero estoy experimentando una dificultad técnica. Por favor, inténtelo de nuevo en un momento." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gold text-black rounded-full flex items-center justify-center shadow-2xl shadow-gold/40 z-[60]"
      >
        <MessageSquare size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-8 right-8 w-[400px] h-[600px] bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl z-[70] flex flex-col overflow-hidden backdrop-blur-xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-gold/10 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-white">Concierge Porsche</h3>
                  <span className="text-[8px] text-gold uppercase tracking-widest flex items-center gap-1">
                    <span className="w-1 h-1 bg-gold rounded-full animate-pulse" /> En línea
                  </span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Mode Selector */}
            <div className="px-6 py-3 border-b border-white/5 flex gap-4 overflow-x-auto scrollbar-hide">
              <button 
                onClick={() => setMode('chat')}
                className={`text-[8px] whitespace-nowrap uppercase tracking-widest font-bold flex items-center gap-2 transition-colors ${mode === 'chat' ? 'text-gold' : 'text-white/40 hover:text-white'}`}
              >
                <MessageSquare size={12} /> Chat
              </button>
              <button 
                onClick={() => setMode('thinking')}
                className={`text-[8px] whitespace-nowrap uppercase tracking-widest font-bold flex items-center gap-2 transition-colors ${mode === 'thinking' ? 'text-gold' : 'text-white/40 hover:text-white'}`}
              >
                <Sparkles size={12} /> Experto
              </button>
              <button 
                onClick={() => setMode('maps')}
                className={`text-[8px] whitespace-nowrap uppercase tracking-widest font-bold flex items-center gap-2 transition-colors ${mode === 'maps' ? 'text-gold' : 'text-white/40 hover:text-white'}`}
              >
                <MapPin size={12} /> Centros
              </button>
              <button 
                onClick={() => setMode('support')}
                className={`text-[8px] whitespace-nowrap uppercase tracking-widest font-bold flex items-center gap-2 transition-colors ${mode === 'support' ? 'text-gold' : 'text-white/40 hover:text-white'}`}
              >
                <Headset size={12} /> Soporte
              </button>
            </div>

            {/* Messages / Support View */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide relative">
              <AnimatePresence mode="wait">
                {mode === 'support' ? (
                  <motion.div
                    key="support-view"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 bg-[#0a0a0a] z-50 p-8 flex flex-col items-center justify-center text-center space-y-8"
                  >
                    <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                      <Headset size={40} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold uppercase tracking-widest mb-2">Centro de Soporte</h4>
                      <p className="text-white/40 text-xs leading-relaxed uppercase tracking-tighter">
                        Estamos aquí para resolver cualquier inconveniente con su experiencia Porsche.
                      </p>
                    </div>

                    <div className="w-full space-y-4">
                      <button className="w-full py-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-gold hover:text-black transition-all group flex items-center justify-center gap-3">
                        <AlertCircle size={18} className="text-gold group-hover:text-black" />
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Reportar Problema Técnico</span>
                      </button>
                      <button className="w-full py-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white hover:text-black transition-all group flex items-center justify-center gap-3">
                        <MessageSquare size={18} className="text-gold group-hover:text-black" />
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Hablar con el Staff</span>
                      </button>
                    </div>

                    <button 
                      onClick={() => setMode('chat')}
                      className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors pt-4"
                    >
                      <ChevronLeft size={14} /> Cancelar y Volver
                    </button>
                  </motion.div>
                ) : (
                  <div className="space-y-6">
                    {messages.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                          msg.role === 'user' 
                            ? 'bg-gold text-black font-medium rounded-tr-none' 
                            : 'bg-white/5 text-white/80 border border-white/10 rounded-tl-none'
                        }`}>
                          <div className="prose prose-invert prose-sm max-w-none">
                            <ReactMarkdown>
                              {msg.content}
                            </ReactMarkdown>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/10 flex gap-1">
                          <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" />
                          <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce [animation-delay:0.2s]" />
                          <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce [animation-delay:0.4s]" />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Input */}
            <div className="p-6 border-t border-white/10 bg-black/40">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={mode === 'maps' ? "Buscar Centros Porsche en..." : "Pregunta sobre Porsche..."}
                  className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-24 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-gold/50 transition-colors"
                />
                <div className="absolute right-2 flex gap-1">
                  <button className="p-2 text-white/40 hover:text-gold transition-colors">
                    <Mic size={18} />
                  </button>
                  <button 
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="p-2 bg-gold text-black rounded-full hover:bg-white transition-colors disabled:opacity-50"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
              <p className="text-[8px] text-white/20 uppercase tracking-widest text-center mt-4">
                Impulsado por Porsche Intelligence
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
