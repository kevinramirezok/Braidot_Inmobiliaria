import { createContext, useContext, useState, useEffect } from 'react';

const CompareContext = createContext();

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare debe usarse dentro de CompareProvider');
  }
  return context;
};

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState([]);

  // Cargar desde localStorage al iniciar
  useEffect(() => {
    const saved = localStorage.getItem('braidot-compare');
    if (saved) {
      try {
        setCompareList(JSON.parse(saved));
      } catch (e) {
        console.error('Error cargando comparación:', e);
      }
    }
  }, []);

  // Guardar en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('braidot-compare', JSON.stringify(compareList));
  }, [compareList]);

  const addToCompare = (property) => {
    if (compareList.length >= 3) {
      alert('Solo puedes comparar hasta 3 propiedades');
      return false;
    }
    if (compareList.find(p => p.id === property.id)) {
      alert('Esta propiedad ya está en la comparación');
      return false;
    }
    setCompareList([...compareList, property]);
    return true;
  };

  const removeFromCompare = (propertyId) => {
    setCompareList(compareList.filter(p => p.id !== propertyId));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const isInCompare = (propertyId) => {
    return compareList.some(p => p.id === propertyId);
  };

  return (
    <CompareContext.Provider value={{
      compareList,
      addToCompare,
      removeFromCompare,
      clearCompare,
      isInCompare
    }}>
      {children}
    </CompareContext.Provider>
  );
};