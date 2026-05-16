import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EXTERIOR_COLORS, WHEEL_DESIGNS, INTERIOR_MATERIALS, INTERIOR_COLORS, PORSCHE_MODELS } from '../constants';
import { ChevronRight, RefreshCw, Save, Share2, Camera, Wand2, Info, Check, Sparkles, MessageSquare, Quote } from 'lucide-react';
import { generatePorscheImage } from '../services/geminiService';
import { ExteriorColor, WheelDesign, InteriorMaterial, InteriorColor } from '../types';

export default function Configurator() {
  const [selectedCar, setSelectedCar] = useState(PORSCHE_MODELS[0]);
  const [config, setConfig] = useState({
    color: EXTERIOR_COLORS[0],
    wheels: WHEEL_DESIGNS[0],
    interiorMaterial: INTERIOR_MATERIALS[0],
    interiorColor: INTERIOR_COLORS[0],
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [hoveredOption, setHoveredOption] = useState<any>(null);

  const handleGenerateAI = async () => {
    // Play revving sound effect
    const revSound = new Audio("https://cdn.pixabay.com/audio/2022/03/10/audio_783d4a0231.mp3");
    revSound.volume = 0.4;
    revSound.play().catch(() => {});

    setIsGenerating(true);
    try {
      const prompt = `A ${selectedCar.name} in ${config.color.name} with ${config.wheels.name}. Interior in ${config.interiorMaterial.name} ${config.interiorColor.name}. Professional automotive photography, studio lighting.`;
      const imageUrl = await generatePorscheImage(prompt);
      setGeneratedImage(imageUrl);
    } catch (error) {
      console.error("Failed to generate image:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const totalPrice = selectedCar.price + config.color.price + config.wheels.price + config.interiorMaterial.price;

  const getStyleType = () => {
    const isSporty = config.color.category === 'Deportivo' || config.wheels.category === 'Alto Rendimiento' || config.interiorMaterial.sensation === 'Deportivo';
    const isElegant = config.color.category === 'Elegante' || config.interiorMaterial.sensation === 'Lujo';
    if (isSporty && isElegant) return 'Performance de Lujo';
    if (isSporty) return 'Deportivo Puro';
    return 'Elegancia Atemporal';
  };

  return (
    <section id="configurator" className="py-32 bg-black text-white min-h-screen">
      <div className="container mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold text-xs uppercase tracking-[0.4em] font-semibold mb-4 block">Atelier de Personalización</span>
            <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none">
              ESCRIBE TU <br />
              <span className="text-white/20">PROPIA HISTORIA</span>
            </h2>
          </motion.div>
          
          <div className="flex flex-col items-end gap-2">
            <span className="text-xs text-white/40 uppercase tracking-widest">Inversión en Exclusividad</span>
            <span className="text-4xl font-bold text-gold">${totalPrice.toLocaleString('es-CO')} COP</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Preview Area */}
          <div className="lg:col-span-7 space-y-8">
            <div className="sticky top-32 space-y-8">
              <div className="relative aspect-[16/9] bg-[#0a0a0a] rounded-3xl overflow-hidden border border-white/5 group shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={generatedImage || selectedCar.image}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    src={generatedImage || selectedCar.image} 
                    alt="Porsche Configurator Preview" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                
                {/* Overlay Controls */}
                <div className="absolute bottom-8 left-8 flex gap-4">
                  <button 
                    onClick={() => setGeneratedImage(null)}
                    className="p-4 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-full transition-all hover:scale-110"
                    title="Reiniciar Vista"
                  >
                    <RefreshCw size={20} />
                  </button>
                  <button className="p-4 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-full transition-all hover:scale-110">
                    <Camera size={20} />
                  </button>
                </div>

                <div className="absolute top-8 right-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleGenerateAI}
                    disabled={isGenerating}
                    className="px-6 py-3 bg-gold text-black text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 rounded-full shadow-lg shadow-gold/40 disabled:opacity-50"
                  >
                    {isGenerating ? <RefreshCw className="animate-spin" size={14} /> : <Wand2 size={14} />}
                    {isGenerating ? "Visualizando..." : "Generar Vista IA"}
                  </motion.button>
                </div>

                {/* Aspirational Phrase */}
                <div className="absolute bottom-8 right-8 text-right">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/60 italic">"Configura una presencia única"</p>
                </div>
              </div>

              {/* Model Selection */}
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {PORSCHE_MODELS.map(model => (
                  <button
                    key={model.id}
                    onClick={() => setSelectedCar(model)}
                    className={`p-3 rounded-xl border transition-all duration-500 ${selectedCar.id === model.id ? 'border-gold bg-gold/10 scale-105' : 'border-white/5 bg-white/5 hover:border-white/20'}`}
                  >
                    <span className="text-[8px] uppercase tracking-widest font-bold block truncate">{model.name}</span>
                  </button>
                ))}
              </div>

              {/* Dynamic Summary Panel */}
              <motion.div 
                layout
                className="p-8 bg-[#111111] rounded-3xl border border-white/5 space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold">Resumen de Configuración</h3>
                  <span className="px-3 py-1 bg-white/5 rounded-full text-[8px] uppercase tracking-widest font-bold">{getStyleType()}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <span className="text-[8px] uppercase tracking-widest text-white/40">Exterior</span>
                    <p className="text-xs font-bold">{config.color.name} • {config.color.finish}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[8px] uppercase tracking-widest text-white/40">Rines</span>
                    <p className="text-xs font-bold">{config.wheels.name}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[8px] uppercase tracking-widest text-white/40">Interior</span>
                    <p className="text-xs font-bold">{config.interiorMaterial.name} • {config.interiorColor.name}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[8px] uppercase tracking-widest text-white/40">Estilo</span>
                    <p className="text-xs font-bold text-gold">{getStyleType()}</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex gap-4">
                  <button className="flex-1 py-4 bg-white text-black text-[10px] uppercase tracking-widest font-bold rounded-xl hover:bg-gold transition-colors">Solicitar Cotización</button>
                  <button className="flex-1 py-4 border border-white/10 text-[10px] uppercase tracking-widest font-bold rounded-xl hover:bg-white/5 transition-colors">Hablar con Asesor</button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Controls Area */}
          <div className="lg:col-span-5 space-y-12">
            {/* Exterior Color */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Color Exterior</span>
                  <Sparkles size={12} className="text-gold" />
                </div>
                <span className="text-[10px] text-gold font-bold uppercase tracking-widest">{config.color.name}</span>
              </div>
              
              <div className="grid grid-cols-6 gap-3">
                {EXTERIOR_COLORS.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setConfig({ ...config, color })}
                    onMouseEnter={() => setHoveredOption(color)}
                    onMouseLeave={() => setHoveredOption(null)}
                    className={`relative w-full aspect-square rounded-full border-2 transition-all duration-500 ${config.color.name === color.name ? 'border-gold scale-110 shadow-lg shadow-gold/20' : 'border-transparent hover:scale-105'}`}
                    style={{ backgroundColor: color.hex }}
                  >
                    {config.color.name === color.name && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Check size={16} className="text-white drop-shadow-md" />
                      </div>
                    )}
                    {color.tag && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-gold rounded-full" />
                    )}
                  </button>
                ))}
              </div>

              {/* Option Details Card */}
              <AnimatePresence>
                {hoveredOption && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="p-6 bg-[#111111] rounded-2xl border border-white/10 space-y-3"
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-bold uppercase tracking-widest">{hoveredOption.name}</h4>
                      {hoveredOption.tag && <span className="text-[8px] bg-gold text-black px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">{hoveredOption.tag}</span>}
                    </div>
                    <p className="text-[10px] text-white/60 leading-relaxed italic">"{hoveredOption.description}"</p>
                    <div className="flex gap-4 pt-2">
                      <div className="space-y-1">
                        <span className="text-[8px] uppercase tracking-widest text-white/30">Beneficio</span>
                        <p className="text-[9px] font-medium">{hoveredOption.benefit}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[8px] uppercase tracking-widest text-white/30">Acabado</span>
                        <p className="text-[9px] font-medium">{hoveredOption.finish}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Wheels */}
            <div className="space-y-6">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold block">Diseño de Rines</span>
              <div className="space-y-3">
                {WHEEL_DESIGNS.map(wheel => (
                  <button
                    key={wheel.id}
                    onClick={() => setConfig({ ...config, wheels: wheel })}
                    className={`group w-full p-6 rounded-2xl border text-left transition-all duration-500 ${config.wheels.id === wheel.id ? 'border-gold bg-gold/5' : 'border-white/5 bg-white/5 hover:border-white/20'}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase tracking-widest font-bold">{wheel.name}</span>
                          {wheel.tag && <span className="text-[8px] text-gold font-bold uppercase tracking-widest">{wheel.tag}</span>}
                        </div>
                        <p className="text-[9px] text-white/40 leading-relaxed max-w-xs">{wheel.description}</p>
                      </div>
                      <span className="text-[10px] font-bold text-gold">{wheel.price > 0 ? `+$${wheel.price.toLocaleString('es-CO')}` : 'Incluido'}</span>
                    </div>
                    <div className="flex gap-4 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center gap-1.5">
                        <Info size={10} className="text-gold" />
                        <span className="text-[8px] uppercase tracking-widest text-white/60">{wheel.benefit}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Interior Material */}
            <div className="space-y-6">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold block">Experiencia Interior</span>
              <div className="grid grid-cols-1 gap-3">
                {INTERIOR_MATERIALS.map(material => (
                  <button
                    key={material.id}
                    onClick={() => setConfig({ ...config, interiorMaterial: material })}
                    className={`w-full p-6 rounded-2xl border text-left transition-all duration-500 ${config.interiorMaterial.id === material.id ? 'border-gold bg-gold/5' : 'border-white/5 bg-white/5 hover:border-white/20'}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase tracking-widest font-bold">{material.name}</span>
                          {material.tag && <span className="text-[8px] bg-white/10 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">{material.tag}</span>}
                        </div>
                        <p className="text-[9px] text-white/40 leading-relaxed">{material.description}</p>
                      </div>
                      <span className="text-[10px] font-bold text-gold">{material.price > 0 ? `+$${material.price.toLocaleString('es-CO')}` : 'Incluido'}</span>
                    </div>
                    <div className="flex gap-6 mt-4">
                      <div className="space-y-1">
                        <span className="text-[8px] uppercase tracking-widest text-white/30">Sensación</span>
                        <p className="text-[9px] font-bold text-gold">{material.sensation}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[8px] uppercase tracking-widest text-white/30">Uso Recomendado</span>
                        <p className="text-[9px] font-bold">{material.recommendedUse}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Interior Color */}
            <div className="space-y-6">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold block">Tonalidad Interior</span>
              <div className="flex gap-4">
                {INTERIOR_COLORS.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setConfig({ ...config, interiorColor: color })}
                    className={`w-12 h-12 rounded-xl border-2 transition-all duration-500 ${config.interiorColor.name === color.name ? 'border-gold scale-110 shadow-lg shadow-gold/20' : 'border-transparent hover:scale-105'}`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {config.interiorColor.name === color.name && <Check size={16} className="mx-auto text-white drop-shadow-md" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-12 border-t border-white/10 space-y-6">
              <div className="p-6 bg-gold/5 rounded-2xl border border-gold/20 flex items-center gap-4">
                <div className="p-3 bg-gold/10 rounded-full">
                  <Sparkles size={20} className="text-gold" />
                </div>
                <div>
                  <h5 className="text-[10px] uppercase tracking-widest font-bold text-gold">Recomendación del Atelier</h5>
                  <p className="text-[9px] text-white/60">Basado en tu elección de {config.color.name}, sugerimos los rines {WHEEL_DESIGNS[1].name} para un look más {config.color.category.toLowerCase()}.</p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button className="w-full py-6 bg-white text-black text-[10px] uppercase tracking-[0.3em] font-bold flex items-center justify-center gap-3 hover:bg-gold transition-all duration-500 rounded-2xl shadow-xl hover:shadow-gold/20">
                  Finalizar Configuración <ChevronRight size={16} />
                </button>
                <div className="flex gap-4">
                  <button className="flex-1 py-4 border border-white/10 text-[10px] uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-white/5 transition-colors rounded-xl">
                    <Save size={14} /> Guardar
                  </button>
                  <button className="flex-1 py-4 border border-white/10 text-[10px] uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-white/5 transition-colors rounded-xl">
                    <Share2 size={14} /> Compartir
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

