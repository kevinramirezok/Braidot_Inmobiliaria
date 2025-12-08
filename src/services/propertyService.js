import { supabase } from '../lib/supabase.js';

export async function obtenerPropiedades() {
  const { data, error } = await supabase
    .from('propiedades')
    .select('*')
    .eq('activa', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error al obtener propiedades:', error);
    return [];
  }

  // Mapear TODOS los campos de Supabase al formato del frontend
  return data.map(prop => ({
    id: prop.id,
    title: prop.titulo,
    price: prop.precio,
    location: prop.ubicacion || `${prop.localidad || ''}${prop.provincia ? ', ' + prop.provincia : ''}`, // Fallback para location
    localidad: prop.localidad,
    provincia: prop.provincia,
    direccion: prop.direccion,
    barrio: prop.barrio,
    images: prop.imagenes,
    active: prop.activa,
    ambientes: prop.ambientes,
    rooms: prop.ambientes, // Alias para compatibilidad
    banos: prop.banos,
    cocheras: prop.cocheras,
    metros_cuadrados: prop.metros_cuadrados,
    metros_terreno: prop.metros_terreno,
    tipo: prop.tipo,
    type: prop.tipo, // Alias para compatibilidad
    operation: prop.operation,
    tiene_patio: prop.tiene_patio,
    patio: prop.tiene_patio, // Alias para compatibilidad
    servicios: prop.servicios,
    services: prop.servicios, // Alias para compatibilidad
    descripcion: prop.descripcion,
    description: prop.descripcion, // Alias para compatibilidad
    checkin_hora: prop.checkin_hora,
    checkout_hora: prop.checkout_hora,
    destacada: prop.destacada,
    created_at: prop.created_at,
    updated_at: prop.updated_at
  }));
}
