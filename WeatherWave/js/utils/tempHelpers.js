// ============================================
//  tempHelpers.js
//  Temperature conversion and display helpers
// ============================================

/**
 * Converts Celsius to Fahrenheit
 * @param {number} celsius
 * @returns {number}
 */
function toF(celsius) {
  return Math.round(celsius * 9 / 5 + 32);
}

/**
 * Returns temperature as a display number based on selected unit
 * @param {number} celsius
 * @param {string} unit - 'C' or 'F'
 * @returns {number}
 */
function dispTempNum(celsius, unit) {
  return unit === 'C' ? celsius : toF(celsius);
}

/**
 * Returns temperature as a full string with unit symbol
 * @param {number} celsius
 * @param {string} unit - 'C' or 'F'
 * @returns {string} e.g. "31°C" or "87°F"
 */
function dispTemp(celsius, unit) {
  return unit === 'C' ? `${celsius}°C` : `${toF(celsius)}°F`;
}

/**
 * Returns a description of why it feels hotter/colder than actual temp
 * @param {number} feels - feels like temp in Celsius
 * @param {number} actual - actual temp in Celsius
 * @returns {string}
 */
function feelsDesc(feels, actual) {
  const diff = feels - actual;
  if (diff > 3)  return "It feels significantly hotter than the actual temperature due to high humidity.";
  if (diff > 0)  return "It feels slightly warmer than the actual temperature.";
  if (diff < -4) return "Wind chill makes it feel much colder than the actual temperature.";
  if (diff < 0)  return "It feels slightly cooler than the actual temperature.";
  return "The temperature feels about the same as the actual reading.";
}

/**
 * Returns clothing advice based on temperature
 * @param {number} temp - temperature in Celsius
 * @returns {string}
 */
function clothingAdvice(temp) {
  if (temp >= 35) return "👕 Light, breathable clothing — linen or cotton. Sunglasses & sunscreen.";
  if (temp >= 25) return "👔 Comfortable summer wear. A light layer for evenings.";
  if (temp >= 15) return "🧥 Light jacket or cardigan. Layers work well.";
  if (temp >= 5)  return "🧤 Warm coat, gloves, and a scarf. Layer up!";
  return                 "🧣 Heavy winter gear — thermal layers, waterproof boots.";
}
