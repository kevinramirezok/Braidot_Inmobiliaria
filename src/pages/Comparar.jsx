import { useCompare } from '../contexts/CompareContext';
import { useNavigate } from 'react-router-dom';

const Comparar = () => {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const navigate = useNavigate();

  if (compareList.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-braidot-neutral-200 to-braidot-neutral-300">
        <div className="text-center bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-12 max-w-md">
          <svg className="w-24 h-24 mx-auto mb-6 text-braidot-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <h2 className="text-2xl font-bold text-braidot-negro mb-4">
            No hay propiedades para comparar
          </h2>
          <p className="text-braidot-neutral-600 mb-6">
            Selecciona al menos 2 propiedades para poder compararlas
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-braidot-primary-bordo hover:bg-braidot-primary-bordo-light text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const caracteristicas = [
    { key: 'operation', label: 'Operación', icon: '🏷️' },
    { key: 'tipo', label: 'Tipo de propiedad', icon: '🏠' },
    { key: 'price', label: 'Precio', icon: '💰', format: (val) => `$${val?.toLocaleString('es-AR')}` },
    { key: 'localidad', label: 'Localidad', icon: '📍' },
    { key: 'provincia', label: 'Provincia', icon: '🗺️' },
    { key: 'direccion', label: 'Dirección', icon: '📫' },
    { key: 'barrio', label: 'Barrio', icon: '🏘️' },
    { key: 'ambientes', label: 'Ambientes', icon: '🚪' },
    { key: 'banos', label: 'Baños', icon: '🚿' },
    { key: 'cocheras', label: 'Cocheras', icon: '🚗' },
    { key: 'metros_cuadrados', label: 'M² cubiertos', icon: '📐', format: (val) => val ? `${val}m²` : '-' },
    { key: 'metros_terreno', label: 'M² terreno', icon: '🏞️', format: (val) => val ? `${val}m²` : '-' },
    { key: 'tiene_patio', label: 'Patio', icon: '🌳', format: (val) => val ? 'Sí' : 'No' },
    { key: 'checkin_hora', label: 'Check-in', icon: '🕐' },
    { key: 'checkout_hora', label: 'Check-out', icon: '🕐' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-braidot-neutral-200 to-braidot-neutral-300 py-8">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-30 mb-8">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-braidot-primary-bordo hover:text-braidot-primary-bordo-light transition-colors font-semibold"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver
            </button>
            <div className="text-center flex-1">
              <h1 className="text-2xl font-bold text-braidot-negro">Comparar Propiedades</h1>
              <p className="text-sm text-braidot-neutral-600">{compareList.length} propiedades seleccionadas</p>
            </div>
            <button
              onClick={clearCompare}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Limpiar todo
            </button>
          </div>
        </div>
      </div>

      {/* Tabla de comparación - NUEVO DISEÑO */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="sticky left-0 bg-gradient-to-r from-braidot-primary-bordo to-[#4B1D2A] z-20 p-6 text-left">
                    <span className="text-white font-bold text-lg">Característica</span>
                  </th>
                  {compareList.map((property, index) => (
                    <th
                      key={property.id}
                      className={`relative p-6 min-w-[300px] ${
                        index === 0
                          ? 'bg-gradient-to-br from-[#1A2238] to-[#26304A]' // azul marino oscuro
                          : index === 1
                          ? 'bg-gradient-to-br from-[#2D142C] to-[#4B1D2A]' // bordo oscuro
                          : 'bg-gradient-to-br from-[#23272F] to-[#43464D]' // gris oscuro
                      }`}
                    >
                      <button
                        onClick={() => removeFromCompare(property.id)}
                        className="absolute top-3 right-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full w-8 h-8 flex items-center justify-center font-bold transition-all shadow-lg hover:scale-110"
                      >
                        ×
                      </button>
                      <div className="text-white">
                        <p className="font-bold text-lg mb-2 pr-8">{property.title}</p>
                        <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                          {property.operation}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {caracteristicas.map((caracteristica, index) => {
                  const tieneValor = compareList.some(prop => {
                    const valor = prop[caracteristica.key];
                    return valor !== null && valor !== undefined && valor !== '' && valor !== 0;
                  });

                  if (!tieneValor) return null;

                  return (
                    <tr key={caracteristica.key} className="border-b border-braidot-neutral-200 hover:bg-braidot-neutral-50 transition-colors">
                      <td className="sticky left-0 bg-white z-10 p-5 border-r border-braidot-neutral-200">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{caracteristica.icon}</span>
                          <span className="font-semibold text-braidot-negro">{caracteristica.label}</span>
                        </div>
                      </td>
                      {compareList.map((property, propIndex) => {
                        const valor = property[caracteristica.key];
                        const valorFormateado = caracteristica.format 
                          ? caracteristica.format(valor) 
                          : valor || '-';
                        // Colores de fondo y texto a juego con el header
                        let bgColor = '';
                        let textColor = '';
                        if (propIndex === 0) {
                          bgColor = 'bg-[#1A2238]';
                          textColor = 'text-white';
                        } else if (propIndex === 1) {
                          bgColor = 'bg-[#2D142C]';
                          textColor = 'text-white';
                        } else {
                          bgColor = 'bg-[#23272F]';
                          textColor = 'text-white';
                        }
                        return (
                          <td key={property.id} className={`p-5 text-center font-medium ${bgColor} ${textColor}`}> 
                            {valorFormateado}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}

                {/* Servicios */}
                <tr className="border-b border-braidot-neutral-200 hover:bg-braidot-neutral-50 transition-colors">
                  <td className="sticky left-0 bg-white z-10 p-5 border-r border-braidot-neutral-200">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">✅</span>
                      <span className="font-semibold text-braidot-negro">Servicios</span>
                    </div>
                  </td>
                  {compareList.map((property, propIndex) => (
                    <td key={property.id} className="p-5">
                      {property.servicios && property.servicios.length > 0 ? (
                        <div className="flex flex-wrap gap-2 justify-center">
                          {property.servicios.map((servicio, idx) => (
                            <span 
                              key={idx}
                              className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                                propIndex === 0 ? 'bg-blue-100 text-blue-700' :
                                propIndex === 1 ? 'bg-purple-100 text-purple-700' :
                                'bg-green-100 text-green-700'
                              }`}
                            >
                              {servicio}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-braidot-neutral-400">-</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Descripción */}
                <tr className="border-b border-braidot-neutral-200 hover:bg-braidot-neutral-50 transition-colors">
                  <td className="sticky left-0 bg-white z-10 p-5 border-r border-braidot-neutral-200">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📝</span>
                      <span className="font-semibold text-braidot-negro">Descripción</span>
                    </div>
                  </td>
                  {compareList.map(property => (
                    <td key={property.id} className="p-5 text-sm text-braidot-neutral-700 text-left">
                      {property.descripcion ? (
                        <p className="line-clamp-3 leading-relaxed">{property.descripcion}</p>
                      ) : (
                        <span className="text-braidot-neutral-400">-</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Acciones */}
                <tr className="bg-braidot-neutral-50">
                  <td className="sticky left-0 bg-braidot-neutral-50 z-10 p-5 border-r border-braidot-neutral-200">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">⚡</span>
                      <span className="font-semibold text-braidot-negro">Acciones</span>
                    </div>
                  </td>
                  {compareList.map(property => (
                    <td key={property.id} className="p-5">
                      <button
                        onClick={() => window.open(`https://wa.me/5493482305750?text=Consulta por: ${property.title}`, '_blank')}
                        className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                        Consultar
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comparar;

// Agregar la función para generar el mensaje detallado
function generarMensajeConsulta(prop) {
  let mensaje = `*Consulta por:* ${prop.title}\n\n`;
  if (prop.tipo) mensaje += `*Tipo:* ${prop.tipo}\n`;
  if (prop.operation) mensaje += `*Operación:* ${prop.operation}\n`;
  if (prop.price) mensaje += `*Precio:* $${prop.price?.toLocaleString('es-AR')}\n`;
  if (prop.localidad || prop.provincia) {
    mensaje += `*Ubicación:* ${prop.localidad || ''}${prop.provincia ? ', ' + prop.provincia : ''}\n`;
  } else if (prop.location) {
    mensaje += `*Ubicación:* ${prop.location}\n`;
  }
  if (prop.barrio) mensaje += `*Barrio:* ${prop.barrio}\n`;
  if (prop.direccion) mensaje += `*Dirección:* ${prop.direccion}\n`;
  const caracteristicas = [];
  if (prop.ambientes) caracteristicas.push(`${prop.ambientes} ambientes`);
  if (prop.banos) caracteristicas.push(`${prop.banos} baños`);
  if (prop.cocheras) caracteristicas.push(`${prop.cocheras} cocheras`);
  if (prop.metros_cuadrados) caracteristicas.push(`${prop.metros_cuadrados}m²`);
  if (caracteristicas.length > 0) {
    mensaje += `*Características:* ${caracteristicas.join(' • ')}\n`;
  }
  mensaje += `\nMe gustaría obtener más información sobre esta propiedad.`;
  return mensaje;
}
