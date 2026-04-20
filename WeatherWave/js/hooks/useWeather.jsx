// ============================================
//  useWeather.jsx
//  Custom React Hook — handles all weather
//  API fetching logic for a single city
// ============================================

/**
 * Fetches weather data for a city from wttr.in
 * @param {string} city
 * @returns {Promise<Object>} raw API JSON response
 */
async function fetchCity(city) {
  const response = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
  if (!response.ok) throw new Error(`"${city}" not found`);
  const data = await response.json();
  if (!data.current_condition || !data.weather) throw new Error(`No data for "${city}"`);
  return data;
}

/**
 * useWeather — Custom React Hook
 * Manages fetching, loading, and error state for weather data
 *
 * @param {string} initialCity - city to load on mount
 * @returns {{
 *   wx: Object|null,        — raw API data
 *   loading: boolean,
 *   error: string|null,
 *   query: string,          — current active city
 *   setQuery: Function,     — triggers a new fetch
 * }}
 */
function useWeather(initialCity = "Mumbai") {
  const { useState, useEffect, useCallback } = React;

  const [query, setQuery]     = useState(initialCity);
  const [wx, setWx]           = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const doFetch = useCallback(async (city) => {
    setLoading(true);
    setError(null);
    setWx(null);
    try {
      const data = await fetchCity(city);
      setWx(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-fetch whenever query changes
  useEffect(() => {
    doFetch(query);
  }, [query]);

  return { wx, loading, error, query, setQuery, refetch: () => doFetch(query) };
}
