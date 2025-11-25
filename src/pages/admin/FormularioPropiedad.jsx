import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import FormularioPropiedad from '../../components/admin/FormularioPropiedad';

const PropiedadesAdmin = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [propiedades, setPropiedades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [propiedadEditando, setPropiedadEditando] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    cargarPropiedades();
  }, [user, navigate]);

  const cargarPropiedades = async () => {
    try {
      const { data, error } = await supabase
        .from('propiedades')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPropiedades(data);
    } catch (error) {
      console.error('Error cargando propiedades:', error);
    } finally {
      setLoading(false);
    }
  };

  const eliminarPropiedad = async (id) => {
    if (!confirm('¿Estás seguro de eliminar esta propiedad?')) return;

    try {
      const { error } = await supabase
        .from('propiedades')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      alert('Propiedad eliminada exitosamente');
      cargarPropiedades();
    } catch (error) {
      console.error('Error eliminando propiedad:', error);
      alert('Error al eliminar la propiedad');
    }
  };

  const toggleActiva = async (id, estadoActual) => {
    try {
      const { error } = await supabase
        .from('propiedades')
        .update({ activa: !estadoActual })
        .eq('id', id);

      if (error) throw error;
      cargarPropiedades();
    } catch (error) {
      console.error('Error actualizando estado:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/admin/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-braidot-primary-bordo"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-braidot-neutral-50 to-braidot-neutral-200">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="text-braidot-primary-bordo hover:text-braidot-primary-bordo-light"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-braidot-primary-bordo">
                Gestión de Propiedades
              </h1>
              <p className="text-sm text-braidot-neutral-600">
                {propiedades.length} propiedades totales
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="bg-braidot-primary-bordo hover:bg-braidot-primary-bordo-light text-white px-4 py-2 rounded-lg transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <button
            onClick={() => {
              setPropiedadEditando(null);
              setMostrarFormulario(true);
            }}
            className="bg-braidot-primary-bordo hover:bg-braidot-primary-bordo-light text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nueva Propiedad
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-braidot-primary-bordo text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Título</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Tipo</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Operación</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Precio</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Estado</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-braidot-neutral-200">
                {propiedades.map((prop) => (
                  <tr key={prop.id} className="hover:bg-braidot-neutral-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {prop.imagenes && prop.imagenes[0] && (
                          <img 
                            src={prop.imagenes[0]} 
                            alt={prop.titulo}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        )}
                        <div>
                          <p className="font-semibold text-braidot-negro">{prop.titulo}</p>
                          <p className="text-sm text-braidot-neutral-600">{prop.ubicacion}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-braidot-neutral-700">
                      {prop.tipo}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        prop.operation === 'Venta' ? 'bg-blue-100 text-blue-700' :
                        prop.operation === 'Alquiler' ? 'bg-green-100 text-green-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {prop.operation}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-braidot-primary-bordo">
                      ${prop.precio?.toLocaleString('es-AR')}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleActiva(prop.id, prop.activa)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          prop.activa 
                            ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                        } transition-colors`}
                      >
                        {prop.activa ? 'Activa' : 'Inactiva'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            setPropiedadEditando(prop);
                            setMostrarFormulario(true);
                          }}
                          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => eliminarPropiedad(prop.id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {mostrarFormulario && (
        <FormularioPropiedad
          propiedad={propiedadEditando}
          onClose={() => {
            setMostrarFormulario(false);
            setPropiedadEditando(null);
          }}
          onSuccess={cargarPropiedades}
        />
      )}
    </div>
  );
};

export default PropiedadesAdmin;