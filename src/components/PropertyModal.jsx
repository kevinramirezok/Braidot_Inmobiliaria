import React from 'react';

const PropertyModal = ({ property, onClose }) => {
  if (!property) return null;
  return (
    <div className="fixed inset-0 bg-braidot-neutral-900 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-braidot-neutral-100 p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-braidot-neutral-900 text-xl">&times;</button>
        <img src={property.images[0]} alt={property.title} className="w-full h-48 object-cover rounded mb-4" />
        <h2 className="text-2xl font-bold text-braidot-primary-bordo mb-2">{property.title}</h2>
        <p className="text-braidot-neutral-900 mb-2">{property.location}</p>
        <p className="text-braidot-primary-bordo font-semibold mb-2">${property.price}</p>
        <p className="text-braidot-neutral-900 mb-2">{property.rooms} dormitorios · {property.type}</p>
        {property.patio && <p className="text-braidot-neutral-900 mb-2">Patio: Sí</p>}
        {property.services && <p className="text-braidot-neutral-900 mb-2">Servicios: {property.services.join(', ')}</p>}
        <p className="text-braidot-neutral-900 mb-2">{property.description}</p>
        <button className="bg-braidot-primary-bordo text-braidot-neutral-100 px-4 py-2 rounded mt-4 w-full">Reservar ahora</button>
      </div>
    </div>
  );
};

export default PropertyModal;
