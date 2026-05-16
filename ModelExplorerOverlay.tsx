import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PORSCHE_MODELS } from '../constants';
import { CarModel } from '../types';
import { 
  X, 
  Zap, 
  Gauge, 
  Timer, 
  ChevronRight, 
  Filter, 
  ArrowUpDown,
  Maximize2,
  Info
} from 'lucide-react';

interface ModelExplorerOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModelExplorerOverlay({ isOpen, onClose }: ModelExplorerOverlayProps) {
  const [selectedBodyType, setSelectedBodyType] = useState<string | null>(null);
  const [selectedEngineType, setSelectedEngineType] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'power'>('price-desc');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const filteredModels = useMemo(() => {
    let models = [...PORSCHE_MODELS];
    if (selectedBodyType) models = models.filter(m => m.bodyType === selectedBodyType);
    if (selectedEngineType) models = models.filter(m => m.engineType === selectedEngineType);
    
    models.sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'power') return b.power - a.power;
      return 0;
    });
    return models;
  }, [selectedBodyType, selectedEngineType, sortBy]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] bg-black text-white overflow-y-auto scrollbar-hide"
        >
          {/* Background Ambient Glow */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-gold/10 blur-[150px] rounded-full" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/5 blur-[150px] rounded-full" />
          </div>

          {/* Top Bar */}
          <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 px-8 py-6">
            <div className="container mx-auto flex items-center justify-between">
              <div className="flex items-center gap-12">
                <div>
                  <h2 className="text-xl font-bold uppercase tracking-[0.3em]">Explorador de Modelos</h2>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Descubra la ingeniería de precisión</p>
                </div>

                <div className="hidden lg:flex items-center gap-6">
                  <div className="flex bg-white/5 p-1 rounded-full border border-white/10">
                    {['Todos', 'Deportivo', 'SUV', 'Sedán'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedBodyType(type === 'Todos' ? null : type)}
                        className={`px-6 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all ${
                          (type === 'Todos' && !selectedBodyType) || selectedBodyType === type 
                            ? 'bg-white text-black' 
                            : 'text-white/40 hover:text-white'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                onClick={onClose}
                className="flex items-center gap-4 group p-2 pr-6 bg-white/5 hover:bg-white text-white hover:text-black rounded-full transition-all duration-500 border border-white/10"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-black/5 flex items-center justify-center">
                  <X size={20} />
                </div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Cancelar Exploración</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="container mx-auto px-8 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              <AnimatePresence mode="popLayout">
                {filteredModels.map((model, index) => (
                  <motion.div
                    key={model.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                    className="group"
                  >
                    <div className="relative aspect-[16/10] bg-[#111111] rounded-[32px] overflow-hidden border border-white/5 hover:border-gold/30 transition-all duration-700">
                      <img 
                        src={model.image} 
                        alt={model.name} 
                        className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                      
                      <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-gold font-bold mb-1 block">{model.tag || model.bodyType}</span>
                          <h3 className="text-3xl font-bold uppercase tracking-tighter">{model.name}</h3>
                        </div>
                        <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-gold hover:text-black transition-all">
                          <Info size={20} />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8 px-4 space-y-8">
                      <div className="flex justify-between items-center py-4 border-b border-white/5">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">Inversión Desde</span>
                        <span className="text-xl font-bold">${model.price.toLocaleString('es-CO')} COP</span>
                      </div>

                      <div className="grid grid-cols-3 gap-8">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-white/20">
                            <Zap size={12} />
                            <span className="text-[10px] uppercase tracking-widest">Poder</span>
                          </div>
                          <p className="text-sm font-bold tracking-widest">{model.power} HP</p>
                        </div>
                        <div className="space-y-1 text-center">
                          <div className="flex items-center justify-center gap-2 text-white/20">
                            <Timer size={12} />
                            <span className="text-[10px] uppercase tracking-widest">0-100</span>
                          </div>
                          <p className="text-sm font-bold tracking-widest">{model.acceleration}s</p>
                        </div>
                        <div className="space-y-1 text-right">
                          <div className="flex items-center justify-end gap-2 text-white/20">
                            <Gauge size={12} />
                            <span className="text-[10px] uppercase tracking-widest">Top</span>
                          </div>
                          <p className="text-sm font-bold tracking-widest">{model.topSpeed} km/h</p>
                        </div>
                      </div>

                      <button 
                        onClick={() => {
                          window.location.hash = 'configurator';
                          onClose();
                        }}
                        className="w-full py-5 bg-white/5 border border-white/10 rounded-2xl text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-white hover:text-black transition-all duration-500 flex items-center justify-center gap-3"
                      >
                        Configurar Ahora <ChevronRight size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
