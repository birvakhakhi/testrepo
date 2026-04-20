// ============================================
//  weatherHelpers.js
//  Functions related to weather condition codes:
//  emoji icons, CSS class names, descriptions,
//  weather tips, and AQI estimation
// ============================================

const WEATHER_EMOJIS = {
  STORM:  "⛈️",
  SNOW:   "❄️",
  RAIN:   "🌧️",
  FOG:    "🌫️",
  SHOWER: "🌦️",
  CLEAR:  "☀️",
  PARTLY: "⛅",
  CLOUD:  "☁️",
  MISC:   "🌡️",
};

/**
 * Maps a wttr.in weather code to an internal category string
 * @param {number|string} code - wttr.in weather code
 * @returns {string} - category name
 */
function getWeatherCategory(code) {
  code = parseInt(code);
  if ([395, 392, 389, 386].includes(code))                                        return "STORM";
  if ([374,371,368,365,362,338,335,332,329,326,323,320,317,314,311].includes(code)) return "SNOW";
  if ([308,305,302,299,296,293,266,263,356,353,359].includes(code))               return "RAIN";
  if ([248, 260, 143].includes(code))                                              return "FOG";
  if ([185, 182, 179, 176].includes(code))                                         return "SHOWER";
  if (code === 113)  return "CLEAR";
  if (code === 116)  return "PARTLY";
  if (code === 119 || code === 122) return "CLOUD";
  return "MISC";
}

/**
 * Returns an emoji for a given weather code
 * @param {number|string} code
 * @returns {string} emoji
 */
function wIcon(code) {
  return WEATHER_EMOJIS[getWeatherCategory(code)] || "🌡️";
}

/**
 * Returns a CSS class name for the hero card background gradient
 * @param {number|string} code
 * @returns {string} CSS class
 */
function wClass(code) {
  code = parseInt(code);
  if ([395, 392, 389, 386].includes(code))                                         return "storm";
  if ([338,335,332,329,326,323,320,317,314,311,374,371,368,365,362].includes(code)) return "snow";
  if ([308,305,302,299,296,293,266,263,356,353,359,185,182,179,176].includes(code)) return "rain";
  if ([248, 260, 143].includes(code))                                               return "fog";
  if (code === 113)                                                                  return "clear";
  return "cloudy";
}

/**
 * Returns a human-readable description for a weather code
 * Falls back to a provided string if available
 * @param {number|string} code
 * @param {string} fallback - description from API
 * @returns {string}
 */
function wDesc(code, fallback) {
  if (fallback) return fallback;
  const descriptions = {
    113: "Clear",         116: "Partly Cloudy",   119: "Cloudy",
    122: "Overcast",      143: "Mist",             176: "Light Rain",
    185: "Sleet",         227: "Blowing Snow",     248: "Fog",
    260: "Freezing Fog",  263: "Drizzle",          266: "Drizzle",
    293: "Light Rain",    296: "Light Rain",       299: "Moderate Rain",
    302: "Moderate Rain", 305: "Heavy Rain",       308: "Heavy Rain",
    323: "Light Snow",    326: "Light Snow",       329: "Moderate Snow",
    332: "Moderate Snow", 338: "Heavy Snow",       353: "Light Rain Shower",
    356: "Heavy Rain",    362: "Light Sleet",      368: "Light Snow",
    386: "Thundery Rain", 389: "Heavy Thundery Rain", 395: "Heavy Thundery Snow",
  };
  return descriptions[parseInt(code)] || "Unknown";
}

/**
 * Returns a smart weather tip based on current conditions
 * @param {number} code - weather code
 * @param {number} temp - temperature in Celsius
 * @param {number} humidity - humidity percentage
 * @returns {{ icon: string, title: string, text: string }}
 */
