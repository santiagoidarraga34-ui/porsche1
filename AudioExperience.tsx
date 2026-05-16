import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Zap, Car } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AudioExperience() {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [carAnimationKey, setCarAnimationKey] = useState(0);

  // Powerful engine sound (Royalty free sports car engine)
  const engineSoundUrl = "https://cdn.pixabay.com/audio/2022/03/10/audio_c8c8a73484.mp3";

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        if (audioRef.current && !isMuted) {
          audioRef.current.play().catch(() => {});
        }
      }
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('scroll', handleFirstInteraction);
    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
    };
  }, [hasInteracted]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.15; // Subtle but powerful background level
      if (!isMuted && hasInteracted) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.log("Playback prevented:", err);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMuted, hasInteracted]);

  const toggleSound = () => {
    if (!hasInteracted) setHasInteracted(true);
    setIsMuted(!isMuted);
    setCarAnimationKey(prev => prev + 1);
  };

  return (
    <div className="fixed bottom-10 left-10 z-50 flex items-center justify-center">
      <div className="relative group w-fit h-fit">
        {/* The Mini Porsche Car Animation */}
        <AnimatePresence mode="popLayout">
          {carAnimationKey > 0 && (
            <motion.div
              key={carAnimationKey}
              initial={{ offsetDistance: "0%" }}
              animate={{ offsetDistance: "100%" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute pointer-events-none z-10"
              style={{
                offsetPath: `inset(0% round 999px)`,
                offsetRotate: "auto 180deg",
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Car size={16} className="text-gold fill-gold" strokeWidth={2.5} />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleSound}
          className={`relative p-4 rounded-full backdrop-blur-xl border transition-all duration-500 flex items-center gap-3 ${
            !isMuted ? 'bg-gold text-black border-gold shadow-lg shadow-gold/20' : 'bg-white/5 text-white/40 border-white/10'
          }`}
        >
          <AnimatePresence mode="wait">
            {isMuted ? (
              <motion.div
                key="muted"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
              >
                <VolumeX size={20} />
              </motion.div>
            ) : (
              <motion.div
                key="unmuted"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
              >
                <Volume2 size={20} />
              </motion.div>
            )}
          </AnimatePresence>
          
          {!isMuted && (
            <motion.span 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              className="text-[10px] uppercase tracking-[0.2em] font-bold overflow-hidden whitespace-nowrap"
            >
              Motor Activo
            </motion.span>
          )}
        </motion.button>
      </div>

      <audio 
        ref={audioRef} 
        src={engineSoundUrl} 
        loop 
        preload="auto"
      />

      {/* Visual audio waves when playing */}
      {!isMuted && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-end gap-1 h-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              animate={{
                height: [4, 12, 6, 16, 4],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                delay: i * 0.1,
              }}
              className="w-0.5 bg-gold rounded-full"
            />
          ))}
        </div>
      )}
    </div>
  );
}
