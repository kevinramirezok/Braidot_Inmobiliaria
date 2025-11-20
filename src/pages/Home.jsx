import React, { useState } from 'react';
import properties from '../data/properties.json';
import PropertyCard from '../components/PropertyCard';
import ModernTabs from '../components/ModernTabs';


const Home = () => {
  const [activeTab, setActiveTab] = useState('alquiler');
  const tabsMap = {
    alquiler: {
      label: 'Propiedades en alquiler',
      data: properties.filter(p => p.operation === 'Alquiler'),
    },
    venta: {
      label: 'Propiedades en venta',
      data: properties.filter(p => p.operation === 'Venta'),
    },
    temporaria: {
      label: 'Quintas y temporarias',
      data: properties.filter(p => p.operation === 'Temporaria'),
    },
  };

  return (
    <section className="flex flex-col items-center min-h-[60vh] bg-braidot-blanco1">
      <h1 className="text-3xl font-bold mb-4 text-braidot-primary-bordo">Bienvenido a Braidot Inmobiliaria</h1>
      <p className="text-braidot-negro mb-8">Encuentra tu próxima propiedad con nosotros.</p>
      <ModernTabs activeTab={activeTab} onChange={setActiveTab} />
      <div className="w-full max-w-5xl">
        <h2 className="text-xl font-bold text-braidot-primary-bordo mb-2">{tabsMap[activeTab].label}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {tabsMap[activeTab].data.length > 0 ? (
            tabsMap[activeTab].data.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))
          ) : (
            <div className="col-span-3 text-center text-braidot-negro py-8">No hay propiedades disponibles en esta categoría.</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
