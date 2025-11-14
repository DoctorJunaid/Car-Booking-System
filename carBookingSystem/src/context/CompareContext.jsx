import { createContext, useContext, useState, useEffect } from 'react';

const CompareContext = createContext();

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within CompareProvider');
  }
  return context;
};

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState(() => {
    const saved = localStorage.getItem('compareList');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('compareList', JSON.stringify(compareList));
  }, [compareList]);

  const addToCompare = (car) => {
    if (compareList.length >= 3) {
      return { success: false, message: 'You can only compare up to 3 cars' };
    }
    if (compareList.some(c => c.id === car.id)) {
      return { success: false, message: 'Car already in comparison' };
    }
    setCompareList([...compareList, car]);
    return { success: true, message: 'Car added to comparison' };
  };

  const removeFromCompare = (carId) => {
    setCompareList(compareList.filter(c => c.id !== carId));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const isInCompare = (carId) => {
    return compareList.some(c => c.id === carId);
  };

  return (
    <CompareContext.Provider
      value={{
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};
