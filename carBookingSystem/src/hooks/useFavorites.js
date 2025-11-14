import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'autochoice_favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }
  }, []);

  const saveFavorites = (newFavorites) => {
    setFavorites(newFavorites);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
  };

  const toggleFavorite = (carId) => {
    const newFavorites = favorites.includes(carId)
      ? favorites.filter(id => id !== carId)
      : [...favorites, carId];
    saveFavorites(newFavorites);
  };

  const isFavorite = (carId) => favorites.includes(carId);

  const clearFavorites = () => saveFavorites([]);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    clearFavorites
  };
};
