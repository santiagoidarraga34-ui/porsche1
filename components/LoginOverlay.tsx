import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, ChevronRight, User } from 'lucide-react';

interface LoginOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginOverlay({ isOpen, onClose }: LoginOverlayProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-3xl flex items-center justify-center px-8"
        >
          {/* Close / Cancel Button */}
          <button 
            onClick={onClose}
            className="absolute top-10 right-10 text-white/40 hover:text-white transition-colors flex items-center gap-2 group"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity">Cancelar</span>
            <X size={32} strokeWidth={1} />
          </button>

          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="w-full max-w-md space-y-12"
          >
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <User size={32} className="text-gold" />
              </div>
              <h2 className="text-4xl font-bold uppercase tracking-tighter text-white">
                PORSCHE <span className="text-white/20">ID</span>
              </h2>
              <p className="text-white/40 text-xs uppercase tracking-widest leading-relaxed">
                Inicie sesión para acceder a su garaje exclusivo y configuraciones guardadas.
              </p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-4">
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold transition-colors" size={18} />
                  <input
                    type="email"
                    placeholder="Correo Electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 p-5 pl-14 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:border-gold focus:bg-white/10 transition-all text-sm"
                  />
                </div>

                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold transition-colors" size={18} />
                  <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 p-5 pl-14 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:border-gold focus:bg-white/10 transition-all text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center px-2">
                <button type="button" className="text-[10px] uppercase tracking-widest text-white/40 hover:text-gold transition-colors">¿Olvidó su contraseña?</button>
              </div>

              <button className="w-full py-5 bg-white text-black text-[10px] uppercase tracking-[0.4em] font-bold rounded-2xl hover:bg-gold transition-all duration-500 shadow-xl hover:shadow-gold/20 flex items-center justify-center gap-2">
                Iniciar Sesión <ChevronRight size={14} />
              </button>
            </form>

            <div className="pt-8 border-t border-white/5 text-center">
              <p className="text-[10px] uppercase tracking-widest text-white/20">¿Aún no tiene un Porsche ID?</p>
              <button className="mt-4 text-gold text-[10px] uppercase tracking-[0.3em] font-bold hover:text-white transition-colors">Registrarse ahora</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
