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

  return data.map(prop => ({
    id: prop.id,
    title: prop.titulo,
    price: prop.precio,
    location: prop.ubicacion,
    images: prop.imagenes,
    active: prop.activa,
    rooms: prop.ambientes,
    type: prop.tipo,
    operation: prop.operation,
    patio: prop.tiene_patio,
    services: prop.servicios,
    description: prop.descripcion
  }));
}
