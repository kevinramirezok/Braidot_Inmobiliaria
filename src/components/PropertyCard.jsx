import { useCompare } from '../contexts/CompareContext';

const PropertyCard = ({ property, onViewDetail }) => {
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const enComparacion = isInCompare(property.id);

  const handleCompare = (e) => {
    e.stopPropagation();
    if (enComparacion) {
      removeFromCompare(property.id);
    } else {
      addToCompare(property);
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_40px_rgba(91,15,15,0.3)] overflow-hidden transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">
      {/* Brillo sutil en hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-braidot-primary-bordo/10 via-transparent to-transparent" />
      </div>

      {/* Imagen con efectos mejorados */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img 
          src={property.images[0]} 
          alt={property.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        
        {/* Badge premium */}
        <div className="absolute top-3 right-3 bg-braidot-primary-bordo/95 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
          {property.operation}
        </div>
        
        {/* Overlay gradiente mejorado */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Botón rápido en hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onViewDetail(property)}
            className="bg-white text-braidot-primary-bordo px-6 py-3 rounded-full font-bold shadow-2xl hover:scale-105 transition-transform duration-300"
          >
            Ver Detalles
          </button>
        </div>
      </div>

      {/* Contenido premium - flex-grow para empujar footer */}
      <div className="p-5 md:p-6 relative z-10 flex-grow flex flex-col">
        {/* Título con altura fija */}
        <h2 className="text-base md:text-lg lg:text-xl font-bold mb-3 text-[#0b0b0b] line-clamp-2 group-hover:text-braidot-primary-bordo transition-colors leading-tight">
          {property.title}
        </h2>

        {/* Ubicación mejorada */}
        <div className="flex items-center gap-2 text-[#0b0b0b] text-sm mb-4">
          <svg className="w-4 h-4 flex-shrink-0 text-braidot-primary-bordo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="truncate font-medium">{property.localidad}</span>
        </div>

        {/* Características minimalistas en una fila */}
        <div className="flex items-center gap-3 sm:gap-4 mb-4 py-3 px-3 sm:px-4 bg-braidot-neutral-50 rounded-xl flex-wrap">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-braidot-primary-bordo flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-sm font-bold text-braidot-negro">{property.rooms}</span>
            <span className="text-xs text-braidot-neutral-500">amb</span>
          </div>
          <div className="w-px h-4 bg-braidot-neutral-300" />
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-sm sm:text-base">🚿</span>
            <span className="text-sm font-bold text-braidot-negro">{property.bathrooms || 1}</span>
            <span className="text-xs text-braidot-neutral-500">baños</span>
          </div>
          <div className="w-px h-4 bg-braidot-neutral-300" />
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-braidot-primary-bordo flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="text-xs text-braidot-neutral-700 font-medium truncate max-w-[80px]">{property.type}</span>
          </div>
        </div>

        {/* Footer con margin-top auto - ALINEACIÓN PERFECTA */}
        <div className="mt-auto pt-2">
          {/* Precio y botón premium */}
          <div className="flex items-end justify-between gap-3 sm:gap-4">
            <div className="flex-1">
              <p className="text-[10px] text-[#737373] mb-1 uppercase tracking-wider font-semibold">
                {property.operation === 'Venta' ? 'Precio' : 
                 property.operation === 'Alquiler' ? 'Mensual' : 
                 'Por día'}
              </p>
              <p className="text-2xl md:text-3xl font-extrabold text-braidot-primary-bordo leading-none">
                ${property.price.toLocaleString('es-AR')}
              </p>
            </div>

            <button
              onClick={() => {
                const mensaje = `Hola, estoy interesado en: ${property.title}`;
                window.open(`https://wa.me/5491234567890?text=${encodeURIComponent(mensaje)}`, '_blank');
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2.5 sm:py-3 text-xs font-bold rounded-xl transition-all duration-300 shadow-[0_4px_12px_rgba(22,163,74,0.3)] hover:shadow-[0_6px_20px_rgba(22,163,74,0.4)] hover:scale-105 active:scale-95 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span className="hidden sm:inline">Consultar</span>
              <span className="sm:hidden">WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* Indicador de "nuevo" si es reciente */}
      {property.destacada && (
        <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-yellow-400 text-braidot-negro px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-bold shadow-lg animate-pulse">
          ⭐ Destacada
        </div>
      )}
      {/* Botón de comparar */}
      <button
        onClick={handleCompare}
        className={`absolute top-2 left-2 md:top-3 md:left-3 p-1.5 md:p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 z-20 ${
          enComparacion 
            ? 'bg-braidot-primary-bordo text-white scale-105 md:scale-110' 
            : 'bg-white/95 text-braidot-neutral-600 hover:bg-braidot-primary-bordo hover:text-white'
        }`}
        title={enComparacion ? 'Quitar de comparación' : 'Agregar a comparación'}
      >
        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </button>
    </div>
  );
};

export default PropertyCard;