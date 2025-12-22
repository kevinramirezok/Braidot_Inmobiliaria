import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import PropertyModal from '../components/PropertyModal';
import PropertyFilter from '../components/PropertyFilter';
import CompareBar from '../components/CompareBar';
import { obtenerPropiedades } from '../services/propertyService';

const PropiedadesPorCategoria = () => {
  const { categoria } = useParams();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalProperty, setModalProperty] = useState(null);
  const [filters, setFilters] = useState({ location: '', rooms: '', type: '', patio: '', maxPrice: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 12;

  const categoryMap = {
    'venta': { label: 'Propiedades en Venta', operation: 'Venta' },
    'alquiler': { label: 'Propiedades en Alquiler', operation: 'Alquiler' },
    'temporaria': { label: 'Quintas y Temporarias', operation: 'Temporaria' }
  };

  useEffect(() => {
    async function cargarPropiedades() {
      setLoading(true);
      const props = await obtenerPropiedades();
      setProperties(props);
      setLoading(false);
    }
    cargarPropiedades();
  }, []);

  // Filtrar propiedades por categoría
  const filteredProperties = properties
    .filter(p => p.operation === categoryMap[categoria]?.operation)
    .filter(p => {
      if (filters.location && !p.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
      if (filters.rooms && String(p.rooms) !== filters.rooms && !(filters.rooms === '4' && p.rooms >= 4)) return false;
      if (filters.type && p.type !== filters.type) return false;
      if (filters.patio && String(!!p.patio) !== filters.patio) return false;
      if (filters.maxPrice && p.price > Number(filters.maxPrice)) return false;
      return true;
    });

  // Paginación
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  if (!categoryMap[categoria]) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-braidot-negro mb-4">Categoría no encontrada</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-braidot-primary-bordo text-white px-6 py-3 rounded-lg hover:bg-braidot-primary-bordo-light transition-colors"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }


    return (
      <div className="min-h-screen relative" style={{
        backgroundImage: "url('/src/assets/images/FONDO1.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-[#5B0F0F]/30" />
        
        {/* Header con botón volver */}
        <div className="bg-[#171717]/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] sticky top-0 z-30 relative border-b border-[#5B0F0F]/30">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-[#F3F4F6] hover:text-[#5B0F0F] transition-colors font-semibold"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver al inicio
              </button>
              <div className="text-right">
                <h1 className="text-2xl font-bold text-[#F3F4F6]">
                  {categoryMap[categoria].label}
                </h1>
                <p className="text-sm text-[#F3F4F6]/80">
                  {filteredProperties.length} {filteredProperties.length === 1 ? 'propiedad encontrada' : 'propiedades encontradas'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Filtros (solo para venta) */}
          {categoria === 'venta' && (
            <div className="mb-8">
              <PropertyFilter filters={filters} setFilters={setFilters} />
            </div>
          )}

          {/* Grid de propiedades */}
          {currentProperties.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {currentProperties.map((property) => (
                  <div key={property.id} className="bg-braidot-neutral-50/80 rounded-xl shadow-lg p-2 transition-all duration-200 hover:shadow-xl">
                    <PropertyCard
                      property={property}
                      onViewDetail={setModalProperty}
                    />
                  </div>
                ))}
              </div>

              {/* Paginación */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mb-8">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border border-braidot-neutral-300 bg-braidot-neutral-100 hover:bg-braidot-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    // Mostrar solo páginas cercanas a la actual
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                            currentPage === pageNumber
                              ? 'bg-braidot-primary-bordo text-white'
                              : 'border border-braidot-neutral-300 bg-braidot-neutral-100 hover:bg-braidot-neutral-200'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    } else if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                      return <span key={pageNumber} className="px-2">...</span>;
                    }
                    return null;
                  })}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg border border-braidot-neutral-300 bg-braidot-neutral-100 hover:bg-braidot-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="bg-braidot-neutral-100/80 rounded-xl shadow-lg p-12 max-w-md mx-auto">
                <svg className="w-20 h-20 mx-auto mb-4 text-braidot-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-bold text-braidot-negro mb-2">
                  No hay propiedades disponibles
                </h3>
                <p className="text-braidot-neutral-600 mb-6">
                  {filters.location || filters.rooms || filters.type || filters.patio || filters.maxPrice
                    ? 'Intenta ajustar los filtros de búsqueda'
                    : 'No hay propiedades en esta categoría en este momento'}
                </p>
                {(filters.location || filters.rooms || filters.type || filters.patio || filters.maxPrice) && (
                  <button
                    onClick={() => setFilters({ location: '', rooms: '', type: '', patio: '', maxPrice: '' })}
                    className="bg-braidot-primary-bordo text-white px-6 py-2 rounded-lg hover:bg-braidot-primary-bordo-light transition-colors"
                  >
                    Limpiar filtros
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal de detalles */}
        <PropertyModal property={modalProperty} onClose={() => setModalProperty(null)} />
        <CompareBar />
      </div>
    );
};

export default PropiedadesPorCategoria;