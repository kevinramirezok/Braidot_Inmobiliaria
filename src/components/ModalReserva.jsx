import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import CalendarioReservas from './CalendarioReservas';
import toast from 'react-hot-toast';

const ModalReserva = ({ property, onClose }) => {
  const [reservasConfirmadas, setReservasConfirmadas] = useState([]);
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Calendario, 2: Formulario
  
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    personas: 1,
    mensaje: ''
  });

  // Cargar reservas confirmadas
  useEffect(() => {
    if (property) {
      cargarReservas();
      // Bloquear scroll del body cuando el modal está abierto
      document.body.style.overflow = 'hidden';
    }
    
    // Restaurar scroll al cerrar
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [property]);

  const cargarReservas = async () => {
    try {
      const { data, error } = await supabase
        .from('reservas')
        .select('fecha_inicio, fecha_fin, estado')
        .eq('propiedad_id', property.id)
        .in('estado', ['pendiente', 'confirmada']); // Traer PENDIENTES y CONFIRMADAS

      if (error) throw error;
      setReservasConfirmadas(data || []);
    } catch (error) {
      console.error('Error cargando reservas:', error);
    }
  };

  const handleSelectRange = (inicio, fin) => {
    // Actualizar rango de fechas seleccionado desde el calendario
    setFechaInicio(inicio);
    setFechaFin(fin);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Calcular cantidad de días o noches según el tipo de propiedad
  const calcularCantidad = () => {
    if (!fechaInicio || !fechaFin) return 0;
    const diff = fechaFin - fechaInicio;
    const dias = Math.ceil(diff / (1000 * 60 * 60 * 24));
    // Si es QUINTA: se cobra por DÍA (incluye día de entrada Y salida)
    // Fórmula: (Fecha_Fin - Fecha_Inicio) + 1
    // Ejemplo: 30/12 al 31/12 = 2 días
    // Si es un solo día (ej. 27/12), fecha_inicio = fecha_fin = 1 día
    if (property.tipo === "Quinta") {
      return dias + 1;
    }
    // Si es ESTADÍA (Cabaña, Casa, Depto, etc): se cobra por NOCHE
    return dias === 0 ? 1 : dias;
  };

  // Obtener el texto correcto según el tipo
  const getTipoUnidad = () => {
    return property.tipo === "Quinta" ? "Días" : "Noches";
  };

  const calcularTotal = () => {
    return calcularCantidad() * property.price;
  };

  const handleContinuar = () => {
    if (!fechaInicio) {
      toast.error('Por favor selecciona la fecha de check-in');
      return;
    }
    // Si no hay fecha fin, usar la misma fecha de inicio (1 día)
    if (!fechaFin) {
      setFechaFin(fechaInicio);
    }
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Guardar en Supabase
      // Nota: Los nombres de columnas deben coincidir EXACTAMENTE con la tabla reservas
      // Columnas reales: propiedad_id, nombre_cliente, email, telefono, fecha_inicio, fecha_fin, 
      //                  cantidad_personas, precio_total, cantidad_noches, notas, estado
      const { data, error } = await supabase
        .from('reservas')
        .insert([{
          propiedad_id: property.id,
          nombre_cliente: formData.nombre,
          email: formData.email,
          telefono: formData.telefono,
          fecha_inicio: fechaInicio.toISOString().split('T')[0],
          fecha_fin: fechaFin.toISOString().split('T')[0],
          cantidad_personas: parseInt(formData.personas),
          precio_total: calcularTotal(),
          cantidad_noches: calcularCantidad(), // Guarda los DÍAS (para quintas)
          notas: formData.mensaje,
          estado: 'pendiente'
        }])
        .select();

      if (error) throw error;

      // Abrir WhatsApp con mensaje pre-llenado
      const mensaje = `¡Hola! Me gustaría reservar la propiedad *${property.title}*

📅 Check-in: ${fechaInicio.toLocaleDateString('es-AR')}
📅 Check-out: ${(fechaFin || fechaInicio).toLocaleDateString('es-AR')}
${property.tipo === "Quinta" ? "📆" : "🌙"} ${getTipoUnidad()}: ${calcularCantidad()}
👥 Personas: ${formData.personas}
💰 Total: $${calcularTotal().toLocaleString('es-AR')}

👤 Nombre: ${formData.nombre}
📧 Email: ${formData.email}
📱 Teléfono: ${formData.telefono}
${formData.mensaje ? `\n📝 Mensaje: ${formData.mensaje}` : ''}`;

      const whatsappUrl = `https://wa.me/5493482305750?text=${encodeURIComponent(mensaje)}`;
      window.open(whatsappUrl, '_blank');

      toast.success('¡Reserva enviada exitosamente! Te redirigimos a WhatsApp para confirmar.', {
        duration: 5000,
      });
      onClose();
    } catch (error) {
      console.error('Error creando reserva:', error);
      toast.error('Error al crear la reserva. Por favor intentá de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (!property) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[99999] px-4 backdrop-blur-sm"
      style={{ background: 'rgba(91, 15, 15, 0.75)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-4xl relative overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-braidot-primary-bordo to-braidot-primary-bordo-light text-white p-6 z-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex items-start gap-4">
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-20 h-20 object-cover rounded-lg border-2 border-white/30"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">{property.title}</h2>
              <p className="text-white/90 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {property.location}
              </p>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6">
          {step === 1 && (
            <div>
              <h3 className="text-xl font-bold text-braidot-negro mb-4">
                Selecciona tus fechas
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Calendario */}
                <div>
                  <CalendarioReservas
                    reservasConfirmadas={reservasConfirmadas}
                    onSelectRange={handleSelectRange}
                    fechaInicio={fechaInicio}
                    fechaFin={fechaFin}
                  />
                </div>

                {/* Resumen */}
                <div>
                  <div className="bg-braidot-neutral-50 rounded-lg p-6 sticky top-6">
                    <h4 className="font-bold text-braidot-negro mb-4">Resumen de reserva</h4>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-braidot-neutral-600">Check-in:</span>
                        <span className="font-semibold text-braidot-negro">
                          {fechaInicio ? fechaInicio.toLocaleDateString('es-AR') : '-'}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-braidot-neutral-600">Check-out:</span>
                        <span className="font-semibold text-braidot-negro">
                          {fechaFin ? fechaFin.toLocaleDateString('es-AR') : (fechaInicio ? fechaInicio.toLocaleDateString('es-AR') : '-')}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm pt-3 border-t border-braidot-neutral-200">
                        <span className="text-braidot-neutral-600">{getTipoUnidad()}:</span>
                        <span className="font-semibold text-braidot-negro">{calcularCantidad()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-braidot-neutral-600">{`Precio por ${getTipoUnidad().toLowerCase().slice(0, -1)}:`}</span>
                        <span className="font-semibold text-braidot-negro">
                          ${property.price.toLocaleString('es-AR')}
                        </span>
                      </div>
                    </div>

                    <div className="bg-braidot-primary-bordo/10 rounded-lg p-4 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-braidot-negro font-semibold">Total:</span>
                        <span className="text-2xl font-bold text-braidot-primary-bordo">
                          ${calcularTotal().toLocaleString('es-AR')}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={handleContinuar}
                      disabled={!fechaInicio || !fechaFin}
                      className="w-full bg-braidot-primary-bordo hover:bg-braidot-primary-bordo-light text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continuar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 text-braidot-primary-bordo hover:text-braidot-primary-bordo-light mb-4 font-semibold"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver al calendario
              </button>

              <h3 className="text-xl font-bold text-braidot-negro mb-4">
                Completa tus datos
              </h3>

              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-braidot-negro mb-2">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-braidot-neutral-300 rounded-lg focus:ring-2 focus:ring-braidot-primary-bordo focus:border-transparent"
                      placeholder="Juan Pérez"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-braidot-negro mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-braidot-neutral-300 rounded-lg focus:ring-2 focus:ring-braidot-primary-bordo focus:border-transparent"
                      placeholder="juan@ejemplo.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-braidot-negro mb-2">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-braidot-neutral-300 rounded-lg focus:ring-2 focus:ring-braidot-primary-bordo focus:border-transparent"
                      placeholder="3482-XXXXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-braidot-negro mb-2">
                      Cantidad de personas *
                    </label>
                    <input
                      type="number"
                      name="personas"
                      value={formData.personas}
                      onChange={handleChange}
                      required
                      min="1"
                      className="w-full px-4 py-2 border border-braidot-neutral-300 rounded-lg focus:ring-2 focus:ring-braidot-primary-bordo focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-braidot-negro mb-2">
                      Mensaje (opcional)
                    </label>
                    <textarea
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-2 border border-braidot-neutral-300 rounded-lg focus:ring-2 focus:ring-braidot-primary-bordo focus:border-transparent"
                      placeholder="¿Algún comentario adicional?"
                    />
                  </div>
                </div>

                <div>
                  <div className="bg-braidot-neutral-50 rounded-lg p-6 sticky top-6">
                    <h4 className="font-bold text-braidot-negro mb-4">Resumen final</h4>

                    <div className="space-y-2 mb-6 text-sm">
                      <div className="flex justify-between">
                        <span className="text-braidot-neutral-600">Check-in:</span>
                        <span className="font-semibold">{fechaInicio.toLocaleDateString('es-AR')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-braidot-neutral-600">Check-out:</span>
                        <span className="font-semibold">{(fechaFin || fechaInicio).toLocaleDateString('es-AR')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-braidot-neutral-600">{getTipoUnidad()}:</span>
                        <span className="font-semibold">{calcularCantidad()}</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t border-braidot-neutral-200">
                        <span className="text-braidot-negro font-semibold">Total:</span>
                        <span className="text-xl font-bold text-braidot-primary-bordo">
                          ${calcularTotal().toLocaleString('es-AR')}
                        </span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Enviando...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                          </svg>
                          Confirmar y enviar por WhatsApp
                        </>
                      )}
                    </button>

                    <p className="text-xs text-braidot-neutral-600 mt-3 text-center">
                      Tu reserva quedará pendiente hasta que la confirmemos
                    </p>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalReserva;