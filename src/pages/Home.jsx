import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CompareBar from '../components/CompareBar';
import Footer from '../components/Footer';
import FormularioContacto from '../components/FormularioContacto';
import ModernTabs from '../components/ModernTabs';
import PropertyCard from '../components/PropertyCard';
import PropertyFilter from '../components/PropertyFilter';
import PropertyModal from '../components/PropertyModal';
import WhyChooseUs from '../components/WhyChooseUs';
import fondoImage from '../assets/images/FONDO1.jpg';
import { obtenerPropiedades } from '../services/propertyService';


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
    <section 
      className="min-h-screen flex flex-col items-center"
      style={{
        backgroundImage: `url(${fondoImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay oscuro para contraste premium */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-[#5B0F0F]/30 pointer-events-none" />

      {/* Contenido - Hero mejorado */}
      <div className="relative w-full">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl px-4 sm:px-6 md:px-10 py-5 sm:py-6 md:py-8 my-4 sm:my-6 md:my-8 max-w-3xl mx-auto text-center border border-[#5B0F0F]/20">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 text-[#5B0F0F] leading-tight">
              Bienvenido a Braidot Inmobiliaria
            </h1>
            <p className="text-[#0b0b0b] text-base md:text-lg lg:text-xl font-medium">
              Encuentra tu próxima propiedad con nosotros.
            </p>
          </div>
        </div>

      <div className="relative w-full">
        <ModernTabs activeTab={activeTab} onChange={setActiveTab} />
      </div>

      <div className="relative w-full max-w-5xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-[#5B0F0F] bg-white/60 rounded-lg px-4 py-2 inline-block backdrop-blur-md shadow">
            {tabsMap[activeTab].label}
          </h2>
          {tabsMap[activeTab].total > 3 && (
            <button
              onClick={() => navigate(tabsMap[activeTab].route)}
              className="bg-[#5B0F0F] hover:bg-[#7a1414] text-white px-4 md:px-6 py-2.5 text-sm md:text-base rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
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

      {!modalProperty && (
        <>
          <div className="relative w-full">
            <FormularioContacto />
            <WhyChooseUs />
            <Footer />
          </div>
          <CompareBar />
        </>
      )}
    </section>
  );
};

export default Home;