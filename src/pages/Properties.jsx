import { useState } from 'react';
import PropertyCard from '../components/PropertyCard';
import PropertyFilter from '../components/PropertyFilter';
import PropertyModal from '../components/PropertyModal';
import propertiesData from '../data/properties.json';

const Properties = () => {
  const [filters, setFilters] = useState({ location: '', rooms: '', type: '', patio: '', maxPrice: '' });
  const [modalProperty, setModalProperty] = useState(null);

  // Filtrado avanzado
  const filtered = propertiesData.filter(p => {
    if (filters.location && !p.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    if (filters.rooms && String(p.rooms) !== filters.rooms && !(filters.rooms === '4' && p.rooms >= 4)) return false;
    if (filters.type && p.type !== filters.type) return false;
    if (filters.patio && String(!!p.patio) !== filters.patio) return false;
    if (filters.maxPrice && p.price > Number(filters.maxPrice)) return false;
    return true;
  });

  return (
    <section className="container mx-auto py-8 bg-braidot-blanco1">
      <h1 className="text-2xl font-bold mb-6 text-braidot-primary-bordo">Propiedades disponibles</h1>
      <PropertyFilter filters={filters} setFilters={setFilters} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map(property => (
          <div key={property.id} onClick={() => setModalProperty(property)}>
            <PropertyCard property={property} />
          </div>
        ))}
      </div>
      <PropertyModal property={modalProperty} onClose={() => setModalProperty(null)} />
    </section>
  );
};

export default Properties;
