import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { createStorageSlot } from '@docusaurus/theme-common'

export const FavoritePagesContext = createContext();

const FAVORITE_PAGES_KEY = "clip.videoPages"

function useFavoritePagesContextValue() {
  const [favoritePages, setFavorites] = useState([]);

  useEffect(() => {
    try {
      const localStorageFavoritePages = createStorageSlot(FAVORITE_PAGES_KEY).get() || '[]';
      setFavorites(JSON.parse(localStorageFavoritePages));
      
    } catch (err) {
      console.error(err);
    }
  }, []);

  return {
    favoritePages,
    setFavoritePages: (newFavoritePages) => {
      setFavorites((oldFavoritePages) => [...newFavoritePages]);
      createStorageSlot(FAVORITE_PAGES_KEY).set(JSON.stringify([...newFavoritePages]));
    },
  };
}

export function FavoritePagesProvider({ children }) {
  const { favoritePages, setFavoritePages } = useFavoritePagesContextValue();
  const contextValue = useMemo(
    () => ({
      favoritePages,
      setFavoritePages,
    }),
    [favoritePages, setFavoritePages],
  );
  return (
    <FavoritePagesContext.Provider value={contextValue}>
      {children}
    </FavoritePagesContext.Provider>
  );
}

export function useFavoritePages() {
  const context = useContext(FavoritePagesContext);
  if (context == null) {
    throw new Error(
      '"useFavoritePagesContext" is used outside of "Layout" component.',
    );
  }
  return context;
}
