export type CarModel = {
  id: string;
  name: string;
  price: number;
  power: number;
  acceleration: number;
  topSpeed: number;
  image: string;
  hoverImage?: string;
  description: string;
  engineType: 'Combustión' | 'Eléctrico' | 'Híbrido';
  bodyType: 'Deportivo' | 'SUV' | 'Sedán';
  year: number;
  tag?: 'Nuevo' | 'Edición Especial' | 'Más Vendido';
  specs: {
    torque: string;
    transmission: string;
    drive: string;
    weight: string;
    seats: number;
  };
  gallery: string[];
};

export type ExteriorColor = {
  name: string;
  hex: string;
  price: number;
  description: string;
  benefit: string;
  finish: 'Sólido' | 'Metalizado' | 'Mate' | 'Especial';
  category: 'Clásico' | 'Deportivo' | 'Elegante';
  tag?: 'Más Elegido' | 'Exclusivo' | 'Recomendado';
};

export type WheelDesign = {
  id: string;
  name: string;
  price: number;
  description: string;
  benefit: string;
  category: 'Estándar' | 'Alto Rendimiento' | 'Diseño';
  tag?: 'Más Elegido' | 'Deportivo' | 'Exclusivo';
};

export type InteriorMaterial = {
  id: string;
  name: string;
  price: number;
  description: string;
  benefit: string;
  sensation: 'Lujo' | 'Deportivo' | 'Racing';
  recommendedUse: 'Confort' | 'Alto Rendimiento' | 'Uso Diario';
  tag?: 'Más Elegido' | 'Exclusivo' | 'Recomendado';
};

export type InteriorColor = {
  name: string;
  hex: string;
};

export type Configuration = {
  carId: string;
  exterior: {
    color: string;
    finish: 'gloss' | 'matte' | 'satin';
    wheels: string;
    calipers: string;
  };
  interior: {
    material: string;
    color: string;
    stitching: string;
  };
  performance: {
    engine: string;
    exhaust: string;
  };
};

export type PorscheCenter = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
};
