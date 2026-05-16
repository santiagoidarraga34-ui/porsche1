import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Play, X } from 'lucide-react';

interface HeroProps {
  onExploreModels: () => void;
}

export default function Hero({ onExploreModels }: HeroProps) {
  const [showVideoModal, setShowVideoModal] = useState(false);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Video with Parallax Effect */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full"
      >
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover object-center scale-105"
        >
          <source src="https://fnheurfhnavovtfsuqvb.supabase.co/storage/v1/object/sign/videos/Soft_rain_falling_202604111048.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYTg0ZDkyZi1kYzgzLTRmOTgtYmI0NS0xMTY1MGFiMjBmZmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlb3MvU29mdF9yYWluX2ZhbGxpbmdfMjAyNjA0MTExMDQ4Lm1wNCIsImlhdCI6MTc3ODM0MDcyNiwiZXhwIjoxODA5ODc2NzI2fQ.mHX5A_GjpHE1OvVpKDB0qeRgHNqM3xl96RsOgMuS2TQ" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-8 flex flex-col justify-center items-start pt-20">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-gold text-xs uppercase tracking-[0.4em] font-semibold mb-4 block"
          >
            El Ícono. Perfeccionado.
          </motion.span>
          
          <h1 className="text-7xl md:text-9xl font-bold text-white uppercase tracking-tighter leading-[0.85] mb-8">
            PORSCHE <br />
            <span className="text-white/40 text-4xl md:text-6xl tracking-widest block mt-4">Impulsado por sueños</span>
          </h1>
          
          <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-lg">
            La ingeniería de precisión se une al diseño atemporal. Experimente la cima de la excelencia automotriz.
          </p>

          <div className="flex flex-wrap gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onExploreModels}
              className="px-10 py-5 bg-white text-black text-xs uppercase tracking-[0.2em] font-bold flex items-center gap-3 hover:bg-gold transition-colors duration-300"
            >
              Explorar Modelos <ChevronRight size={16} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('configurator')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-5 border border-white/30 text-white text-xs uppercase tracking-[0.2em] font-bold flex items-center gap-3 hover:bg-white/10 transition-colors duration-300 backdrop-blur-md"
            >
              Configurar el Mío <ChevronRight size={16} />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
        <span className="text-[8px] text-white/40 uppercase tracking-[0.4em]">Deslizar para Explorar</span>
      </motion.div>

      {/* Floating Video Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 20 }}
        onClick={() => setShowVideoModal(true)}
        className="absolute bottom-10 right-10 w-20 h-20 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors group z-20"
      >
        <Play size={24} className="group-hover:scale-110 transition-transform" />
        <div className="absolute inset-0 rounded-full border border-white/40 animate-ping opacity-20" />
      </motion.button>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-20"
          >
            <button 
              onClick={() => setShowVideoModal(false)}
              className="absolute top-10 right-10 z-[210] p-4 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors"
            >
              <X size={32} />
            </button>
            
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="relative w-full max-w-6xl aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-gold/20"
            >
              <video 
                src="https://fnheurfhnavovtfsuqvb.supabase.co/storage/v1/object/sign/videos/Soft_rain_falling_202604111048.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYTg0ZDkyZi1kYzgzLTRmOTgtYmI0NS0xMTY1MGFiMjBmZmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlb3MvU29mdF9yYWluX2ZhbGxpbmdfMjAyNjA0MTExMDQ4Lm1wNCIsImlhdCI6MTc3ODM0MDcyNiwiZXhwIjoxODA5ODc2NzI2fQ.mHX5A_GjpHE1OvVpKDB0qeRgHNqM3xl96RsOgMuS2TQ"
                autoPlay 
                controls 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-10 left-10">
                <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold block mb-2">Proyección Cinematográfica</span>
                <h3 className="text-3xl font-bold uppercase tracking-tighter">Porsche: El Ícono</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
