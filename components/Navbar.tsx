import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Menu, Search, User, ShoppingBag } from 'lucide-react';
import SearchOverlay from './SearchOverlay';
import LoginOverlay from './LoginOverlay';

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm"
      >
        <div className="flex items-center gap-8">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-white hover:text-gold transition-colors duration-300"
          >
            <Menu size={24} />
          </button>
          <div className="hidden md:flex items-center gap-6 text-[10px] uppercase tracking-[0.2em] font-medium text-white/70">
            <a href="#models" className="hover:text-white transition-colors">Modelos</a>
            <a href="#configurator" className="hover:text-white transition-colors">Configurar</a>
            <a href="#services" className="hover:text-white transition-colors">Servicios</a>
            <a href="#experience" className="hover:text-white transition-colors">Experiencia</a>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2">
          <h1 className="text-2xl font-bold tracking-[0.4em] text-white uppercase">PORSCHE</h1>
        </div>

        <div className="flex items-center gap-6 text-white">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="hover:text-gold transition-colors duration-300"
          >
            <Search size={20} />
          </button>
          <button 
            onClick={() => setIsLoginOpen(true)}
            className="hover:text-gold transition-colors duration-300"
          >
            <User size={20} />
          </button>
          <button className="hover:text-gold transition-colors duration-300 relative">
            <ShoppingBag size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red rounded-full text-[8px] flex items-center justify-center">0</span>
          </button>
        </div>
      </motion.nav>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <LoginOverlay isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
