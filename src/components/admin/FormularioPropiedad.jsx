import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

const FormularioPropiedad = ({ propiedad, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    operation: 'Venta',
    precio: '',
    localidad: '',
    provincia: '',
    direccion: '',
    barrio: '',
    ambientes: 1,
    banos: 1,
    cocheras: 0,
    metros_cuadrados: '',
    metros_terreno: '',
    tipo: 'Casa',
    servicios: [],
    tiene_patio: false,
    imagenes: [],
    activa: true,
    destacada: false,
    checkin_hora: '14:00',
    checkout_hora: '10:00'
  });

  const [urlsImagenes, setUrlsImagenes] = useState('');
  const [archivosImagenes, setArchivosImagenes] = useState([]);
  const [previsualizaciones, setPrevisualizaciones] = useState([]);

  useEffect(() => {
    if (propiedad) {
      setFormData({
        titulo: propiedad.titulo || '',
        descripcion: propiedad.descripcion || '',
        operation: propiedad.operation || 'Venta',
        precio: propiedad.precio || '',
        localidad: propiedad.localidad || '',
        provincia: propiedad.provincia || '',
        direccion: propiedad.direccion || '',
        barrio: propiedad.barrio || '',
        ambientes: propiedad.ambientes || 1,
        banos: propiedad.banos || 1,
        cocheras: propiedad.cocheras || 0,
        metros_cuadrados: propiedad.metros_cuadrados || '',
        metros_terreno: propiedad.metros_terreno || '',
        tipo: propiedad.tipo || 'Casa',
        servicios: propiedad.servicios || [],
        tiene_patio: propiedad.tiene_patio || false,
        imagenes: propiedad.imagenes || [],
        activa: propiedad.activa !== undefined ? propiedad.activa : true,
        destacada: propiedad.destacada || false,
        checkin_hora: propiedad.checkin_hora || '14:00',
        checkout_hora: propiedad.checkout_hora || '10:00'
      });
      setUrlsImagenes(propiedad.imagenes?.join('\n') || '');
      setPrevisualizaciones(propiedad.imagenes || []);
    }
  }, [propiedad]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleServiciosChange = (servicio) => {
    setFormData(prev => ({
      ...prev,
      servicios: prev.servicios.includes(servicio)
        ? prev.servicios.filter(s => s !== servicio)
        : [...prev.servicios, servicio]
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const maxSize = 5 * 1024 * 1024;
    const archivosValidos = files.filter(file => {
      if (file.size > maxSize) {
        toast.error(`La imagen ${file.name} supera los 5MB`);
        return false;
      }
      return true;
    });

    setArchivosImagenes(prev => [...prev, ...archivosValidos]);

    archivosValidos.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPrevisualizaciones(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const eliminarImagen = (index) => {
    setPrevisualizaciones(prev => prev.filter((_, i) => i !== index));
    setArchivosImagenes(prev => prev.filter((_, i) => i !== index));
  };

  const subirImagenes = async () => {
    if (archivosImagenes.length === 0) return [];

    setUploadingImages(true);
    const urlsSubidas = [];

    try {
      // Iterar con índice para mantener el orden
      for (let i = 0; i < archivosImagenes.length; i++) {
        const archivo = archivosImagenes[i];
        const fileExt = archivo.name.split('.').pop();
        
        // Formatear índice con dos dígitos (00, 01, 02, etc.)
        const indiceFormateado = i.toString().padStart(2, '0');
        
        // Nombre original sin extensión
        const nombreOriginal = archivo.name.substring(0, archivo.name.lastIndexOf('.'));
        
        // Nuevo nombre: prefijo numérico + nombre original (sanitizado) + timestamp único
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substring(7);
        const nombreSanitizado = nombreOriginal.replace(/[^a-zA-Z0-9_-]/g, '_');
        const fileName = `${indiceFormateado}-${nombreSanitizado}-${timestamp}-${randomId}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data, error } = await supabase.storage
          .from('propiedades-imagenes')
          .upload(filePath, archivo, {
            cacheControl: '3600',
            upsert: false
          });

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
          .from('propiedades-imagenes')
          .getPublicUrl(filePath);

        urlsSubidas.push(publicUrl);
      }

      return urlsSubidas;
    } catch (error) {
      console.error('Error subiendo imágenes:', error);
      toast.error('Error al subir las imágenes: ' + error.message);
      return [];
    } finally {
      setUploadingImages(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const urlsArchivos = await subirImagenes();
      const urlsTexto = urlsImagenes.split('\n').map(url => url.trim()).filter(url => url.length > 0);
      const todasLasImagenes = [...urlsTexto, ...urlsArchivos];

      if (todasLasImagenes.length === 0) {
        toast.error('Debés agregar al menos una imagen');
        setLoading(false);
        return;
      }

      const dataToSave = {
        ...formData,
        precio: parseFloat(formData.precio),
        ambientes: parseInt(formData.ambientes),
        banos: parseInt(formData.banos),
        cocheras: parseInt(formData.cocheras),
        metros_cuadrados: formData.metros_cuadrados ? parseFloat(formData.metros_cuadrados) : null,
        metros_terreno: formData.metros_terreno ? parseFloat(formData.metros_terreno) : null,
        imagenes: todasLasImagenes
      };

      let error;

      if (propiedad) {
        const result = await supabase.from('propiedades').update(dataToSave).eq('id', propiedad.id);
        error = result.error;
      } else {
        const result = await supabase.from('propiedades').insert([dataToSave]);
        error = result.error;
      }

      if (error) throw error;

      toast.success(propiedad ? 'Propiedad actualizada exitosamente' : 'Propiedad creada exitosamente');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error guardando propiedad:', error);
      toast.error('Error al guardar la propiedad: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const serviciosDisponibles = [
    'Luz', 'Agua', 'Internet', 'Gas natural', 'Cloacas', 'Agua corriente',
    'Asfalto', 'Cochera/Garaje', 'Piscina/Pileta', 'Quincho/Parrilla',
    'Aire acondicionado', 'Calefacción', 'Lavadero', 'Balcón/Terraza',
    'WiFi', 'Ropa de cama', 'Cocina equipada', 'Espacio verde'
  ];

  const tiposPropiedad = ['Casa', 'Departamento', 'Quinta', 'Baldío', 'Local', 'Oficina', 'Campo', 'Monoambiente', 'Cabaña'];

  return (
    <div className="fixed inset-0 bg-braidot-negro/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full my-8 shadow-xl">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-braidot-neutral-200">
          <h2 className="text-2xl font-bold text-braidot-negro">
            {propiedad ? 'Editar Propiedad' : 'Nueva Propiedad'}
          </h2>
          <button onClick={onClose} className="text-braidot-neutral-500 hover:text-braidot-negro transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
          {/* Información Básica */}
          <div className="bg-braidot-neutral-50 p-4 rounded-lg border border-braidot-neutral-200">
            <h3 className="font-semibold text-braidot-negro mb-4">Información Básica</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-braidot-negro mb-2">Título *</label>
                <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} required
                  className="w-full px-3 py-2 border border-braidot-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-braidot-primary-bordo focus:border-braidot-primary-bordo"
                  placeholder="Ej: Casa moderna en el centro" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-braidot-negro mb-2">Descripción</label>
                <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} rows="3"
                  className="w-full px-3 py-2 border border-braidot-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-braidot-primary-bordo focus:border-braidot-primary-bordo"
                  placeholder="Describe la propiedad..." />
              </div>

              <div>
                <label className="block text-sm font-medium text-braidot-negro mb-2">Operación *</label>
                <select name="operation" value={formData.operation} onChange={handleChange} required
                  className="w-full px-3 py-2 border border-braidot-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-braidot-primary-bordo focus:border-braidot-primary-bordo">
                  <option value="Venta">Venta</option>
                  <option value="Alquiler">Alquiler</option>
                  <option value="Temporaria">Temporaria</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-braidot-negro mb-2">Tipo de Propiedad *</label>
                <select name="tipo" value={formData.tipo} onChange={handleChange} required
                  className="w-full px-3 py-2 border border-braidot-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-braidot-primary-bordo focus:border-braidot-primary-bordo">
                  {tiposPropiedad.map(tipo => <option key={tipo} value={tipo}>{tipo}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-braidot-negro mb-2">Precio *</label>
                <input type="number" name="precio" value={formData.precio} onChange={handleChange} required step="0.01"
                  className="w-full px-3 py-2 border border-braidot-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-braidot-primary-bordo focus:border-braidot-primary-bordo"
                  placeholder="120000" />
              </div>

              {/* Horarios solo para Temporaria */}
              {formData.operation === 'Temporaria' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-braidot-negro mb-2">Hora Check-in</label>
                    <input type="time" name="checkin_hora" value={formData.checkin_hora} onChange={handleChange}
                      className="w-full px-3 py-2 border border-braidot-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-braidot-primary-bordo focus:border-braidot-primary-bordo" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-braidot-negro mb-2">Hora Check-out</label>
                    <input type="time" name="checkout_hora" value={formData.checkout_hora} onChange={handleChange}
                      className="w-full px-3 py-2 border border-braidot-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-braidot-primary-bordo focus:border-braidot-primary-bordo" />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Ubicación */}
          <div className="bg-braidot-neutral-50 p-4 rounded-lg border border-braidot-neutral-200">
            <h3 className="font-semibold text-braidot-negro mb-4">Ubicación</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-braidot-negro mb-2">Localidad *</label>
                <input type="text" name="localidad" value={formData.localidad} onChange={handleChange} required
                  className="w-full px-3 py-2 border border-braidot-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-braidot-primary-bordo focus:border-braidot-primary-bordo"
                  placeholder="Ej: Vera" />
              </div>

              <div>
                <label className="block text-sm font-medium text-braidot-negro mb-2">Provincia *</label>
                <input type="text" name="provincia" value={formData.provincia} onChange={handleChange} required
                  className="w-full px-3 py-2 border border-braidot-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-braidot-primary-bordo focus:border-braidot-primary-bordo"
                  placeholder="Ej: Santa Fe" />
              </div>

              <div>
                <label className="block text-sm font-medium text-braidot-negro mb-2">Dirección</label>
                <input type="text" name="direccion" value={formData.direccion} onChange={handleChange}
                  className="w-full px-3 py-2 border border-braidot-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-braidot-primary-bordo focus:border-braidot-primary-bordo"
                  placeholder="Ej: Av. San Martín 1234 (opcional)" />
              </div>

              <div>
                <label className="block text-sm font-medium text-braidot-negro mb-2">Barrio</label>
                <input type="text" name="barrio" value={formData.barrio} onChange={handleChange}
                  className="w-full px-3 py-2 border border-braidot-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-braidot-primary-bordo focus:border-braidot-primary-bordo"
                  placeholder="Barrio específico (opcional)" />
              </div>
            </div>
          </div>

          {/* Características */}
          <div className="bg-braidot-neutral-50 p-4 rounded-lg border border-braidot-neutral-200">
            <h3 className="font-semibold text-braidot-negro mb-4">Características</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-braidot-negro mb-2">Ambientes</label>
                <input type="number" name="ambientes" value={formData.ambientes} onChange={handleChange} min="0"
                  className="w-full px-3 py-2 border border-braidot-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-braidot-primary-bordo focus:border-braidot-primary-bordo" />
              </div>

              <div>
                <label className="block text-sm font-medium text-braidot-negro mb-2">Baños</label>
                <input type="number" name="banos" value={formData.banos} onChange={handleChange} min="0"
                  className="w-full px-3 py-2 border border-braidot-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-braidot-primary-bordo focus:border-braidot-primary-bordo" />
              </div>

              <div>
                <label className="block text-sm font-medium text-braidot-negro mb-2">Cocheras</label>
                <input type="number" name="cocheras" value={formData.cocheras} onChange={handleChange} min="0"
                  className="w-full px-3 py-2 border border-braidot-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-braidot-primary-bordo focus:border-braidot-primary-bordo" />
              </div>

              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="tiene_patio" checked={formData.tiene_patio} onChange={handleChange}
                    className="w-4 h-4 text-braidot-primary-bordo focus:ring-braidot-primary-bordo border-braidot-neutral-300 rounded" />
                  <span className="text-sm font-medium text-braidot-negro">Tiene Patio</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-braidot-negro mb-2">Metros Cuadrados</label>
                <input type="number" name="metros_cuadrados" value={formData.metros_cuadrados} onChange={handleChange} step="0.01"
                  className="w-full px-3 py-2 border border-braidot-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-braidot-primary-bordo focus:border-braidot-primary-bordo"
                  placeholder="150.50" />
              </div>

              <div>
                <label className="block text-sm font-medium text-braidot-negro mb-2">Metros Terreno</label>
                <input type="number" name="metros_terreno" value={formData.metros_terreno} onChange={handleChange} step="0.01"
                  className="w-full px-3 py-2 border border-braidot-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-braidot-primary-bordo focus:border-braidot-primary-bordo"
                  placeholder="200.00" />
              </div>
            </div>
          </div>

          {/* Servicios */}
          <div className="bg-braidot-neutral-50 p-4 rounded-lg border border-braidot-neutral-200">
            <h3 className="font-semibold text-braidot-negro mb-4">Servicios</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {serviciosDisponibles.map(servicio => (
                <label key={servicio} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.servicios.includes(servicio)} onChange={() => handleServiciosChange(servicio)}
                    className="w-4 h-4 text-braidot-primary-bordo focus:ring-braidot-primary-bordo border-braidot-neutral-300 rounded" />
                  <span className="text-sm text-braidot-negro">{servicio}</span>
                </label>
              ))}
            </div>
            <p className="text-xs text-braidot-neutral-600 mt-4 italic">
              💡 Para más información sobre servicios, los clientes pueden contactarse por WhatsApp
            </p>
          </div>

          {/* Imágenes */}
          <div className="bg-braidot-neutral-50 p-4 rounded-lg border border-braidot-neutral-200">
            <h3 className="font-semibold text-braidot-negro mb-4">Imágenes *</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-braidot-negro mb-2">Subir Imágenes desde Computadora (Recomendado)</label>
              <input type="file" accept="image/*" multiple onChange={handleFileChange}
                className="w-full px-3 py-2 border border-braidot-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-braidot-primary-bordo focus:border-braidot-primary-bordo file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-braidot-primary-bordo file:text-white hover:file:bg-braidot-primary-bordo-light file:cursor-pointer" />
              <p className="text-xs text-braidot-neutral-600 mt-1">Máximo 5MB por imagen. Puedes seleccionar múltiples archivos.</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-braidot-negro mb-2">O pegar URLs de imágenes (Opcional)</label>
              <textarea value={urlsImagenes} onChange={(e) => setUrlsImagenes(e.target.value)} rows="3"
                className="w-full px-3 py-2 border border-braidot-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-braidot-primary-bordo focus:border-braidot-primary-bordo font-mono text-sm"
                placeholder="Una URL por línea:&#10;https://ejemplo.com/imagen1.jpg&#10;https://ejemplo.com/imagen2.jpg" />
            </div>

            {previsualizaciones.length > 0 && (
              <div>
                <p className="text-sm font-medium text-braidot-negro mb-3">Imágenes ({previsualizaciones.length})</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {previsualizaciones.map((url, index) => (
                    <div key={index} className="relative group">
                      <img src={url} alt={`Previsualización ${index + 1}`} className="w-full h-24 object-cover rounded-md border border-braidot-neutral-300" />
                      <button type="button" onClick={() => eliminarImagen(index)}
                        className="absolute top-1 right-1 bg-braidot-negro/80 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Estado */}
          <div className="bg-braidot-neutral-50 p-4 rounded-lg border border-braidot-neutral-200">
            <h3 className="font-semibold text-braidot-negro mb-4">Estado</h3>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="activa" checked={formData.activa} onChange={handleChange}
                  className="w-4 h-4 text-braidot-primary-bordo focus:ring-braidot-primary-bordo border-braidot-neutral-300 rounded" />
                <span className="text-sm font-medium text-braidot-negro">Activa (visible en web)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="destacada" checked={formData.destacada} onChange={handleChange}
                  className="w-4 h-4 text-braidot-primary-bordo focus:ring-braidot-primary-bordo border-braidot-neutral-300 rounded" />
                <span className="text-sm font-medium text-braidot-negro">Destacada</span>
              </label>
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4 border-t border-braidot-neutral-200">
            <button type="submit" disabled={loading || uploadingImages}
              className="flex-1 bg-braidot-primary-bordo hover:bg-braidot-primary-bordo-light text-white font-semibold py-2.5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Guardando...' : uploadingImages ? 'Subiendo imágenes...' : (propiedad ? 'Actualizar' : 'Crear Propiedad')}
            </button>
            <button type="button" onClick={onClose} disabled={loading || uploadingImages}
              className="px-6 py-2.5 border border-braidot-neutral-300 text-braidot-negro font-semibold rounded-md hover:bg-braidot-neutral-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioPropiedad;