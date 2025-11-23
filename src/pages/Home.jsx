import React, { useState } from 'react';
import PropertyFilter from '../components/PropertyFilter';
import PropertyModal from '../components/PropertyModal';
import properties from '../data/properties.json';
import PropertyCard from '../components/PropertyCard';
import ModernTabs from '../components/ModernTabs';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';


const Home = () => {
  const [activeTab, setActiveTab] = useState('alquiler');
  const [filters, setFilters] = useState({ location: '', rooms: '', type: '', patio: '', maxPrice: '' });
  const [modalProperty, setModalProperty] = useState(null);
  const tabsMap = {
    alquiler: {
      label: 'Propiedades en alquiler',
      data: properties.filter(p => p.operation === 'Alquiler'),
    },
    venta: {
      label: 'Propiedades en venta',
      data: properties.filter(p => p.operation === 'Venta').filter(p => {
        if (filters.location && !p.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
        if (filters.rooms && String(p.rooms) !== filters.rooms && !(filters.rooms === '4' && p.rooms >= 4)) return false;
        if (filters.type && p.type !== filters.type) return false;
        if (filters.patio && String(!!p.patio) !== filters.patio) return false;
        if (filters.maxPrice && p.price > Number(filters.maxPrice)) return false;
        return true;
      }),
    },
    temporaria: {
      label: 'Quintas y temporarias',
      data: properties.filter(p => p.operation === 'Temporaria'),
    },
  };

  return (
    <section className="flex flex-col items-center min-h-[60vh]">
      <div className="w-full flex flex-col items-center pt-8 pb-4">
        <div className="bg-white/70 rounded-xl shadow-lg px-8 py-6 mb-6 max-w-3xl w-full text-center backdrop-blur-md">
          <h1 className="text-4xl font-extrabold mb-2 text-braidot-primary-bordo drop-shadow-lg">Bienvenido a Braidot Inmobiliaria</h1>
          <p className="text-braidot-negro text-lg mb-2">Encuentra tu próxima propiedad con nosotros.</p>
        </div>
        <div className="relative w-full mb-12">
          <div className="bg-gradient-to-r from-braidot-primary-bordo to-braidot-primary-bordo-light rounded-2xl shadow-2xl px-8 py-12 text-center text-white overflow-hidden">
            {/* Pattern de fondo */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
              }} />
            </div>

            <div className="relative z-10">
              <h1 className="text-5xl font-extrabold mb-4">
                Braidot Inmobiliaria
              </h1>
              <p className="text-xl mb-6 text-white/90">
                Más de 20 años conectando personas con sus hogares ideales
              </p>

              {/* Stats rápidos */}
              <div className="flex justify-center gap-8 mt-8">
                <div>
                  <p className="text-4xl font-bold">500+</p>
                  <p className="text-sm text-white/80">Propiedades</p>
                </div>
                <div>
                  <p className="text-4xl font-bold">1200+</p>
                  <p className="text-sm text-white/80">Clientes felices</p>
                </div>
                <div>
                  <p className="text-4xl font-bold">24/7</p>
                  <p className="text-sm text-white/80">Atención</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ModernTabs activeTab={activeTab} onChange={setActiveTab} />
      </div>
      <div className="w-full max-w-5xl">
        <h2 className="text-2xl font-bold text-braidot-primary-bordo mb-4 bg-white/60 rounded-lg px-4 py-2 inline-block backdrop-blur-md shadow">{tabsMap[activeTab].label}</h2>
        {activeTab === 'venta' && (
          <>
            <PropertyFilter filters={filters} setFilters={setFilters} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {tabsMap[activeTab].data.length > 0 ? (
                tabsMap[activeTab].data.map(property => (
                  <div key={property.id} className="bg-white/80 rounded-xl shadow-xl p-4 backdrop-blur-md border border-braidot-neutral-200 hover:scale-105 transition-transform">
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onViewDetail={setModalProperty}
                    />
                  </div>
                ))
                
              ) : (
                <div className="col-span-3 text-center text-braidot-negro py-8 bg-white/70 rounded-xl shadow">No hay propiedades disponibles en esta categoría.</div>
              )}
            </div>
            
          </>
        )}
        {activeTab !== 'venta' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {tabsMap[activeTab].data.length > 0 ? (
              tabsMap[activeTab].data.map(property => (
                <div key={property.id} className="bg-white/80 rounded-xl shadow-xl p-4 backdrop-blur-md border border-braidot-neutral-200 hover:scale-105 transition-transform">
                  <PropertyCard
                    property={property}
                    onViewDetail={setModalProperty}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center text-braidot-negro py-8 bg-white/70 rounded-xl shadow">No hay propiedades disponibles en esta categoría.</div>
            )}
          </div>
        )}
        <PropertyModal property={modalProperty} onClose={() => setModalProperty(null)} />
      </div>
      <Testimonials />
      <WhyChooseUs />
    </section>
  );
};

export default Home;
