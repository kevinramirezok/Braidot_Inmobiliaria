import React from 'react';

const PropertyFilter = ({ filters, setFilters }) => {
  return (
    <form className="flex flex-wrap gap-4 mb-6 bg-braidot-blanco1 p-4 rounded shadow">
      <input
        type="text"
        placeholder="Ubicación"
        className="border p-2 rounded w-40"
        value={filters.location}
        onChange={e => setFilters({ ...filters, location: e.target.value })}
      />
      <select
        className="border p-2 rounded w-40"
        value={filters.rooms}
        onChange={e => setFilters({ ...filters, rooms: e.target.value })}
      >
        <option value="">Dormitorios</option>
        <option value="1">1 dormitorio</option>
        <option value="2">2 dormitorios</option>
        <option value="3">3 dormitorios</option>
        <option value="4">4 o más</option>
      </select>
      <select
        className="border p-2 rounded w-40"
        value={filters.type}
        onChange={e => setFilters({ ...filters, type: e.target.value })}
      >
        <option value="">Tipo</option>
        <option value="Casa">Casa</option>
        <option value="Baldío">Baldío</option>
        <option value="Departamento">Departamento</option>
      </select>
      <select
        className="border p-2 rounded w-40"
        value={filters.patio}
        onChange={e => setFilters({ ...filters, patio: e.target.value })}
      >
        <option value="">Patio</option>
        <option value="true">Con patio</option>
        <option value="false">Sin patio</option>
      </select>
      <input
        type="number"
        placeholder="Precio máx."
        className="border p-2 rounded w-40"
        value={filters.maxPrice}
        onChange={e => setFilters({ ...filters, maxPrice: e.target.value })}
      />
    </form>
  );
};

export default PropertyFilter;
