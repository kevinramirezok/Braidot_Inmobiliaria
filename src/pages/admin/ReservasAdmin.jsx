import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

// Componente interno de Modal de Confirmación
const ConfirmModal = ({ isOpen, onClose, onConfirm, title, subtitle, confirmText, confirmColor, clientName }) => {
  if (!isOpen) return null;

  const colorClasses = {
    bordo: 'bg-[#5B0F0F] hover:bg-[#4a0c0c]',
    red: 'bg-red-600 hover:bg-red-700'
  };

  return (
    <div 
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-[100]"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Título */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
          {title.replace('[Nombre]', clientName || '')}
        </h3>
        
        {/* Subtítulo (opcional) */}
        {subtitle && (
          <p className="text-sm text-gray-600 mb-6 text-center">
            {subtitle}
          </p>
        )}

        {/* Botones */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 bg-[#E5E7EB] hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-2xl transition-colors text-base"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`flex-1 ${colorClasses[confirmColor]} text-white font-semibold py-3 px-6 rounded-2xl transition-colors text-base`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

const ReservasAdmin = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroEstado, setFiltroEstado] = useState('todas');
  const [busqueda, setBusqueda] = useState('');
  const [modalBloqueoAbierto, setModalBloqueoAbierto] = useState(false);
  const [propiedades, setPropiedades] = useState([]);
  const [formBloqueo, setFormBloqueo] = useState({
    propiedad_id: '',
    fecha_inicio: '',
    fecha_fin: ''
  });

  // Estados para modales de confirmación
  const [modalConfirm, setModalConfirm] = useState({
    isOpen: false,
    type: '', // 'aceptar', 'rechazar', 'eliminar'
    reservaId: null,
    clientName: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    cargarReservas();
    cargarPropiedades();
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
            localidad
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReservas(data || []);
    } catch (error) {
      console.error('Error cargando reservas:', error);
      toast.error('Error al cargar las reservas');
    } finally {
      setLoading(false);
    }
  };

  const cambiarEstado = async (id, nuevoEstado) => {
    const loadingToast = toast.loading('Actualizando reserva...');

    try {
      const { error } = await supabase
        .from('reservas')
        .update({ estado: nuevoEstado })
        .eq('id', id);

      if (error) throw error;

      const estadoTexto = nuevoEstado === 'confirmada' ? 'confirmada' : nuevoEstado === 'rechazada' ? 'rechazada' : 'cancelada';
      toast.success(`Reserva ${estadoTexto} exitosamente`, {
        id: loadingToast,
      });
      cargarReservas();
    } catch (error) {
      console.error('Error actualizando reserva:', error);
      toast.error('Error al actualizar la reserva', {
        id: loadingToast,
      });
    }
  };

  const abrirModalConfirmacion = (type, reservaId, clientName) => {
    setModalConfirm({
      isOpen: true,
      type,
      reservaId,
      clientName
    });
  };

  const cerrarModalConfirmacion = () => {
    setModalConfirm({
      isOpen: false,
      type: '',
      reservaId: null,
      clientName: ''
    });
  };

  const confirmarAccion = () => {
    const { type, reservaId } = modalConfirm;
    
    if (type === 'aceptar') {
      cambiarEstado(reservaId, 'confirmada');
    } else if (type === 'rechazar') {
      cambiarEstado(reservaId, 'rechazada');
    } else if (type === 'eliminar') {
      ejecutarEliminacion(reservaId);
    }
  };

  const ejecutarEliminacion = async (id) => {
    const loadingToast = toast.loading('Eliminando reserva...');

    try {
      const { error } = await supabase
        .from('reservas')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Reserva eliminada exitosamente', {
        id: loadingToast,
      });
      cargarReservas();
    } catch (error) {
      console.error('Error eliminando reserva:', error);
      toast.error('Error al eliminar la reserva', {
        id: loadingToast,
      });
    }
  };

  const cargarPropiedades = async () => {
    try {
      const { data, error } = await supabase
        .from('propiedades')
        .select('id, titulo, tipo')
        .eq('activa', true)
        .order('titulo');

      if (error) throw error;
      setPropiedades(data || []);
    } catch (error) {
      console.error('Error cargando propiedades:', error);
      toast.error('Error al cargar propiedades');
    }
  };

  const crearBloqueoManual = async (e) => {
    e.preventDefault();
    
    if (!formBloqueo.propiedad_id || !formBloqueo.fecha_inicio || !formBloqueo.fecha_fin) {
      toast.error('Todos los campos son obligatorios');
      return;
    }

    // Calcular días con fórmula de quintas: (Fecha_Fin - Fecha_Inicio) + 1
    const inicio = new Date(formBloqueo.fecha_inicio + 'T00:00:00');
    const fin = new Date(formBloqueo.fecha_fin + 'T00:00:00');
    const diffTime = fin - inicio;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const cantidadDias = diffDays + 1; // Incluye día de entrada y salida

    const loadingToast = toast.loading('Creando bloqueo...');

    try {
      const { error } = await supabase
        .from('reservas')
        .insert([{
          propiedad_id: formBloqueo.propiedad_id,
          nombre_cliente: 'ADMIN_BLOCK',
          email: 'admin@braidot.com',
          telefono: '---',
          fecha_inicio: formBloqueo.fecha_inicio,
          fecha_fin: formBloqueo.fecha_fin,
          cantidad_personas: 1,
          cantidad_noches: cantidadDias,
          precio_total: 0,
          notas: 'Bloqueo administrativo',
          estado: 'confirmada'
        }]);

      if (error) throw error;

      toast.success('Bloqueo creado exitosamente', {
        id: loadingToast,
      });
      
      setModalBloqueoAbierto(false);
      setFormBloqueo({ propiedad_id: '', fecha_inicio: '', fecha_fin: '' });
      cargarReservas();
    } catch (error) {
      console.error('Error creando bloqueo:', error);
      toast.error('Error al crear el bloqueo', {
        id: loadingToast,
      });
    }
  };

  const eliminarReserva = async (id, nombreCliente) => {
    abrirModalConfirmacion('eliminar', id, nombreCliente);
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
        backgroundImage: "url('/FONDO1.jpg')",
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
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
              <h1 className="text-xl sm:text-2xl font-bold text-white">Gestión de Reservas</h1>
              <p className="text-xs sm:text-sm text-braidot-blanco2">
                {reservasFiltradas.length} {reservasFiltradas.length === 1 ? 'reserva' : 'reservas'}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setModalBloqueoAbierto(true)}
              className="flex-1 sm:flex-none bg-yellow-500 hover:bg-yellow-600 text-white px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="hidden sm:inline">Bloqueo Manual</span>
              <span className="sm:hidden">Bloqueo</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 sm:flex-none bg-white text-braidot-primary-bordo hover:bg-braidot-neutral-100 px-4 sm:px-6 py-2 rounded-lg transition-all duration-300 font-semibold shadow-md hover:shadow-lg text-sm"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Contenido */}
      <main className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                          <p className="text-braidot-neutral-600">📆 {reserva.cantidad_noches} {reserva.cantidad_noches === 1 ? 'día' : 'días'}</p>
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
                          href={`https://wa.me/${reserva.telefono?.replace(/\D/g, '') || ''}?text=Hola ${reserva.nombre_cliente}, te contacto sobre tu reserva en ${reserva.propiedades?.titulo}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                          </svg>
                          Contactar
                        </a>

                        {reserva.estado === 'pendiente' && (
                          <>
                            <button
                              onClick={() => abrirModalConfirmacion('aceptar', reserva.id, reserva.nombre_cliente)}
                              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                            >
                              ✅ Confirmar
                            </button>
                            <button
                              onClick={() => abrirModalConfirmacion('rechazar', reserva.id, reserva.nombre_cliente)}
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

                        <button
                          onClick={() => eliminarReserva(reserva.id, reserva.nombre_cliente)}
                          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors ml-auto"
                          title="Eliminar reserva"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Eliminar
                        </button>
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

      {/* Modal de Bloqueo Manual - Mobile First Design */}
      {modalBloqueoAbierto && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header Sticky */}
            <div className="sticky top-0 z-20 bg-gradient-to-r from-braidot-primary-bordo to-braidot-primary-bordo-light">
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Bloqueo Manual
                    </h2>
                    <p className="text-braidot-blanco2 text-xs sm:text-sm mt-2">
                      Crea un bloqueo administrativo para reservar fechas sin cliente
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setModalBloqueoAbierto(false);
                      setFormBloqueo({ propiedad_id: '', fecha_inicio: '', fecha_fin: '' });
                    }}
                    className="text-white hover:text-braidot-blanco2 transition-colors p-1 -mt-1"
                    aria-label="Cerrar modal"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              {/* Indicador visual de drag (solo mobile) */}
              <div className="sm:hidden flex justify-center pb-2">
                <div className="w-12 h-1 bg-white/30 rounded-full"></div>
              </div>
            </div>

            {/* Contenido Scrollable */}
            <form onSubmit={crearBloqueoManual} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-braidot-negro mb-2">
                  Propiedad <span className="text-red-500">*</span>
                </label>
                <select
                  value={formBloqueo.propiedad_id}
                  onChange={(e) => setFormBloqueo({ ...formBloqueo, propiedad_id: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-braidot-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-braidot-primary-bordo text-base"
                >
                  <option value="">Seleccionar propiedad</option>
                  {propiedades.map((prop) => (
                    <option key={prop.id} value={prop.id}>
                      {prop.titulo}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-braidot-negro mb-2">
                  Fecha Inicio <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formBloqueo.fecha_inicio}
                  onChange={(e) => setFormBloqueo({ ...formBloqueo, fecha_inicio: e.target.value })}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-braidot-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-braidot-primary-bordo text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-braidot-negro mb-2">
                  Fecha Fin <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formBloqueo.fecha_fin}
                  onChange={(e) => setFormBloqueo({ ...formBloqueo, fecha_fin: e.target.value })}
                  required
                  min={formBloqueo.fecha_inicio || new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-braidot-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-braidot-primary-bordo text-base"
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Nota:</strong> Este bloqueo aparecerá en el calendario como "ADMIN_BLOCK" y evitará que los usuarios reserven estas fechas.
                </p>
              </div>

              {/* Botones Sticky en Mobile */}
              <div className="sticky bottom-0 left-0 right-0 bg-white pt-4 pb-2 sm:pb-0 flex gap-3 border-t sm:border-t-0 border-braidot-neutral-200 sm:border-0 -mx-4 sm:mx-0 px-4 sm:px-0">
                <button
                  type="button"
                  onClick={() => {
                    setModalBloqueoAbierto(false);
                    setFormBloqueo({ propiedad_id: '', fecha_inicio: '', fecha_fin: '' });
                  }}
                  className="flex-1 bg-braidot-neutral-200 hover:bg-braidot-neutral-300 text-braidot-negro font-semibold py-3 rounded-lg transition-colors text-base"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-braidot-primary-bordo hover:bg-braidot-primary-bordo-dark text-white font-semibold py-3 rounded-lg transition-colors text-base shadow-lg"
                >
                  Crear Bloqueo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Confirmación Estandarizado */}
      <ConfirmModal
        isOpen={modalConfirm.isOpen}
        onClose={cerrarModalConfirmacion}
        onConfirm={confirmarAccion}
        clientName={modalConfirm.clientName}
        title={
          modalConfirm.type === 'aceptar' 
            ? '¿Aceptar reserva de [Nombre]?'
            : modalConfirm.type === 'rechazar'
            ? '¿Rechazar reserva de [Nombre]?'
            : '¿Eliminar reserva de [Nombre]?'
        }
        subtitle={
          modalConfirm.type === 'eliminar' 
            ? 'Esta acción no se puede deshacer' 
            : null
        }
        confirmText={
          modalConfirm.type === 'aceptar'
            ? 'Aceptar'
            : modalConfirm.type === 'rechazar'
            ? 'Rechazar'
            : 'Eliminar'
        }
        confirmColor={
          modalConfirm.type === 'aceptar'
            ? 'bordo'
            : 'red'
        }
      />
    </div>
  );
};

export default ReservasAdmin;