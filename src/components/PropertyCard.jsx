import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => (
  <div className="bg-braidot-neutral-100 rounded-lg shadow-md p-4 flex flex-col border border-braidot-neutral-300">
    <img src={property.images[0]} alt={property.title} className="w-full h-48 object-cover rounded" />
    <h2 className="text-xl font-bold mt-2 text-braidot-primary-bordo">{property.title}</h2>
    <p className="text-braidot-neutral-700">{property.location}</p>
    <p className="text-braidot-primary-bordo font-semibold">${property.price}</p>
    <p className="text-sm mb-2 text-braidot-neutral-500">{property.rooms} habitaciones · {property.type}</p>
    <Link to={`/propiedad/${property.id}`} className="mt-auto text-braidot-primary-bordo underline">Ver detalle</Link>
  </div>
);

export default PropertyCard;
