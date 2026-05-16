import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Facebook, Youtube, ChevronRight, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-32 pb-12 border-t border-white/5">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-[0.4em] uppercase">PORSCHE</h2>
            <p className="text-white/40 text-sm font-light leading-relaxed max-w-xs">
              Experimente la cima de la ingeniería automotriz y el lujo. Cada Porsche es una obra maestra de precisión y rendimiento.
            </p>
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 block">Síguenos en nuestras redes</span>
              <div className="flex gap-6">
                <a 
                  href="https://www.instagram.com/porsche" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-gold hover:bg-white/10 transition-all duration-300 group"
                >
                  <Instagram size={18} className="group-hover:scale-110 transition-transform" />
                </a>
                <a 
                  href="https://www.facebook.com/porsche" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-gold hover:bg-white/10 transition-all duration-300 group"
                >
                  <Facebook size={18} className="group-hover:scale-110 transition-transform" />
                </a>
                <a 
                  href="https://wa.me/573000000000" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-gold hover:bg-white/10 transition-all duration-300 group"
                >
                  <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="sr-only">WhatsApp</span>
                </a>
                <a 
                  href="https://www.youtube.com/@Porsche" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-gold hover:bg-white/10 transition-all duration-300 group"
                >
                  <Youtube size={18} className="group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold">Modelos</h3>
            <ul className="space-y-4 text-sm font-light text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">911 Carrera</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Taycan</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Panamera</a></li>
              <li><a href="#" className="hover:text-white transition-colors">718 Cayman</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Macan</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cayenne</a></li>
            </ul>
          </div>

          <div className="space-y-8">
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold">Experiencia</h3>
            <ul className="space-y-4 text-sm font-light text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">Porsche Exclusive Manufaktur</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Porsche Classic</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Porsche Experience Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Porsche Motorsport</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Porsche Museum</a></li>
            </ul>
          </div>

          <div className="space-y-8">
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold">Boletín</h3>
            <p className="text-white/40 text-sm font-light">Manténgase al día con lo último de Porsche.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Su Correo Electrónico" 
                className="w-full bg-white/5 border-b border-white/20 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 text-white/40 hover:text-gold transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-8 text-[10px] uppercase tracking-widest font-medium text-white/20">
            <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Aviso Legal</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
            <a href="#" className="hover:text-white transition-colors">Accesibilidad</a>
          </div>
          <p className="text-[10px] uppercase tracking-widest font-medium text-white/20">
            © 2026 Porsche AG. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