function weatherTip(code, temp, humidity) {
  code = parseInt(code);
  if ([386, 389, 395, 392].includes(code))
    return { icon: "⛈️", title: "Storm Warning",    text: "Thunderstorms expected. Stay indoors, avoid open areas and keep away from windows." };
  if ([308, 305, 302, 299].includes(code))
    return { icon: "☂️", title: "Heavy Rain Alert", text: "Carry a sturdy umbrella and wear waterproof shoes. Be cautious of flooded roads." };
  if ([293, 296, 266, 263, 176].includes(code))
    return { icon: "🌂", title: "Light Rain",        text: "A light jacket and umbrella recommended. Roads may be slippery — drive carefully." };
  if ([323, 326, 329, 332, 335, 338].includes(code))
    return { icon: "❄️", title: "Snow Day",          text: "Bundle up with warm layers. Roads may be icy — allow extra travel time." };
  if (code === 113 && temp >= 35)
    return { icon: "🌡️", title: "Heat Alert",        text: "Stay hydrated, seek shade and avoid strenuous outdoor activities between 11am–4pm." };
  if (code === 113 && temp <= 10)
    return { icon: "🧤", title: "Cold & Clear",      text: "It's cold but sunny! Wear warm layers and enjoy the crisp weather." };
  if (humidity >= 80)
    return { icon: "💧", title: "High Humidity",     text: "High humidity today. Light, breathable clothing is recommended. Stay hydrated." };
  if (code === 113)
    return { icon: "😎", title: "Great Weather!",    text: "Perfect weather to head outdoors. Don't forget sunscreen if you'll be out long." };
  return   { icon: "🌤️", title: "Mixed Conditions",  text: "Partly cloudy skies. A light layer may come in handy for later in the day." };
}

/**
 * Estimates AQI value from weather data
 * (wttr.in does not provide real AQI)
 * @param {number} humidity
 * @param {number|string} code
 * @returns {number} estimated AQI
 */
function aqiFromHumidity(humidity, code) {
  let base = Math.round(20 + humidity * 0.4);
  if ([305, 308, 356, 359].includes(parseInt(code))) base = Math.max(15, base - 20);
  if ([248, 260, 143].includes(parseInt(code)))       base += 30;
  return Math.min(base, 200);
}

/**
 * Returns AQI label, color, and position percentage for the bar
 * @param {number} value - AQI number
 * @returns {{ label: string, color: string, pct: number }}
 */
function aqiLabel(value) {
  if (value <= 50)  return { label: "Good",                     color: "#22c55e", pct: value / 300 * 100 };
  if (value <= 100) return { label: "Moderate",                 color: "#facc15", pct: 25 + value / 400 * 100 };
  if (value <= 150) return { label: "Unhealthy for Sensitive",  color: "#f97316", pct: 50 + value / 600 * 100 };
  return               { label: "Unhealthy",                color: "#ef4444", pct: 80 };
}

/**
 * Converts wind degree to 16-point compass direction string
 * @param {number} deg
 * @returns {string}
 */
function windDir(deg) {
  const dirs = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];
  return dirs[Math.round(deg / 22.5) % 16] || 'N';
}

/**
 * Calculates daylight arc percentages for the sun position bar
 * @param {string} sunrise - e.g. "6:14 AM"
 * @param {string} sunset  - e.g. "7:02 PM"
 * @returns {{ pctStart: number, pctLen: number, pctNow: number }}
 */
function daylight(sunrise, sunset) {
  function toMin(s) {
    if (!s) return 0;
    const m = s.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!m) return 0;
    let h = parseInt(m[1]);
    if (m[3].toUpperCase() === 'PM' && h !== 12) h += 12;
    if (m[3].toUpperCase() === 'AM' && h === 12) h = 0;
    return h * 60 + parseInt(m[2]);
  }
  const now   = new Date().getHours() * 60 + new Date().getMinutes();
  const s     = toMin(sunrise);
  const e     = toMin(sunset);
  const total = e - s;
  const pctStart = (s / (24 * 60)) * 100;
  const pctLen   = (total / (24 * 60)) * 100;
  const pctNow   = Math.max(0, Math.min(100, (now - s) / total * 100));
  return { pctStart, pctLen, pctNow };
}

/**
 * Shows a toast notification at the bottom of the screen
 * @param {string} message
 */
function showToast(message) {
  const t = document.getElementById('toast');
  t.textContent = message;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}
