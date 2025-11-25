const PropertyCard = ({ property, onViewDetail }) => (
  <div className="group relative bg-white/90 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-white/40 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 hover:border-braidot-primary-bordo/50">
    {/* Brillo sutil en hover */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-braidot-primary-bordo/5 via-transparent to-transparent" />
    </div>

    {/* Imagen con efectos mejorados */}
    <div className="relative overflow-hidden aspect-[4/3]">
      <img 
        src={property.images[0]} 
        alt={property.title} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
      />
      
      {/* Badge con glassmorphism */}
      <div className="absolute top-3 right-3 bg-braidot-primary-bordo/95 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-2xl border border-white/20">
        {property.operation}
      </div>
      
      {/* Overlay gradiente mejorado */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Botón rápido en hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => onViewDetail(property)}
          className="bg-white text-braidot-primary-bordo px-6 py-3 rounded-full font-bold shadow-2xl hover:scale-110 transition-transform duration-300"
        >
          Ver Detalles
        </button>
      </div>
    </div>

    {/* Contenido con mejor espaciado */}
    <div className="p-6 relative z-10">
      {/* Título con altura fija */}
      <h2 className="text-xl font-bold mb-3 text-braidot-primary-bordo line-clamp-2 h-14 group-hover:text-braidot-primary-bordo-light transition-colors">
        {property.title}
      </h2>

      {/* Ubicación mejorada */}
      <div className="flex items-center gap-2 text-braidot-neutral-600 text-sm mb-4">
        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="truncate">{property.location}</span>
      </div>

      {/* Características con iconos mejorados */}
      <div className="flex items-center gap-4 text-braidot-neutral-600 text-sm mb-5 pb-5 border-b border-braidot-neutral-200">
        <div className="flex items-center gap-1.5">
          <div className="bg-braidot-primary-bordo/10 p-1.5 rounded-lg">
            <svg className="w-4 h-4 text-braidot-primary-bordo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <span className="font-medium">{property.rooms} hab.</span>
        </div>
        <span className="text-braidot-neutral-300">|</span>
        <span className="font-medium">{property.type}</span>
      </div>

      {/* Precio y botón con mejor diseño */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs text-braidot-neutral-500 mb-1 uppercase tracking-wide">
            {property.operation === 'Venta' ? 'Precio' : 
             property.operation === 'Alquiler' ? 'Mensual' : 
             'Por día'}
          </p>
          <p className="text-3xl font-bold text-braidot-primary-bordo">
            ${(property.price / 1000).toFixed(0)}k
          </p>
          <p className="text-xs text-braidot-neutral-500">
            ${property.price.toLocaleString('es-AR')}
          </p>
        </div>

        <button
          onClick={() => onViewDetail(property)}
          className="bg-braidot-primary-bordo hover:bg-braidot-primary-bordo-light text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
        >
          Ver más
        </button>
      </div>
    </div>

    {/* Indicador de "nuevo" si es reciente */}
    {property.destacada && (
      <div className="absolute top-3 left-3 bg-yellow-400 text-braidot-negro px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
        ⭐ Destacada
      </div>
    )}
  </div>
);

export default PropertyCard;