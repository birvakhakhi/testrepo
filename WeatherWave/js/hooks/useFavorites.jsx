// ============================================
//  useFavorites.jsx
//  Custom React Hook — manages the favorites
//  strip: add, remove, and fetch live temps
// ============================================

/**
 * useFavorites — Custom React Hook
 * Manages a list of favorite cities and fetches
 * live temperature data for each one
 *
 * @param {string[]} initial - default list of cities
 * @returns {{
 *   favorites: string[],
 *   favData: Object,
 *   addFav: Function,
 *   removeFav: Function,
 * }}
 */
function useFavorites(initial = ['Mumbai', 'London', 'New York']) {
  const { useState, useEffect } = React;

  const [favorites, setFavorites] = useState(initial);
  const [favData, setFavData]     = useState({});

  // Fetch weather for any new favorites added
  useEffect(() => {
    favorites.forEach(async (city) => {
      if (favData[city]) return; // skip if already loaded
      try {
        const res  = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
        const data = await res.json();
        setFavData(prev => ({ ...prev, [city]: data }));
      } catch (e) {
        // silently fail for individual favorites
      }
    });
  }, [favorites]);

  /**
   * Add the currently viewed city to favorites
   * @param {string} city
   */
  function addFav(city) {
    if (favorites.includes(city)) {
      showToast(`${city} is already in favorites`);
      return;
    }
    setFavorites(prev => [...prev, city]);
    showToast(`Added ${city} to favorites ⭐`);
  }

  /**
   * Remove a city from favorites
   * @param {string} city
   * @param {Event} e - click event (to stop propagation)
   */
  function removeFav(city, e) {
    e.stopPropagation();
    setFavorites(prev => prev.filter(c => c !== city));
    showToast(`Removed ${city} from favorites`);
  }

  return { favorites, favData, addFav, removeFav };
}
