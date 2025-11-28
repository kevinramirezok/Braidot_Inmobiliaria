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
    consultas: 0,
    reservasPendientes: 0,
    reservasConfirmadas: 0,
    ingresosMes: 0
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
      // Propiedades
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

      // Reservas
      const { count: reservasPendientes } = await supabase
        .from('reservas')
        .select('*', { count: 'exact', head: true })
        .eq('estado', 'pendiente');

      const { count: reservasConfirmadas } = await supabase
        .from('reservas')
        .select('*', { count: 'exact', head: true })
        .eq('estado', 'confirmada');

      // Ingresos del mes
      const inicioMes = new Date();
      inicioMes.setDate(1);
      inicioMes.setHours(0, 0, 0, 0);

      const { data: reservasMes } = await supabase
        .from('reservas')
        .select('precio_total')
        .eq('estado', 'confirmada')
        .gte('created_at', inicioMes.toISOString());

      const ingresosMes = reservasMes?.reduce((sum, r) => sum + (parseFloat(r.precio_total) || 0), 0) || 0;

      setStats({ 
        total, 
        ventas, 
        alquileres, 
        temporarias, 
        consultas,
        reservasPendientes,
        reservasConfirmadas,
        ingresosMes
      });
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
      <div className="flex items-center justify-center min-h-screen bg-braidot-negro">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-braidot-primary-bordo"></div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full relative"
      style={{
        backgroundImage: "url('/src/assets/images/FONDO1.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-braidot-negro/70"></div>
      
      <header className="bg-gradient-to-r from-braidot-primary-bordo to-braidot-primary-bordo-light shadow-xl relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Panel Administrativo</h1>
            <p className="text-sm text-braidot-blanco2">Bienvenido, {user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-white text-braidot-primary-bordo hover:bg-braidot-neutral-100 px-6 py-2 rounded-lg transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <h2 className="text-xl font-bold text-white mb-4">📊 Propiedades</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-6 border-l-4 border-braidot-primary-bordo transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-braidot-gris2 mb-1 font-medium">Total Propiedades</p>
                <p className="text-4xl font-bold text-braidot-primary-bordo">{stats.total}</p>
              </div>
              <svg className="w-14 h-14 text-braidot-primary-bordo/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-6 border-l-4 border-braidot-gris transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-braidot-gris2 mb-1 font-medium">En Venta</p>
                <p className="text-4xl font-bold text-braidot-gris">{stats.ventas}</p>
              </div>
              <svg className="w-14 h-14 text-braidot-gris/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-6 border-l-4 border-braidot-neutral-500 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-braidot-gris2 mb-1 font-medium">En Alquiler</p>
                <p className="text-4xl font-bold text-braidot-neutral-700">{stats.alquileres}</p>
              </div>
              <svg className="w-14 h-14 text-braidot-neutral-500/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-6 border-l-4 border-braidot-primary-bordo-light transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-braidot-gris2 mb-1 font-medium">Temporarias</p>
                <p className="text-4xl font-bold text-braidot-primary-bordo-light">{stats.temporarias}</p>
              </div>
              <svg className="w-14 h-14 text-braidot-primary-bordo-light/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold text-white mb-4">📅 Reservas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-6 border-l-4 border-yellow-500 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-braidot-gris2 mb-1 font-medium">Pendientes</p>
                <p className="text-4xl font-bold text-yellow-600">{stats.reservasPendientes}</p>
              </div>
              <span className="text-5xl">🟡</span>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-6 border-l-4 border-green-500 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-braidot-gris2 mb-1 font-medium">Confirmadas</p>
                <p className="text-4xl font-bold text-green-600">{stats.reservasConfirmadas}</p>
              </div>
              <span className="text-5xl">✅</span>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-6 border-l-4 border-braidot-primary-bordo transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-braidot-gris2 mb-1 font-medium">Ingresos Mes</p>
                <p className="text-3xl font-bold text-braidot-primary-bordo">
                  ${(stats.ingresosMes / 1000).toFixed(0)}k
                </p>
                <p className="text-xs text-braidot-neutral-600 mt-1">
                  ${stats.ingresosMes.toLocaleString('es-AR')}
                </p>
              </div>
              <svg className="w-14 h-14 text-braidot-primary-bordo/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold text-white mb-4">⚡ Acciones Rápidas</h2>
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              onClick={() => navigate('/admin/propiedades')}
              className="group bg-gradient-to-br from-braidot-primary-bordo to-braidot-primary-bordo-light hover:from-braidot-primary-bordo-light hover:to-braidot-primary-bordo text-white p-6 rounded-xl transition-all duration-300 text-left shadow-lg hover:shadow-2xl transform hover:scale-105"
            >
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <h3 className="font-bold text-xl">Gestionar Propiedades</h3>
              </div>
              <p className="text-sm text-white/90">Ver, editar y agregar propiedades</p>
            </button>

            <button 
              onClick={() => navigate('/admin/reservas')}
              className="group bg-gradient-to-br from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white p-6 rounded-xl transition-all duration-300 text-left shadow-lg hover:shadow-2xl transform hover:scale-105 relative"
            >
              {stats.reservasPendientes > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                  {stats.reservasPendientes}
                </span>
              )}
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="font-bold text-xl">Ver Reservas</h3>
              </div>
              <p className="text-sm text-white/90">
                {stats.reservasPendientes > 0 
                  ? `${stats.reservasPendientes} pendiente${stats.reservasPendientes > 1 ? 's' : ''} de confirmar`
                  : 'Gestionar calendario de quintas'}
              </p>
            </button>

            <button className="group bg-gradient-to-br from-braidot-neutral-700 to-braidot-neutral-500 hover:from-braidot-neutral-500 hover:to-braidot-neutral-700 text-white p-6 rounded-xl transition-all duration-300 text-left shadow-lg hover:shadow-2xl transform hover:scale-105">
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <h3 className="font-bold text-xl">Consultas</h3>
              </div>
              <p className="text-sm text-white/90">{stats.consultas} consultas pendientes</p>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;