import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ModelCatalog from './components/ModelCatalog';
import ModelExplorerOverlay from './components/ModelExplorerOverlay';
import Configurator from './components/Configurator';
import PremiumServices from './components/PremiumServices';
import AudioExperience from './components/AudioExperience';
import AIConcierge from './components/AIConcierge';
import Footer from './components/Footer';
import { Play, Camera, RefreshCw, Wand2, ChevronRight, Upload } from 'lucide-react';
import { generatePorscheVideo } from './services/geminiService';

export default function App() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [isModelExplorerOpen, setIsModelExplorerOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateVideo = async () => {
    if (!videoPreview) return;
    setIsGeneratingVideo(true);
    try {
      const base64 = videoPreview.split(',')[1];
      const videoUrl = await generatePorscheVideo(base64, "Anima este Porsche en una escena cinematográfica de carretera de montaña al atardecer.");
      setGeneratedVideoUrl(videoUrl || null);
    } catch (error) {
      console.error("Video generation failed:", error);
    } finally {
      setIsGeneratingVideo(false);
    }
  };

  return (
    <div className="bg-black min-h-screen font-sans selection:bg-gold selection:text-black">
      <Navbar />
      
      <main>
        <Hero onExploreModels={() => setIsModelExplorerOpen(true)} />
        
        <ModelCatalog />
        
        <Configurator />

        <PremiumServices />

        {/* Veo Video Generation Section */}
        <section id="experience" className="py-32 bg-[#050505] text-white">
          <div className="container mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-gold text-xs uppercase tracking-[0.4em] font-semibold mb-4 block">Experiencia Cinemática</span>
                <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none mb-8">
                  ANIMA TU <br />
                  <span className="text-white/20">PORSCHE SOÑADO</span>
                </h2>
                <p className="text-white/60 text-lg font-light leading-relaxed mb-10 max-w-lg">
                  Sube una foto de tu configuración o de tu propio Porsche, y nuestra IA le dará vida en una obra maestra cinematográfica.
                </p>

                <div className="space-y-6">
                  <div className="relative">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileChange}
                      className="hidden" 
                      id="video-upload" 
                    />
                    <label 
                      htmlFor="video-upload"
                      className="flex items-center gap-4 p-6 border border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                    >
                      <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
                        <Upload size={20} />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-widest font-bold block">Subir Imagen</span>
                        <span className="text-[8px] text-white/40 uppercase tracking-widest">{videoFile ? videoFile.name : 'JPG, PNG hasta 10MB'}</span>
                      </div>
                    </label>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGenerateVideo}
                    disabled={!videoPreview || isGeneratingVideo}
                    className="w-full py-5 bg-gold text-black text-[10px] uppercase tracking-[0.3em] font-bold flex items-center justify-center gap-3 hover:bg-white transition-colors duration-300 disabled:opacity-50"
                  >
                    {isGeneratingVideo ? <RefreshCw className="animate-spin" size={16} /> : <Wand2 size={16} />}
                    {isGeneratingVideo ? "Generando Cinemática..." : "Generar Video Veo"}
                  </motion.button>
                </div>
              </motion.div>

              <div className="relative aspect-[9/16] md:aspect-video bg-black rounded-3xl overflow-hidden border border-white/5 shadow-2xl shadow-gold/5">
                <AnimatePresence mode="wait">
                  {generatedVideoUrl ? (
                    <motion.video
                      key="generated-video"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      src={generatedVideoUrl}
                      controls
                      autoPlay
                      loop
                      className="w-full h-full object-cover"
                    />
                  ) : videoPreview ? (
                    <motion.img
                      key="preview-image"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      src={videoPreview}
                      className="w-full h-full object-cover opacity-50 grayscale"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-white/20">
                      <Play size={64} strokeWidth={1} />
                      <span className="text-[10px] uppercase tracking-[0.4em]">Esperando Creación</span>
                    </div>
                  )}
                </AnimatePresence>
                
                {isGeneratingVideo && (
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center gap-6">
                    <RefreshCw className="text-gold animate-spin" size={48} />
                    <div className="text-center space-y-2">
                      <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-white">Creando Obra Maestra Cinemática</p>
                      <p className="text-[8px] uppercase tracking-[0.2em] text-white/40">Esto puede tardar unos momentos</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

      </main>

      <AIConcierge />
      <AudioExperience />
      <ModelExplorerOverlay isOpen={isModelExplorerOpen} onClose={() => setIsModelExplorerOpen(false)} />
      <Footer />
    </div>
  );
}
