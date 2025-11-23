const PropertyCard = ({ property, onViewDetail }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-braidot-neutral-200 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
    {/* Imagen con overlay en hover */}
    <div className="relative overflow-hidden group">
      <img 
        src={property.images[0]} 
        alt={property.title} 
        className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
      />
      {/* Badge de tipo de operación */}
      <div className="absolute top-3 right-3 bg-braidot-primary-bordo text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
        {property.operation}
      </div>
      {/* Overlay oscuro en hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>

    {/* Contenido */}
    <div className="p-5">
      {/* Título */}
      <h2 className="text-xl font-bold mb-2 text-braidot-primary-bordo line-clamp-2 min-h-[3.5rem]">
        {property.title}
      </h2>

      {/* Ubicación */}
      <div className="flex items-center gap-2 text-braidot-neutral-700 text-sm mb-3">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span>{property.location}</span>
      </div>

      {/* Detalles (habitaciones y tipo) */}
      <div className="flex items-center gap-3 text-braidot-neutral-600 text-sm mb-4 pb-4 border-b border-braidot-neutral-200">
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>{property.rooms} hab.</span>
        </div>
        <span className="text-braidot-neutral-400">•</span>
        <span>{property.type}</span>
      </div>

      {/* Precio y botón */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-braidot-neutral-500 mb-1">
            {property.operation === 'Venta' ? 'Precio' : 
             property.operation === 'Alquiler' ? 'Mensual' : 
             'Por día'}
          </p>
          <p className="text-2xl font-bold text-braidot-primary-bordo">
            ${property.price.toLocaleString('es-AR')}
          </p>
        </div>

        <button
          onClick={() => onViewDetail(property)}
          className="bg-braidot-primary-bordo hover:bg-braidot-primary-bordo-light text-white px-5 py-2.5 rounded-lg font-semibold transition-colors duration-300 shadow-md hover:shadow-lg"
        >
          Ver más
        </button>
      </div>
    </div>
  </div>
);

export default PropertyCard;