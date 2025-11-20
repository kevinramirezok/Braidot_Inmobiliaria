// Servicio para consumir propiedades desde el backend

const API_URL = 'http://localhost:4000/api/properties';

export async function getProperties() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Error al obtener propiedades');
  return await response.json();
}

export async function getPropertyById(id) {
  const response = await fetch(`${API_URL}`);
  if (!response.ok) throw new Error('Error al obtener propiedad');
  const properties = await response.json();
  return properties.find(p => p.id === Number(id));
}
