import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    ventas: 0,
    alquileres: 0,
    temporarias: 0,
    consultas: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    cargarEstadisticas();
  }, [user, navigate]);

  const cargarEstadisticas = async () => {
    try {
      const { count: total } = await supabase
        .from('propiedades')
        .select('*', { count: 'exact', head: true });

      const { count: ventas } = await supabase
        .from('propiedades')
        .select('*', { count: 'exact', head: true })
        .eq('operation', 'Venta');

      const { count: alquileres } = await supabase
        .from('propiedades')
        .select('*', { count: 'exact', head: true })
        .eq('operation', 'Alquiler');

      const { count: temporarias } = await supabase
        .from('propiedades')
        .select('*', { count: 'exact', head: true })
        .eq('operation', 'Temporaria');

      const { count: consultas } = await supabase
        .from('consultas')
        .select('*', { count: 'exact', head: true });

      setStats({ total, ventas, alquileres, temporarias, consultas });
    } catch (error) {
      console.error('Error cargando estadísticas:', error);
    } finally {
      setLoading(false);
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
          <div>
            <h1 className="text-2xl font-bold text-braidot-primary-bordo">Panel Administrativo</h1>
            <p className="text-sm text-gray-600">Bienvenido, {user?.email}</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-braidot-primary-bordo">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-braidot-neutral-600 mb-1">Total Propiedades</p>
                <p className="text-3xl font-bold text-braidot-primary-bordo">{stats.total}</p>
              </div>
              <svg className="w-12 h-12 text-braidot-primary-bordo/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-braidot-neutral-600 mb-1">En Venta</p>
                <p className="text-3xl font-bold text-blue-500">{stats.ventas}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-braidot-neutral-600 mb-1">En Alquiler</p>
                <p className="text-3xl font-bold text-green-500">{stats.alquileres}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-braidot-neutral-600 mb-1">Temporarias</p>
                <p className="text-3xl font-bold text-yellow-500">{stats.temporarias}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-braidot-negro mb-6">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/admin/propiedades')}
              className="bg-braidot-primary-bordo hover:bg-braidot-primary-bordo-light text-white p-4 rounded-lg transition-colors text-left"
            >
              <h3 className="font-bold text-lg">Gestionar Propiedades</h3>
              <p className="text-sm text-white/80">Ver, editar y agregar propiedades</p>
            </button>

            <button className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg transition-colors text-left">
              <h3 className="font-bold text-lg">Ver Reservas</h3>
              <p className="text-sm text-white/80">Gestionar calendario de quintas</p>
            </button>

            <button className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg transition-colors text-left">
              <h3 className="font-bold text-lg">Consultas</h3>
              <p className="text-sm text-white/80">{stats.consultas} consultas pendientes</p>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;