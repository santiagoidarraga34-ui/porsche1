import { CarModel, ExteriorColor, WheelDesign, InteriorMaterial, InteriorColor } from './types';

export const PORSCHE_MODELS: CarModel[] = [
  {
    id: '911-carrera',
    name: '911 Carrera',
    price: 457600000,
    power: 379,
    acceleration: 4.0,
    topSpeed: 293,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1920&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1920&auto=format&fit=crop',
    description: 'El ícono de los autos deportivos. Precisión, rendimiento y puro placer de conducir.',
    engineType: 'Combustión',
    bodyType: 'Deportivo',
    year: 2024,
    tag: 'Más Vendido',
    specs: {
      torque: '450 Nm',
      transmission: 'PDK de 8 velocidades',
      drive: 'Tracción trasera',
      weight: '1,505 kg',
      seats: 4
    },
    gallery: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1920&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1920&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611859328053-3cbc9f9399f4?q=80&w=1920&auto=format&fit=crop'
    ]
  },
  {
    id: 'taycan-turbo-s',
    name: 'Taycan Turbo S',
    price: 779600000,
    power: 750,
    acceleration: 2.6,
    topSpeed: 260,
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1920&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1611651338412-8403fa6e3e2c?q=80&w=1920&auto=format&fit=crop',
    description: 'El alma de un deportivo, electrificada. Rendimiento inigualable en un paquete sostenible.',
    engineType: 'Eléctrico',
    bodyType: 'Sedán',
    year: 2024,
    tag: 'Nuevo',
    specs: {
      torque: '1,050 Nm',
      transmission: '2 velocidades (eje trasero)',
      drive: 'Tracción total',
      weight: '2,295 kg',
      seats: 4
    },
    gallery: [
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1920&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611651338412-8403fa6e3e2c?q=80&w=1920&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1920&auto=format&fit=crop'
    ]
  },
  {
    id: '718-cayman-gt4',
    name: '718 Cayman GT4 RS',
    price: 642800000,
    power: 493,
    acceleration: 3.2,
    topSpeed: 315,
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1920&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1920&auto=format&fit=crop',
    description: 'Una obra maestra de motor central. Construido para la pista, perfeccionado para la carretera.',
    engineType: 'Combustión',
    bodyType: 'Deportivo',
    year: 2024,
    tag: 'Edición Especial',
    specs: {
      torque: '450 Nm',
      transmission: 'PDK de 7 velocidades',
      drive: 'Tracción trasera',
      weight: '1,415 kg',
      seats: 2
    },
    gallery: [
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1920&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1920&auto=format&fit=crop'
    ]
  },
  {
    id: 'panamera-turbo-e-hybrid',
    name: 'Panamera Turbo E-Hybrid',
    price: 764000000,
    power: 670,
    acceleration: 3.0,
    topSpeed: 315,
    image: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?q=80&w=1920&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1920&auto=format&fit=crop',
    description: 'El sedán de lujo que se cree un deportivo. El confort se une a la potencia pura.',
    engineType: 'Híbrido',
    bodyType: 'Sedán',
    year: 2024,
    specs: {
      torque: '930 Nm',
      transmission: 'PDK de 8 velocidades',
      drive: 'Tracción total',
      weight: '2,360 kg',
      seats: 4
    },
    gallery: [
      'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?q=80&w=1920&auto=format&fit=crop'
    ]
  },
  {
    id: 'cayenne-turbo-gt',
    name: 'Cayenne Turbo GT',
    price: 820000000,
    power: 650,
    acceleration: 3.3,
    topSpeed: 300,
    image: 'https://images.unsplash.com/photo-1566473065146-d216d264173c?q=80&w=1920&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1920&auto=format&fit=crop',
    description: 'El SUV que desafía las leyes de la física. Rendimiento de circuito en formato familiar.',
    engineType: 'Combustión',
    bodyType: 'SUV',
    year: 2024,
    tag: 'Más Vendido',
    specs: {
      torque: '850 Nm',
      transmission: 'Tiptronic S de 8 velocidades',
      drive: 'Tracción total',
      weight: '2,220 kg',
      seats: 4
    },
    gallery: [
      'https://images.unsplash.com/photo-1566473065146-d216d264173c?q=80&w=1920&auto=format&fit=crop'
    ]
  },
  {
    id: 'macan-electric',
    name: 'Macan Turbo Electric',
    price: 480000000,
    power: 630,
    acceleration: 3.3,
    topSpeed: 260,
    image: 'https://images.unsplash.com/photo-1649931320399-52c6f13e7352?q=80&w=1920&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1920&auto=format&fit=crop',
    description: 'El SUV compacto más deportivo, ahora totalmente eléctrico.',
    engineType: 'Eléctrico',
    bodyType: 'SUV',
    year: 2025,
    tag: 'Nuevo',
    specs: {
      torque: '1,130 Nm',
      transmission: '1 velocidad',
      drive: 'Tracción total',
      weight: '2,405 kg',
      seats: 5
    },
    gallery: [
      'https://images.unsplash.com/photo-1649931320399-52c6f13e7352?q=80&w=1920&auto=format&fit=crop'
    ]
  }
];

