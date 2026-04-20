// ============================================
//  FavoritesStrip.jsx
//  Scrollable strip of saved favorite cities
//  with live temperature and quick-switch
// ============================================
function FavoritesStrip({ favorites, favData, query, unit, onSelect, onAdd, onRemove }) {
  return (
    <div className="fav-strip">
      {favorites.map(city => {
        const fd   = favData[city];
        const temp = fd ? Math.round(parseFloat(fd.current_condition[0].temp_C)) : null;
        const icon = fd ? wIcon(parseInt(fd.current_condition[0].weatherCode)) : '🌡️';

        return (
          <div key={city} className="fav-chip" onClick={() => onSelect(city)}>
            <span>{icon}</span>
            <span>{city}</span>
            {temp !== null && (
              <span className="fav-temp">{dispTempNum(temp, unit)}°</span>
            )}
            <span
              className="fav-remove"
              onClick={e => onRemove(city, e)}
            >✕</span>
          </div>
        );
      })}

      {/* Add current city button */}
      <div className="fav-add-btn" onClick={onAdd}>
        <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M12 5v14M5 12h14"/>
        </svg>
        Save {query.split(',')[0]}
      </div>
    </div>
  );
}
