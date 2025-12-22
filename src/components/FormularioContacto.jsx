import { useState } from 'react';
import { supabase } from '../lib/supabase';

const FormularioContacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje({ tipo: '', texto: '' });

    try {
      const { error } = await supabase
        .from('consultas')
        .insert([
          {
            nombre: formData.nombre,
            email: formData.email,
            telefono: formData.telefono,
            mensaje: formData.mensaje,
            estado: 'pendiente'
          }
        ]);

      if (error) throw error;

      setMensaje({
        tipo: 'success',
        texto: '¡Consulta enviada! Te contactaremos pronto.'
      });

      // Limpiar formulario
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        mensaje: ''
      });

      // Opcional: abrir WhatsApp
      const whatsappMsg = `Hola, soy ${formData.nombre}. ${formData.mensaje}`;
      setTimeout(() => {
        window.open(`https://wa.me/5493482305750?text=${encodeURIComponent(whatsappMsg)}`, '_blank');
      }, 1500);

    } catch (error) {
      console.error('Error enviando consulta:', error);
      setMensaje({
        tipo: 'error',
        texto: 'Error al enviar la consulta. Por favor intenta de nuevo.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-white/10 backdrop-blur-md py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-white drop-shadow-[0_2px_8px_rgba(91,15,15,0.8)] mb-4">
            ¿Tenés alguna consulta?
          </h2>
          <p className="text-lg text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
            Completá el formulario y te contactaremos a la brevedad
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Nombre */}
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
                  className="w-full px-4 py-3 border border-braidot-neutral-300 rounded-lg focus:ring-2 focus:ring-braidot-primary-bordo focus:border-transparent transition-all"
                  placeholder="Juan Pérez"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-braidot-negro mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-braidot-neutral-300 rounded-lg focus:ring-2 focus:ring-braidot-primary-bordo focus:border-transparent transition-all"
                  placeholder="juan@ejemplo.com"
                />
              </div>
            </div>

            {/* Teléfono */}
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
                className="w-full px-4 py-3 border border-braidot-neutral-300 rounded-lg focus:ring-2 focus:ring-braidot-primary-bordo focus:border-transparent transition-all"
                placeholder="3482-XXXXXX"
              />
            </div>

            {/* Mensaje */}
            <div>
              <label className="block text-sm font-semibold text-braidot-negro mb-2">
                Mensaje *
              </label>
              <textarea
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-3 border border-braidot-neutral-300 rounded-lg focus:ring-2 focus:ring-braidot-primary-bordo focus:border-transparent transition-all resize-none"
                placeholder="Contanos tu consulta..."
              />
            </div>

            {/* Mensaje de éxito/error */}
            {mensaje.texto && (
              <div className={`p-4 rounded-lg ${
                mensaje.tipo === 'success' 
                  ? 'bg-green-100 text-green-800 border border-green-300' 
                  : 'bg-red-100 text-red-800 border border-red-300'
              }`}>
                {mensaje.texto}
              </div>
            )}

            {/* Botón enviar */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-braidot-primary-bordo hover:bg-braidot-primary-bordo-light text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Enviando...
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Enviar consulta
                </>
              )}
            </button>

            <p className="text-xs text-center text-braidot-neutral-600">
              También podés contactarnos directamente por WhatsApp al 3482-305750
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FormularioContacto;
