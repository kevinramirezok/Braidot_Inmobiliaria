import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropertyFilter from '../components/PropertyFilter';
import PropertyModal from '../components/PropertyModal';
import { obtenerPropiedades } from '../services/propertyService';
import PropertyCard from '../components/PropertyCard';
import ModernTabs from '../components/ModernTabs';
import WhyChooseUs from '../components/WhyChooseUs';


const Home = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('alquiler');
  const [filters, setFilters] = useState({ location: '', rooms: '', type: '', patio: '', maxPrice: '' });
  const [modalProperty, setModalProperty] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargarPropiedades() {
      setLoading(true);
      const props = await obtenerPropiedades();
      setProperties(props);
      setLoading(false);
    }
    cargarPropiedades();
  }, []);

  const tabsMap = {
    alquiler: {
      label: 'Propiedades en alquiler',
      data: properties.filter(p => p.operation === 'Alquiler').slice(0, 3), // Solo 3
      total: properties.filter(p => p.operation === 'Alquiler').length,
      route: '/propiedades/alquiler'
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
      }).slice(0, 3), // Solo 3
      total: properties.filter(p => p.operation === 'Venta').length,
      route: '/propiedades/venta'
    },
    temporaria: {
      label: 'Quintas y temporarias',
      data: properties.filter(p => p.operation === 'Temporaria').slice(0, 3), // Solo 3
      total: properties.filter(p => p.operation === 'Temporaria').length,
      route: '/propiedades/temporaria'
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-braidot-primary-bordo mx-auto mb-4"></div>
          <p className="text-xl text-braidot-primary-bordo font-semibold">Cargando propiedades...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="flex flex-col items-center min-h-[60vh]">
        <div className="bg-white/70 rounded-xl shadow-lg px-10 py-6 my-8 max-w-3xl mx-auto text-center backdrop-blur-md">
          <h1 className="text-4xl font-extrabold mb-2 text-braidot-primary-bordo drop-shadow-lg">Bienvenido a Braidot Inmobiliaria</h1>
          <p className="text-braidot-negro text-lg mb-2">Encuentra tu próxima propiedad con nosotros.</p>
        </div>
        <div className="relative w-full mb-12">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
              }} />
            </div>
            </div>
        <ModernTabs activeTab={activeTab} onChange={setActiveTab} />
      <div className="w-full max-w-5xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-braidot-primary-bordo bg-white/60 rounded-lg px-4 py-2 inline-block backdrop-blur-md shadow">
            {tabsMap[activeTab].label}
          </h2>
          {tabsMap[activeTab].total > 3 && (
            <button
              onClick={() => navigate(tabsMap[activeTab].route)}
              className="bg-braidot-primary-bordo hover:bg-braidot-primary-bordo-light text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              Ver todas ({tabsMap[activeTab].total})
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        {activeTab === 'venta' && (
          <>
            <PropertyFilter filters={filters} setFilters={setFilters} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {tabsMap[activeTab].data.length > 0 ? (
                tabsMap[activeTab].data.map(property => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onViewDetail={setModalProperty}
                  />
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
                <PropertyCard
                  key={property.id}
                  property={property}
                  onViewDetail={setModalProperty}
                />
              ))
            ) : (
              <div className="col-span-3 text-center text-braidot-negro py-8 bg-white/70 rounded-xl shadow">No hay propiedades disponibles en esta categoría.</div>
            )}
          </div>
        )}
        <PropertyModal property={modalProperty} onClose={() => setModalProperty(null)} />
      </div>
      <WhyChooseUs />
    </section>
  );
};

export default Home;