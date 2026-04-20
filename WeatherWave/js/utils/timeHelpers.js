// ============================================
//  timeHelpers.js
//  Date and time formatting helpers
// ============================================

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * Formats today's date as a long readable string
 * e.g. "Monday, 19 April 2026"
 * @returns {string}
 */
function formatTodayDate() {
  return new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Converts wttr.in hourly "time" field (e.g. "1500") to a label
 * @param {string|number} wttrTime - e.g. "300", "1500"
 * @param {boolean} isFirst - if true, returns "Now"
 * @returns {string} e.g. "3 PM"
 */
function formatHourLabel(wttrTime, isFirst = false) {
  if (isFirst) return 'Now';
  const h = parseInt(wttrTime) / 100;
  const ap = h >= 12 ? 'PM' : 'AM';
  return `${h % 12 || 12} ${ap}`;
}

/**
 * Returns the short day name for a given date string
 * e.g. "2026-04-20" → "Mon"
 * @param {string} dateStr
 * @returns {string}
 */
function getDayName(dateStr) {
  return DAYS[new Date(dateStr).getDay()];
}
