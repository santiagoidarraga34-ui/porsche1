import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Car, Settings, Sparkles, Palette, ChevronRight } from 'lucide-react';
import { PORSCHE_MODELS } from '../constants';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const suggestions = [
    { id: '911', label: '911 Carrera', type: 'model', icon: Car },
    { id: 'taycan', label: 'Taycan Electric', type: 'model', icon: Car },
    { id: 'configurator', label: 'Configurar mi Porsche', type: 'link', href: '#configurator', icon: Settings },
    { id: 'services', label: 'Servicios Premium', type: 'link', href: '#services', icon: Sparkles },
    { id: 'experience', label: 'Experiencia Cinemática', type: 'link', href: '#experience', icon: Palette },
  ];

  const filteredModels = query 
    ? PORSCHE_MODELS.filter(m => m.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center pt-32 px-8"
        >
          <button 
            onClick={onClose}
            className="absolute top-10 right-10 text-white/40 hover:text-white transition-colors"
          >
            <X size={32} strokeWidth={1} />
          </button>

          <div className="w-full max-w-4xl space-y-12">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gold" size={32} />
              <input
                ref={inputRef}
                type="text"
                placeholder="¿Qué Porsche estás buscando?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-white/5 border-b-2 border-white/10 p-8 pl-20 text-4xl font-bold text-white placeholder:text-white/10 focus:outline-none focus:border-gold transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold">Sugerencias Rápidas</h3>
                <div className="space-y-4">
                  {suggestions.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (item.href) {
                          window.location.href = item.href;
                          onClose();
                        } else {
                          setQuery(item.label);
                        }
                      }}
                      className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-gold/30 hover:bg-white/10 transition-all text-left group"
                    >
                      <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white/40 group-hover:text-gold transition-colors">
                        <item.icon size={18} />
                      </div>
                      <span className="text-sm font-medium">{item.label}</span>
                      <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all text-gold" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">
                  {query ? 'Modelos Encontrados' : 'Nuestros Modelos'}
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {(query ? filteredModels : PORSCHE_MODELS.slice(0, 3)).map((model) => (
                    <button
                      key={model.id}
                      onClick={() => {
                        window.location.href = '#models';
                        onClose();
                      }}
                      className="group flex items-center gap-6 p-4 rounded-2xl border border-white/5 hover:border-gold/20 transition-all overflow-hidden relative"
                    >
                      <div className="w-24 aspect-video rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={model.image} 
                          alt={model.name} 
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                      </div>
                      <div className="text-left">
                        <h4 className="text-xs font-bold uppercase tracking-widest">{model.name}</h4>
                        <p className="text-[10px] text-white/40 font-mono mt-1">${model.price.toLocaleString('es-CO')} COP</p>
                      </div>
                      <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
