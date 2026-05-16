import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PORSCHE_MODELS } from '../constants';
import { CarModel } from '../types';
import { 
  ChevronRight, 
  Zap, 
  Gauge, 
  Timer, 
  Filter, 
  ArrowUpDown, 
  X, 
  Plus, 
  Check,
  Maximize2,
  Settings2,
  Scale
} from 'lucide-react';

export default function ModelCatalog() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedBodyType, setSelectedBodyType] = useState<string | null>(null);
  const [selectedEngineType, setSelectedEngineType] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'power' | 'newest'>('newest');
  const [selectedCar, setSelectedCar] = useState<CarModel | null>(null);
  const [comparisonList, setComparisonList] = useState<CarModel[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const filteredModels = useMemo(() => {
    let models = [...PORSCHE_MODELS];

    if (selectedBodyType) {
      models = models.filter(m => m.bodyType === selectedBodyType);
    }

    if (selectedEngineType) {
      models = models.filter(m => m.engineType === selectedEngineType);
    }

    models.sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'power') return b.power - a.power;
      if (sortBy === 'newest') return b.year - a.year;
      return 0;
    });

    return models;
  }, [selectedBodyType, selectedEngineType, sortBy]);

  const toggleComparison = (car: CarModel) => {
    if (comparisonList.find(c => c.id === car.id)) {
      setComparisonList(comparisonList.filter(c => c.id !== car.id));
    } else if (comparisonList.length < 3) {
      setComparisonList([...comparisonList, car]);
    }
  };

  return (
    <section id="models" className="py-32 bg-[#050505] text-white overflow-hidden">
      <div className="container mx-auto px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold text-xs uppercase tracking-[0.4em] font-semibold mb-4 block">Catálogo Exclusivo</span>
            <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none">
              MODELOS <br />
              <span className="text-white/20">DISPONIBLES</span>
            </h2>
          </motion.div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setFilterOpen(!filterOpen)}
              className={`flex items-center gap-2 px-6 py-3 border rounded-full text-[10px] uppercase tracking-widest font-bold transition-all duration-300 ${filterOpen ? 'bg-gold text-black border-gold' : 'border-white/10 hover:border-white/30'}`}
            >
              <Filter size={14} /> Filtros
            </button>
            
            <div className="relative group">
              <button className="flex items-center gap-2 px-6 py-3 border border-white/10 rounded-full text-[10px] uppercase tracking-widest font-bold hover:border-white/30 transition-all">
                <ArrowUpDown size={14} /> Ordenar
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-[#111111] border border-white/10 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all z-40">
                {[
                  { id: 'newest', label: 'Más Recientes' },
                  { id: 'price-asc', label: 'Precio: Menor a Mayor' },
                  { id: 'price-desc', label: 'Precio: Mayor a Menor' },
                  { id: 'power', label: 'Potencia' }
                ].map(option => (
                  <button
                    key={option.id}
                    onClick={() => setSortBy(option.id as any)}
                    className={`w-full px-6 py-4 text-left text-[10px] uppercase tracking-widest hover:bg-white/5 transition-colors ${sortBy === option.id ? 'text-gold' : 'text-white/60'}`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <AnimatePresence>
          {filterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-12 overflow-hidden"
            >
              <div className="p-8 bg-[#111111] rounded-3xl border border-white/5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="space-y-4">
                  <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Carrocería</span>
                  <div className="flex flex-wrap gap-2">
                    {['Deportivo', 'SUV', 'Sedán'].map(type => (
                      <button
                        key={type}
                        onClick={() => setSelectedBodyType(selectedBodyType === type ? null : type)}
                        className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest border transition-all ${selectedBodyType === type ? 'bg-white text-black border-white' : 'border-white/10 text-white/60 hover:border-white/30'}`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Motorización</span>
                  <div className="flex flex-wrap gap-2">
                    {['Combustión', 'Eléctrico', 'Híbrido'].map(type => (
                      <button
                        key={type}
                        onClick={() => setSelectedEngineType(selectedEngineType === type ? null : type)}
                        className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest border transition-all ${selectedEngineType === type ? 'bg-white text-black border-white' : 'border-white/10 text-white/60 hover:border-white/30'}`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-2 flex items-end justify-end">
                  <button 
                    onClick={() => {
                      setSelectedBodyType(null);
                      setSelectedEngineType(null);
                      setSortBy('newest');
                    }}
                    className="text-[10px] uppercase tracking-widest text-gold hover:text-white transition-colors flex items-center gap-2"
                  >
                    <RefreshCw size={12} /> Limpiar Filtros
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredModels.map((car, index) => (
              <CarCard 
                key={car.id} 
                car={car} 
                index={index} 
                onViewDetails={() => setSelectedCar(car)}
                onCompare={() => toggleComparison(car)}
                isCompared={!!comparisonList.find(c => c.id === car.id)}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Comparison Drawer */}
      <AnimatePresence>
        {comparisonList.length > 0 && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 w-full bg-[#111111]/90 backdrop-blur-xl border-t border-white/10 z-50 p-6"
          >
            <div className="container mx-auto flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div className="flex -space-x-4">
                  {comparisonList.map(car => (
                    <div key={car.id} className="w-16 h-16 rounded-full border-2 border-[#111111] overflow-hidden bg-black">
                      <img src={car.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-bold">Comparador ({comparisonList.length}/3)</h4>
                  <p className="text-[8px] text-white/40 uppercase tracking-widest">Selecciona hasta 3 modelos</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setComparisonList([])}
                  className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                >
                  Limpiar
                </button>
                <button 
                  onClick={() => setShowComparison(true)}
                  disabled={comparisonList.length < 2}
                  className="px-8 py-4 bg-gold text-black text-[10px] uppercase tracking-widest font-bold rounded-full disabled:opacity-50 flex items-center gap-2"
                >
                  <Scale size={14} /> Comparar Ahora
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <AnimatePresence>
        {selectedCar && (
          <CarDetailsModal car={selectedCar} onClose={() => setSelectedCar(null)} />
        )}
        {showComparison && (
          <ComparisonModal cars={comparisonList} onClose={() => setShowComparison(false)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function CarCard({ car, index, onViewDetails, onCompare, isCompared }: { 
  car: CarModel; 
  index: number; 
  onViewDetails: () => void;
  onCompare: () => void;
  isCompared: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-[#111111] rounded-3xl border border-white/5 overflow-hidden hover:border-gold/30 transition-all duration-500 flex flex-col"
    >
      {/* Metallic Reflection Effect */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${isHovered ? 'opacity-30' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
      </div>

      {/* Tag */}
      {car.tag && (
        <div className="absolute top-6 left-6 z-20">
          <span className="px-3 py-1 bg-gold text-black text-[8px] uppercase tracking-widest font-bold rounded-full shadow-lg shadow-gold/20">
            {car.tag}
          </span>
        </div>
      )}

      {/* Image Section */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <motion.img 
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.8 }}
          src={isHovered && car.hoverImage ? car.hoverImage : car.image} 
          alt={car.name} 
          className="w-full h-full object-cover transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-60" />
        
        {/* Quick Actions Overlay */}
        <div className={`absolute inset-0 flex items-center justify-center gap-4 bg-black/40 backdrop-blur-sm transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button 
            onClick={onViewDetails}
            className="p-4 bg-white text-black rounded-full hover:bg-gold transition-colors"
            title="Ver Detalles"
          >
            <Maximize2 size={20} />
          </button>
          <button 
            onClick={onCompare}
            className={`p-4 rounded-full border transition-all ${isCompared ? 'bg-gold border-gold text-black' : 'bg-black/50 border-white/20 text-white hover:bg-white hover:text-black'}`}
            title="Comparar"
          >
            {isCompared ? <Check size={20} /> : <Plus size={20} />}
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-8 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-1 block">{car.bodyType} • {car.engineType}</span>
            <h3 className="text-3xl font-bold uppercase tracking-tight group-hover:text-gold transition-colors">{car.name}</h3>
          </div>
          <div className="text-right">
            <span className="text-[8px] text-white/40 uppercase tracking-widest block mb-1">Desde</span>
            <span className="text-xl font-bold text-white">${car.price.toLocaleString('es-CO')}</span>
          </div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-3 gap-4 py-6 border-y border-white/5 mb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-white/30">
              <Zap size={12} />
              <span className="text-[8px] uppercase tracking-widest">Potencia</span>
            </div>
            <span className="text-sm font-bold">{car.power} HP</span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-white/30">
              <Timer size={12} />
              <span className="text-[8px] uppercase tracking-widest">0-100</span>
            </div>
            <span className="text-sm font-bold">{car.acceleration}s</span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-white/30">
              <Gauge size={12} />
              <span className="text-[8px] uppercase tracking-widest">V. Máx</span>
            </div>
            <span className="text-sm font-bold">{car.topSpeed} km/h</span>
          </div>
        </div>

        <div className="mt-auto flex gap-4">
          <button 
            onClick={onViewDetails}
            className="flex-1 py-4 bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all duration-300 rounded-xl"
          >
            Detalles
          </button>
          <button className="flex-1 py-4 bg-gold text-black text-[10px] uppercase tracking-widest font-bold hover:bg-white transition-all duration-300 rounded-xl flex items-center justify-center gap-2">
            Configurar <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function CarDetailsModal({ car, onClose }: { car: CarModel; onClose: () => void }) {
  const [activeImage, setActiveImage] = useState(car.image);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
    >
      <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={onClose} />
      
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        className="relative w-full max-w-7xl h-full max-h-[90vh] bg-[#0a0a0a] rounded-[40px] border border-white/10 overflow-hidden flex flex-col lg:flex-row shadow-2xl"
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 z-50 p-4 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors"
        >
          <X size={24} />
        </button>

        {/* Gallery Section */}
        <div className="lg:w-3/5 h-[40vh] lg:h-full relative bg-black">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              src={activeImage}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
          
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10">
            {car.gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(img)}
                className={`w-20 h-12 rounded-lg overflow-hidden border-2 transition-all ${activeImage === img ? 'border-gold' : 'border-transparent opacity-50 hover:opacity-100'}`}
              >
                <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="lg:w-2/5 h-full overflow-y-auto p-12 lg:p-20 space-y-12 scrollbar-hide">
          <div>
            <span className="text-gold text-xs uppercase tracking-[0.4em] font-semibold mb-4 block">{car.year} • {car.bodyType}</span>
            <h2 className="text-5xl font-bold uppercase tracking-tighter mb-6">{car.name}</h2>
            <p className="text-white/60 text-lg font-light leading-relaxed">
              {car.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {[
              { label: 'Potencia', value: `${car.power} HP` },
              { label: '0-100 km/h', value: `${car.acceleration} s` },
              { label: 'Vel. Máxima', value: `${car.topSpeed} km/h` },
              { label: 'Torque', value: car.specs.torque },
              { label: 'Transmisión', value: car.specs.transmission },
              { label: 'Tracción', value: car.specs.drive },
              { label: 'Peso', value: car.specs.weight },
              { label: 'Asientos', value: car.specs.seats }
            ].map((spec, i) => (
              <div key={i} className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">{spec.label}</span>
                <p className="text-lg font-bold text-white">{spec.value}</p>
              </div>
            ))}
          </div>

          <div className="pt-12 border-t border-white/10 space-y-6">
            <div className="flex justify-between items-end">
              <span className="text-xs text-white/40 uppercase tracking-widest">Precio Base</span>
              <span className="text-4xl font-bold text-gold">${car.price.toLocaleString('es-CO')}</span>
            </div>
            
            <div className="flex flex-col gap-4">
              <button className="w-full py-6 bg-gold text-black text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white transition-all duration-500 rounded-2xl">
                Configurar este modelo
              </button>
              <div className="flex gap-4">
                <button className="flex-1 py-5 border border-white/10 text-[10px] uppercase tracking-widest font-bold hover:bg-white/5 transition-all rounded-2xl">
                  Solicitar Cotización
                </button>
                <button className="flex-1 py-5 border border-white/10 text-[10px] uppercase tracking-widest font-bold hover:bg-white/5 transition-all rounded-2xl">
                  Hablar con Asesor
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ComparisonModal({ cars, onClose }: { cars: CarModel[]; onClose: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-8"
    >
      <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={onClose} />
      
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        className="relative w-full max-w-6xl bg-[#0a0a0a] rounded-[40px] border border-white/10 overflow-hidden p-12 lg:p-20 shadow-2xl"
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-4 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-16">
          <span className="text-gold text-xs uppercase tracking-[0.4em] font-semibold mb-4 block">Análisis Técnico</span>
          <h2 className="text-5xl font-bold uppercase tracking-tighter">COMPARATIVA <span className="text-white/20">DE MODELOS</span></h2>
        </div>

        <div className="grid grid-cols-4 gap-8">
          {/* Labels Column */}
          <div className="pt-48 space-y-12">
            {[
              'Precio Base',
              'Potencia',
              '0-100 km/h',
              'Vel. Máxima',
              'Motorización',
              'Carrocería',
              'Transmisión',
              'Tracción'
            ].map(label => (
              <div key={label} className="h-12 flex items-center">
                <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">{label}</span>
              </div>
            ))}
          </div>

          {/* Cars Columns */}
          {cars.map(car => (
            <div key={car.id} className="space-y-12 text-center">
              <div className="h-48 flex flex-col items-center gap-6">
                <img src={car.image} className="w-full h-24 object-contain" referrerPolicy="no-referrer" />
                <h3 className="text-xl font-bold uppercase tracking-tight">{car.name}</h3>
              </div>
              
              <div className="h-12 flex items-center justify-center">
                <span className="text-lg font-bold text-gold">${car.price.toLocaleString('es-CO')}</span>
              </div>
              <div className="h-12 flex items-center justify-center">
                <span className="text-lg font-bold">{car.power} HP</span>
              </div>
              <div className="h-12 flex items-center justify-center">
                <span className="text-lg font-bold">{car.acceleration} s</span>
              </div>
              <div className="h-12 flex items-center justify-center">
                <span className="text-lg font-bold">{car.topSpeed} km/h</span>
              </div>
              <div className="h-12 flex items-center justify-center">
                <span className="text-lg font-bold">{car.engineType}</span>
              </div>
              <div className="h-12 flex items-center justify-center">
                <span className="text-lg font-bold">{car.bodyType}</span>
              </div>
              <div className="h-12 flex items-center justify-center">
                <span className="text-sm font-medium text-white/60">{car.specs.transmission}</span>
              </div>
              <div className="h-12 flex items-center justify-center">
                <span className="text-sm font-medium text-white/60">{car.specs.drive}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function RefreshCw({ size }: { size: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}
