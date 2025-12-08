import { useCompare } from '../contexts/CompareContext';
import { useNavigate } from 'react-router-dom';

const CompareBar = () => {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const navigate = useNavigate();

  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-braidot-primary-bordo text-white shadow-2xl z-50 animate-slide-up">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Texto e info */}
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-2 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-lg">Comparar propiedades</p>
              <p className="text-sm text-white/80">
                {compareList.length} {compareList.length === 1 ? 'propiedad seleccionada' : 'propiedades seleccionadas'} 
                {compareList.length < 3 && ` (puedes agregar ${3 - compareList.length} más)`}
              </p>
            </div>
          </div>

          {/* Propiedades seleccionadas */}
          <div className="flex items-center gap-3">
            {compareList.map(property => (
              <div 
                key={property.id}
                className="relative bg-white/10 backdrop-blur-sm rounded-lg p-2 pr-8 flex items-center gap-2 border border-white/20"
              >
                <img 
                  src={property.images[0]} 
                  alt={property.title}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="max-w-[150px]">
                  <p className="text-sm font-semibold truncate">{property.title}</p>
                  <p className="text-xs text-white/70">${property.price.toLocaleString('es-AR')}</p>
                </div>
                <button
                  onClick={() => removeFromCompare(property.id)}
                  className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs transition-colors"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Botones de acción */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/comparar')}
              disabled={compareList.length < 2}
              className="bg-white text-braidot-primary-bordo px-6 py-3 rounded-lg font-bold hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              Comparar ({compareList.length})
            </button>
            <button
              onClick={clearCompare}
              className="bg-white/20 hover:bg-white/30 px-4 py-3 rounded-lg font-semibold transition-colors"
            >
              Limpiar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareBar;
