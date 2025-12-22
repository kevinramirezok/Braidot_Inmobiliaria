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
    reservasConfirmadas: 0
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
        reservasConfirmadas
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
      <div className="flex items-center justify-center min-h-screen" style={{
        backgroundImage: "url('/src/assets/images/FONDO1.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-[#5B0F0F]/30" />
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-braidot-primary-bordo relative z-10"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative" style={{
      backgroundImage: "url('/src/assets/images/FONDO1.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-[#5B0F0F]/30" />
      
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
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <svg className="w-6 h-6 text-braidot-primary-bordo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Propiedades
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.3)] p-6 border-l-4 border-braidot-primary-bordo transform transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_40px_rgba(91,15,15,0.4)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1 font-medium">Total Propiedades</p>
                <p className="text-4xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <svg className="w-14 h-14 text-braidot-primary-bordo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.3)] p-6 border-l-4 border-braidot-primary-bordo transform transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_40px_rgba(91,15,15,0.4)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1 font-medium">En Venta</p>
                <p className="text-4xl font-bold text-gray-900">{stats.ventas}</p>
              </div>
              <svg className="w-14 h-14 text-braidot-primary-bordo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.3)] p-6 border-l-4 border-braidot-primary-bordo transform transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_40px_rgba(91,15,15,0.4)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1 font-medium">En Alquiler</p>
                <p className="text-4xl font-bold text-gray-900">{stats.alquileres}</p>
              </div>
              <svg className="w-14 h-14 text-braidot-primary-bordo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.3)] p-6 border-l-4 border-braidot-primary-bordo transform transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_40px_rgba(91,15,15,0.4)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1 font-medium">Temporarias</p>
                <p className="text-4xl font-bold text-gray-900">{stats.temporarias}</p>
              </div>
              <svg className="w-14 h-14 text-braidot-primary-bordo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <svg className="w-6 h-6 text-braidot-primary-bordo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Reservas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.3)] p-6 border-l-4 border-yellow-500 transform transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_40px_rgba(234,179,8,0.4)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1 font-medium">Pendientes</p>
                <p className="text-4xl font-bold text-yellow-600">{stats.reservasPendientes}</p>
              </div>
              <svg className="w-14 h-14 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.3)] p-6 border-l-4 border-green-500 transform transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_40px_rgba(34,197,94,0.4)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1 font-medium">Confirmadas</p>
                <p className="text-4xl font-bold text-green-600">{stats.reservasConfirmadas}</p>
              </div>
              <svg className="w-14 h-14 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

        </div>

        <h2 className="text-xl font-bold text-[#F3F4F6] mb-4 flex items-center gap-2">
          <svg className="w-6 h-6 text-braidot-primary-bordo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Acciones Rápidas
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 w-full">
          <button
            onClick={() => navigate('/admin/propiedades')}
            className="group flex-1 bg-[#0b0b0b] hover:bg-braidot-primary-bordo border-2 border-braidot-primary-bordo text-[#F3F4F6] hover:text-white p-6 rounded-2xl transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.7)] hover:shadow-[0_8px_40px_rgba(91,15,15,0.6)] transform hover:scale-105 flex flex-col justify-center items-start"
          >
            <div className="flex items-center gap-3 mb-2">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <h3 className="font-bold text-lg">Gestionar Propiedades</h3>
            </div>
            <p className="text-sm text-[#737373] group-hover:text-white/90 transition-colors">Ver, editar y agregar propiedades</p>
          </button>

          <button 
            onClick={() => navigate('/admin/reservas')}
            className="group flex-1 bg-braidot-primary-bordo hover:bg-braidot-primary-bordo-light text-white p-6 rounded-2xl transition-all duration-300 shadow-[0_4px_30px_rgba(91,15,15,0.5)] hover:shadow-[0_8px_40px_rgba(91,15,15,0.7)] transform hover:scale-105 flex flex-col justify-center items-start relative"
          >
            {stats.reservasPendientes > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full animate-pulse shadow-lg">
                {stats.reservasPendientes}
              </span>
            )}
            <div className="flex items-center gap-3 mb-2">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="font-bold text-lg">Ver Reservas</h3>
            </div>
            <p className="text-sm text-white/90">
              {stats.reservasPendientes > 0 
                ? `${stats.reservasPendientes} pendiente${stats.reservasPendientes > 1 ? 's' : ''} de confirmar`
                : 'Gestionar calendario de quintas'}
            </p>
          </button>
        </div>
      </main>
    </div>
  );
};
export default Dashboard;