export const EXTERIOR_COLORS: ExteriorColor[] = [
  { 
    name: 'Negro Jet Metalizado', 
    hex: '#000000', 
    price: 0,
    description: 'Elegancia atemporal y profundidad infinita. Un acabado que refleja el misterio y la autoridad de la noche.',
    benefit: 'Máxima discreción y un brillo que resalta las líneas aerodinámicas.',
    finish: 'Metalizado',
    category: 'Elegante',
    tag: 'Más Elegido'
  },
  { 
    name: 'Rojo Guardia', 
    hex: '#E4002B', 
    price: 0,
    description: 'Un rojo intenso inspirado en la herencia deportiva, diseñado para destacar presencia, velocidad y carácter en cada ángulo.',
    benefit: 'Impacto visual inmediato y una conexión directa con el ADN de competición.',
    finish: 'Sólido',
    category: 'Deportivo',
    tag: 'Recomendado'
  },
  { 
    name: 'Azul Gentian Metalizado', 
    hex: '#003366', 
    price: 3360000,
    description: 'Un azul profundo y sofisticado que cambia con la luz, evocando la velocidad de los océanos y la tecnología de punta.',
    benefit: 'Estilo refinado con un toque de modernidad eléctrica.',
    finish: 'Metalizado',
    category: 'Elegante'
  },
  { 
    name: 'Crayón', 
    hex: '#D1D1D1', 
    price: 13080000,
    description: 'Un tono gris suave y técnico que proyecta una imagen minimalista y vanguardista.',
    benefit: 'Exclusividad visual que resalta los detalles negros y de fibra de carbono.',
    finish: 'Sólido',
    category: 'Deportivo',
    tag: 'Exclusivo'
  },
  { 
    name: 'Verde Pitón', 
    hex: '#448833', 
    price: 13080000,
    description: 'Audacia pura. Un color vibrante para quienes no temen ser el centro de atención.',
    benefit: 'Personalidad única y un carácter indomable en carretera.',
    finish: 'Sólido',
    category: 'Deportivo'
  },
  { 
    name: 'Bronce Dorado Metalizado', 
    hex: '#D4AF37', 
    price: 51320000,
    description: 'La cima del lujo. Un acabado que evoca prestigio, historia y una presencia inigualable.',
    benefit: 'Máximo nivel de exclusividad y un valor de reventa excepcional.',
    finish: 'Metalizado',
    category: 'Elegante',
    tag: 'Exclusivo'
  }
];

export const WHEEL_DESIGNS: WheelDesign[] = [
  { 
    id: 'carrera-s', 
    name: 'Rines Carrera S de 20/21 pulgadas', 
    price: 0,
    description: 'El diseño clásico de Porsche, optimizado para el equilibrio perfecto entre confort y agilidad.',
    benefit: 'Estética icónica y manejo suave para el uso diario.',
    category: 'Estándar'
  },
  { 
    id: 'rs-spyder', 
    name: 'Rines RS Spyder Design de 20/21 pulgadas', 
    price: 10160000,
    description: 'Diseño inspirado en competición que maximiza la aerodinámica y aporta una estética agresiva y sofisticada.',
    benefit: 'Mejor disipación de calor y un diseño ligero que mejora la respuesta de dirección.',
    category: 'Alto Rendimiento',
    tag: 'Deportivo'
  },
  { 
    id: 'exclusive-design', 
    name: 'Rines Carrera Exclusive Design de 20/21 pulgadas', 
    price: 10520000,
    description: 'Una obra de arte en aleación. Detalles finamente mecanizados para un look de alta costura automotriz.',
    benefit: 'Elegancia suprema y un acabado que resalta los frenos de alto rendimiento.',
    category: 'Diseño',
    tag: 'Exclusivo'
  },
  { 
    id: 'turbo-s', 
    name: 'Rines 911 Turbo S de 20/21 pulgadas', 
    price: 13800000,
    description: 'La máxima expresión de potencia. Forjados para soportar las fuerzas laterales más extremas.',
    benefit: 'Máxima rigidez y reducción de peso no suspendido para un rendimiento de circuito.',
    category: 'Alto Rendimiento',
    tag: 'Más Elegido'
  }
];

export const INTERIOR_MATERIALS: InteriorMaterial[] = [
  { 
    id: 'leather', 
    name: 'Interior en Cuero', 
    price: 0,
    description: 'Elegancia atemporal con acabados artesanales en cuero premium, diseñado para máximo confort y lujo.',
    benefit: 'Suavidad al tacto y un aroma que define la experiencia Porsche.',
    sensation: 'Lujo',
    recommendedUse: 'Uso Diario'
  },
  { 
    id: 'alcantara', 
    name: 'Race-Tex (Alcantara)', 
    price: 4800000,
    description: 'Material inspirado en el automovilismo profesional, ligero, deportivo y con excelente agarre.',
    benefit: 'Reduce el peso del vehículo y mantiene al conductor firme en curvas cerradas.',
    sensation: 'Deportivo',
    recommendedUse: 'Alto Rendimiento',
    tag: 'Recomendado'
  },
  { 
    id: 'club-leather', 
    name: 'Cuero Club', 
    price: 21360000,
    description: 'El nivel más alto de artesanía. Cuero de grano natural tratado con procesos sostenibles.',
    benefit: 'Durabilidad extrema y una pátina que mejora con el tiempo, contando su propia historia.',
    sensation: 'Lujo',
    recommendedUse: 'Confort',
    tag: 'Exclusivo'
  }
];

export const INTERIOR_COLORS: InteriorColor[] = [
  { name: 'Negro', hex: '#111111' },
  { name: 'Rojo Burdeos', hex: '#800000' },
  { name: 'Gris Pizarra', hex: '#444444' },
  { name: 'Beige Mojave', hex: '#F5F5DC' }
];
