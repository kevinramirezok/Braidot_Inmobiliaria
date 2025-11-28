import React, { useState, useEffect } from 'react';
import ModalReserva from './ModalReserva';

const PropertyModal = ({ property, onClose }) => {
  const [mostrarModalReserva, setMostrarModalReserva] = useState(false);

  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    if (property) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [property]);

  if (!property) return null;

  const handleReservar = () => {
    if (property.operation === 'Temporaria') {
      setMostrarModalReserva(true);
    } else {
      // Para ventas y alquileres, mensaje de WhatsApp directo
      window.open(`https://wa.me/5493482XXXXXX?text=Consulta por: ${property.title}`, '_blank');
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center z-50 px-4 backdrop-blur-sm"
        style={{
          background: 'rgba(91, 15, 15, 0.75)'
        }}
        onClick={onClose}
      >
        <div 
          className="bg-white rounded-2xl w-full max-w-2xl relative shadow-2xl max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botón cerrar */}
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 z-20 bg-white hover:bg-braidot-neutral-100 text-braidot-primary-bordo rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Imagen destacada */}
          <div className="relative h-64 bg-braidot-neutral-900 flex-shrink-0">
            <img 
              src={property.images[0]} 
              alt={property.title} 
              className="w-full h-full object-cover"
            />
            {/* Gradiente sobre imagen */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Badge de operación sobre imagen */}
            <div className="absolute bottom-4 left-4 bg-braidot-primary-bordo text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
              {property.operation}
            </div>
          </div>

          {/* Contenido scrolleable */}
          <div className="overflow-y-auto p-6 flex-1">
            {/* Título y ubicación */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-braidot-primary-bordo mb-3">
                {property.title}
              </h2>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-braidot-neutral-600">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-lg font-semibold">{property.localidad}, {property.provincia}</span>
                </div>
                {property.direccion && (
                  <p className="text-sm text-braidot-neutral-500 ml-7">{property.direccion}</p>
                )}
                {property.barrio && (
                  <p className="text-sm text-braidot-neutral-500 ml-7">Barrio: {property.barrio}</p>
                )}
              </div>
            </div>

            {/* Precio destacado */}
            <div className="bg-braidot-primary-bordo/5 border-l-4 border-braidot-primary-bordo p-4 rounded-lg mb-6">
              <p className="text-sm text-braidot-neutral-600 mb-1">
                {property.operation === 'Venta' ? 'Precio total' : 
                 property.operation === 'Alquiler' ? 'Precio mensual' : 
                 'Precio por día'}
              </p>
              <p className="text-4xl font-bold text-braidot-primary-bordo">
                ${property.price.toLocaleString('es-AR')}
              </p>
              
              {/* Horarios para temporarias */}
              {property.operation === 'Temporaria' && (property.checkin_hora || property.checkout_hora) && (
                <div className="mt-3 pt-3 border-t border-braidot-primary-bordo/20">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {property.checkin_hora && (
                      <div>
                        <p className="text-braidot-neutral-600">Check-in</p>
                        <p className="font-semibold text-braidot-negro">🕐 {property.checkin_hora} hs</p>
                      </div>
                    )}
                    {property.checkout_hora && (
                      <div>
                        <p className="text-braidot-neutral-600">Check-out</p>
                        <p className="font-semibold text-braidot-negro">🕐 {property.checkout_hora} hs</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Características principales */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-braidot-neutral-50 rounded-xl p-4 text-center">
                <svg className="w-8 h-8 mx-auto mb-2 text-braidot-primary-bordo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <p className="text-2xl font-bold text-braidot-primary-bordo">{property.rooms}</p>
                <p className="text-xs text-braidot-neutral-600">Habitaciones</p>
              </div>

              <div className="bg-braidot-neutral-50 rounded-xl p-4 text-center">
                <svg className="w-8 h-8 mx-auto mb-2 text-braidot-primary-bordo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <p className="text-2xl font-bold text-braidot-primary-bordo">{property.type}</p>
                <p className="text-xs text-braidot-neutral-600">Tipo</p>
              </div>

              <div className="bg-braidot-neutral-50 rounded-xl p-4 text-center">
                <svg className="w-8 h-8 mx-auto mb-2 text-braidot-primary-bordo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-2xl font-bold text-braidot-primary-bordo">{property.patio ? 'Sí' : 'No'}</p>
                <p className="text-xs text-braidot-neutral-600">Patio</p>
              </div>
            </div>

            {/* Servicios */}
            {property.services && property.services.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-bold text-braidot-negro mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Servicios incluidos
                </h3>
                <div className="flex flex-wrap gap-2">
                  {property.services.map((service, index) => (
                    <span 
                      key={index}
                      className="bg-braidot-primary-bordo/10 text-braidot-primary-bordo px-3 py-1.5 rounded-full text-sm font-medium"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Descripción */}
            {property.description && (
              <div className="mb-6">
                <h3 className="text-lg font-bold text-braidot-negro mb-3">Descripción</h3>
                <p className="text-braidot-neutral-700 leading-relaxed">
                  {property.description}
                </p>
              </div>
            )}
          </div>

          {/* Footer con botones */}
          <div className="border-t border-braidot-neutral-200 p-4 bg-white flex-shrink-0">
            <div className="flex gap-3">
              <button 
                onClick={() => window.open(`https://wa.me/5493482XXXXXX?text=Consulta por: ${property.title}`, '_blank')}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3.5 rounded-xl font-semibold transition-colors duration-300 flex items-center justify-center gap-2 shadow-md"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Consultar
              </button>
              <button 
                onClick={handleReservar}
                className="bg-braidot-primary-bordo hover:bg-braidot-primary-bordo-light text-white px-6 py-3.5 rounded-xl font-semibold transition-colors duration-300 shadow-md"
              >
                {property.operation === 'Temporaria' ? 'Ver disponibilidad' : 'Reservar ahora'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de reserva */}
      {mostrarModalReserva && (
        <ModalReserva
          property={property}
          onClose={() => setMostrarModalReserva(false)}
        />
      )}
    </>
  );
};

export default PropertyModal;