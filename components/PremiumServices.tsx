import React from 'react';
import { motion } from 'motion/react';
import { 
  Settings, 
  Sparkles, 
  Palette, 
  Gauge, 
  Gift, 
  ChevronRight, 
  ShieldCheck, 
  Cpu, 
  History, 
  Layers,
  Zap,
  Star
} from 'lucide-react';

const services = [
  {
    id: 1,
    title: "MANTENIMIENTO DE PRECISIÓN",
    text: "Servicio técnico especializado realizado por expertos certificados, enfocado en mantener el rendimiento, la seguridad y la esencia de ingeniería alemana en cada kilómetro.",
    includes: [
      "Diagnóstico avanzado",
      "Revisión integral",
      "Repuestos originales",
      "Historial técnico digital"
    ],
    tag: "Esencial",
    icon: Settings,
    color: "blue"
  },
  {
    id: 2,
    title: "DETAILING & PROTECCIÓN PREMIUM",
    text: "Procesos de detallado de alto nivel diseñados para restaurar, proteger y realzar cada superficie con acabados impecables.",
    includes: [
      "Pulido profesional",
      "Recubrimiento cerámico",
      "Protección de pintura (PPF)",
      "Limpieza profunda interior"
    ],
    tag: "Más elegido",
    icon: Sparkles,
    color: "gold"
  },
  {
    id: 3,
    title: "PERSONALIZACIÓN EXCLUSIVA",
    text: "Transforme su vehículo en una expresión única con opciones de personalización inspiradas en Porsche Exclusive Manufaktur.",
    includes: [
      "Acabados interiores",
      "Detalles exteriores",
      "Componentes en carbono",
      "Configuraciones únicas"
    ],
    tag: "Exclusivo",
    icon: Palette,
    color: "red"
  },
  {
    id: 4,
    title: "PERFORMANCE & OPTIMIZACIÓN",
    text: "Mejore la respuesta, potencia y comportamiento dinámico con ajustes diseñados para maximizar el rendimiento.",
    includes: [
      "Ajuste de suspensión",
      "Optimización de motor",
      "Sistemas de escape deportivos",
      "Configuración dinámica"
    ],
    tag: "Alto rendimiento",
    icon: Gauge,
    color: "emerald"
  },
  {
    id: 5,
    title: "ENTREGA & EXPERIENCIA VIP",
    text: "Reciba su Porsche en una experiencia personalizada, diseñada para marcar el inicio de una conexión única con su vehículo.",
    includes: [
      "Entrega especializada",
      "Asesor dedicado",
      "Presentación del vehículo",
      "Configuración inicial"
    ],
    tag: "Premium",
    icon: Gift,
    color: "purple"
  }
];

export default function PremiumServices() {
  return (
    <section id="services" className="py-32 bg-black text-white overflow-hidden relative">
      {/* Subtle Background Lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-8 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold text-xs uppercase tracking-[0.5em] font-bold mb-6 block">Excelencia en Cada Detalle</span>
            <h2 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter leading-none mb-8">
              INGENIERÍA DE <br />
              <span className="text-white/20">PRECISIÓN</span>
            </h2>
            <p className="text-white/40 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
              Cada servicio está diseñado para preservar, optimizar y elevar el rendimiento y la exclusividad de su Porsche.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative p-10 bg-[#0a0a0a] rounded-[2.5rem] border border-white/5 hover:border-gold/30 transition-all duration-700 overflow-hidden"
            >
              {/* Glass/Metal Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Service Tag */}
              <div className="absolute top-8 right-8">
                <span className="px-4 py-1.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-[8px] uppercase tracking-[0.2em] font-bold text-gold group-hover:bg-gold group-hover:text-black transition-all duration-500">
                  {service.tag}
                </span>
              </div>

              {/* Icon */}
              <div className="mb-10 relative">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-gold group-hover:bg-gold/10 transition-all duration-500 transform group-hover:rotate-6">
                  <service.icon size={32} strokeWidth={1.5} />
                </div>
                {/* Glow effect behind icon */}
                <div className="absolute inset-0 bg-gold/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              {/* Content */}
              <div className="space-y-6 relative z-10">
                <h3 className="text-2xl font-bold uppercase tracking-tight leading-tight group-hover:text-white transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-white/40 text-sm font-light leading-relaxed group-hover:text-white/60 transition-colors">
                  {service.text}
                </p>

                {/* Inclusions List */}
                <ul className="space-y-3 pt-4 border-t border-white/5">
                  {service.includes.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-white/30 group-hover:text-white/50 transition-colors">
                      <div className="w-1 h-1 bg-gold rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Action Button */}
                <div className="pt-8">
                  <button className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 group-hover:text-gold transition-all duration-500">
                    {index === 0 ? "Explorar servicio" : index === 4 ? "Solicitar atención" : "Descubrir más"}
                    <div className="w-8 h-px bg-white/10 group-hover:w-12 group-hover:bg-gold transition-all duration-500" />
                    <ChevronRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Subtle metallic reflection */}
              <div className="absolute -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent group-hover:animate-shimmer" />
            </motion.div>
          ))}
          
          {/* Call to Action Card or Empty space for layout balance if needed */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-10 bg-gold rounded-[2.5rem] flex flex-col justify-between group cursor-pointer hover:shadow-2xl hover:shadow-gold/20 transition-all duration-500"
          >
            <div className="space-y-4">
              <Star className="text-black" size={32} fill="black" />
              <h3 className="text-3xl font-bold text-black uppercase tracking-tighter leading-none">
                PROGRAME SU <br /> CITA HOY
              </h3>
              <p className="text-black/60 text-sm font-medium">
                Atención personalizada y prioritaria para propietarios exclusivos.
              </p>
            </div>
            
            <button className="w-full py-4 bg-black text-white text-[10px] uppercase tracking-widest font-bold rounded-2xl flex items-center justify-center gap-2 group-hover:gap-4 transition-all">
              Contactar Concierge <ChevronRight size={16} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
