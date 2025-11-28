import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

const ReservasAdmin = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroEstado, setFiltroEstado] = useState('todas');
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    cargarReservas();
  }, [user, navigate]);

  const cargarReservas = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('reservas')
        .select(`
          *,
          propiedades (
            id,
            titulo,
            imagenes,
            ubicacion
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReservas(data || []);
    } catch (error) {
      console.error('Error cargando reservas:', error);
      alert('Error al cargar las reservas');
    } finally {
      setLoading(false);
    }
  };

  const cambiarEstado = async (id, nuevoEstado) => {
    if (!confirm(`¿Seguro que quieres ${nuevoEstado === 'confirmada' ? 'confirmar' : nuevoEstado === 'rechazada' ? 'rechazar' : 'cancelar'} esta reserva?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('reservas')
        .update({ estado: nuevoEstado })
        .eq('id', id);

      if (error) throw error;
      
      alert(`Reserva ${nuevoEstado} exitosamente`);
      cargarReservas();
    } catch (error) {
      console.error('Error actualizando reserva:', error);
      alert('Error al actualizar la reserva');
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

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'pendiente': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'confirmada': return 'bg-green-100 text-green-700 border-green-300';
      case 'rechazada': return 'bg-red-100 text-red-700 border-red-300';
      case 'cancelada': return 'bg-gray-100 text-gray-700 border-gray-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getEstadoIcono = (estado) => {
    switch (estado) {
      case 'pendiente': return '🟡';
      case 'confirmada': return '✅';
      case 'rechazada': return '❌';
      case 'cancelada': return '🚫';
      default: return '❓';
    }
  };

  const reservasFiltradas = reservas
    .filter(r => filtroEstado === 'todas' || r.estado === filtroEstado)
    .filter(r => {
      if (!busqueda) return true;
      const searchLower = busqueda.toLowerCase();
      return (
        r.nombre_cliente?.toLowerCase().includes(searchLower) ||
        r.propiedades?.titulo?.toLowerCase().includes(searchLower) ||
        r.telefono_cliente?.includes(busqueda)
      );
    });

  const stats = {
    total: reservas.length,
    pendientes: reservas.filter(r => r.estado === 'pendiente').length,
    confirmadas: reservas.filter(r => r.estado === 'confirmada').length,
    ingresosMes: reservas
      .filter(r => r.estado === 'confirmada' && new Date(r.created_at).getMonth() === new Date().getMonth())
      .reduce((sum, r) => sum + (parseFloat(r.precio_total) || 0), 0)
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
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-braidot-negro/70"></div>

      {/* Header */}
      <header className="bg-gradient-to-r from-braidot-primary-bordo to-braidot-primary-bordo-light shadow-xl relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="text-white hover:text-braidot-blanco2 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">Gestión de Reservas</h1>
              <p className="text-sm text-braidot-blanco2">
                {reservasFiltradas.length} {reservasFiltradas.length === 1 ? 'reserva' : 'reservas'}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="bg-white text-braidot-primary-bordo hover:bg-braidot-neutral-100 px-6 py-2 rounded-lg transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Contenido */}
      <main className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-6 border-l-4 border-braidot-primary-bordo">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-braidot-gris2 mb-1 font-medium">Total Reservas</p>
                <p className="text-4xl font-bold text-braidot-primary-bordo">{stats.total}</p>
              </div>
              <svg className="w-14 h-14 text-braidot-primary-bordo/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-braidot-gris2 mb-1 font-medium">Pendientes</p>
                <p className="text-4xl font-bold text-yellow-600">{stats.pendientes}</p>
              </div>
              <span className="text-5xl">🟡</span>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-braidot-gris2 mb-1 font-medium">Confirmadas</p>
                <p className="text-4xl font-bold text-green-600">{stats.confirmadas}</p>
              </div>
              <span className="text-5xl">✅</span>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-6 border-l-4 border-braidot-gris">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-braidot-gris2 mb-1 font-medium">Ingresos Mes</p>
                <p className="text-3xl font-bold text-braidot-gris">${(stats.ingresosMes / 1000).toFixed(0)}k</p>
              </div>
              <svg className="w-14 h-14 text-braidot-gris/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-braidot-negro mb-2">
                Filtrar por estado
              </label>
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="w-full px-4 py-2 border border-braidot-neutral-300 rounded-lg focus:ring-2 focus:ring-braidot-primary-bordo"
              >
                <option value="todas">Todas</option>
                <option value="pendiente">🟡 Pendientes</option>
                <option value="confirmada">✅ Confirmadas</option>
                <option value="rechazada">❌ Rechazadas</option>
                <option value="cancelada">🚫 Canceladas</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-braidot-negro mb-2">
                Buscar
              </label>
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Cliente, propiedad, teléfono..."
                className="w-full px-4 py-2 border border-braidot-neutral-300 rounded-lg focus:ring-2 focus:ring-braidot-primary-bordo"
              />
            </div>
          </div>
        </div>

        {/* Lista de reservas */}
        <div className="space-y-4">
          {reservasFiltradas.length > 0 ? (
            reservasFiltradas.map((reserva) => (
              <div key={reserva.id} className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Imagen de la propiedad */}
                    <div className="lg:w-48 flex-shrink-0">
                      {reserva.propiedades?.imagenes?.[0] && (
                        <img
                          src={reserva.propiedades.imagenes[0]}
                          alt={reserva.propiedades.titulo}
                          className="w-full h-32 lg:h-full object-cover rounded-lg"
                        />
                      )}
                    </div>

                    {/* Información */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-braidot-negro mb-1">
                            {reserva.propiedades?.titulo || 'Propiedad eliminada'}
                          </h3>
                          <p className="text-sm text-braidot-neutral-600 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                            {reserva.propiedades?.ubicacion}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getEstadoColor(reserva.estado)}`}>
                          {getEstadoIcono(reserva.estado)} {reserva.estado.charAt(0).toUpperCase() + reserva.estado.slice(1)}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-braidot-neutral-600 font-medium mb-1">Cliente</p>
                          <p className="text-braidot-negro font-semibold">{reserva.nombre_cliente}</p>
                          <p className="text-braidot-neutral-600">{reserva.telefono_cliente}</p>
                          <p className="text-braidot-neutral-600 text-xs">{reserva.email_cliente}</p>
                        </div>

                        <div>
                          <p className="text-braidot-neutral-600 font-medium mb-1">Fechas</p>
                          <p className="text-braidot-negro">
                            📅 {new Date(reserva.fecha_inicio).toLocaleDateString('es-AR')} → {new Date(reserva.fecha_fin).toLocaleDateString('es-AR')}
                          </p>
                          <p className="text-braidot-neutral-600">🌙 {reserva.cantidad_noches} {reserva.cantidad_noches === 1 ? 'noche' : 'noches'}</p>
                          <p className="text-braidot-neutral-600">👥 {reserva.cantidad_personas} {reserva.cantidad_personas === 1 ? 'persona' : 'personas'}</p>
                        </div>

                        <div>
                          <p className="text-braidot-neutral-600 font-medium mb-1">Monto</p>
                          <p className="text-2xl font-bold text-braidot-primary-bordo">
                            ${parseFloat(reserva.precio_total).toLocaleString('es-AR')}
                          </p>
                          <p className="text-xs text-braidot-neutral-600">
                            Reservada el {new Date(reserva.created_at).toLocaleDateString('es-AR')}
                          </p>
                        </div>
                      </div>

                      {reserva.notas && (
                        <div className="bg-braidot-neutral-50 p-3 rounded-lg">
                          <p className="text-sm text-braidot-neutral-600 font-medium mb-1">Mensaje del cliente:</p>
                          <p className="text-sm text-braidot-negro">{reserva.notas}</p>
                        </div>
                      )}

                      {/* Acciones */}
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-braidot-neutral-200">
                        <a
                          href={`https://wa.me/${reserva.telefono_cliente.replace(/\D/g, '')}?text=Hola ${reserva.nombre_cliente}, te contacto sobre tu reserva en ${reserva.propiedades?.titulo}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                          </svg>
                          Contactar
                        </a>

                        {reserva.estado === 'pendiente' && (
                          <>
                            <button
                              onClick={() => cambiarEstado(reserva.id, 'confirmada')}
                              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                            >
                              ✅ Confirmar
                            </button>
                            <button
                              onClick={() => cambiarEstado(reserva.id, 'rechazada')}
                              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                            >
                              ❌ Rechazar
                            </button>
                          </>
                        )}

                        {reserva.estado === 'confirmada' && (
                          <button
                            onClick={() => cambiarEstado(reserva.id, 'cancelada')}
                            className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                          >
                            🚫 Cancelar
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-12 text-center">
              <svg className="w-20 h-20 mx-auto mb-4 text-braidot-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-xl font-bold text-braidot-negro mb-2">
                No hay reservas
              </h3>
              <p className="text-braidot-neutral-600">
                {busqueda || filtroEstado !== 'todas'
                  ? 'No se encontraron reservas con los filtros seleccionados'
                  : 'Aún no hay reservas en el sistema'}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ReservasAdmin;