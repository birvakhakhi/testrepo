// ============================================
//  Navbar.jsx
//  Top navigation bar component:
//  logo, search with autocomplete,
//  unit toggle, dark mode, location, favorites
// ============================================

const CITY_SUGGESTIONS = [
  'Mumbai','Delhi','Bangalore','Chennai','Kolkata',
  'Ahmedabad','Hyderabad','Pune','London','New York',
  'Tokyo','Paris','Dubai','Singapore','Sydney','Toronto',
];

function Navbar({ input, setInput, onSearch, unit, setUnit, dark, setDark, onLocation, onAddFav, query }) {
  const { useState, useRef } = React;
  const [suggests, setSuggests]   = useState([]);
  const [showSug, setShowSug]     = useState(false);

  function handleInput(value) {
    setInput(value);
    if (value.length > 1) {
      const filtered = CITY_SUGGESTIONS.filter(c =>
        c.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggests(filtered);
      setShowSug(filtered.length > 0);
    } else {
      setShowSug(false);
    }
  }

  function pickSuggestion(city) {
    setInput(city);
    onSearch(city);
    setShowSug(false);
  }

  return (
    <nav>
      {/* Logo */}
      <div className="logo">Weather<span>Wave</span></div>

      {/* Search */}
      <div className="nav-center">
        <div className="search-wrapper">
          <div className="sw">
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              value={input}
              onChange={e => handleInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && onSearch(input)}
              onBlur={() => setTimeout(() => setShowSug(false), 180)}
              onFocus={() => input.length > 1 && suggests.length > 0 && setShowSug(true)}
              placeholder="Search any city…"
            />
          </div>

          {/* Autocomplete dropdown */}
          {showSug && (
            <div className="autocomplete">
              {suggests.map(city => (
                <div key={city} className="autocomplete-item" onMouseDown={() => pickSuggestion(city)}>
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  {city}
                </div>
              ))}
            </div>
          )}
        </div>
        <button className="btn" onClick={() => onSearch(input)}>Search</button>
      </div>

      {/* Action buttons */}
      <div className="nav-actions">

        {/* °C / °F Toggle */}
        <div className="unit-toggle">
          <button className={`unit-btn${unit === 'C' ? ' active' : ''}`} onClick={() => setUnit('C')}>°C</button>
          <button className={`unit-btn${unit === 'F' ? ' active' : ''}`} onClick={() => setUnit('F')}>°F</button>
        </div>

        {/* GPS Location */}
        <div className="icon-btn" title="Use my location" onClick={onLocation}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>
            <circle cx="12" cy="12" r="9" strokeDasharray="3 2"/>
          </svg>
        </div>

        {/* Dark Mode Toggle */}
        <div className="icon-btn" title="Toggle dark mode" onClick={() => setDark(d => !d)}>
          {dark
            ? <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            : <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
          }
        </div>

        {/* Add to Favorites */}
        <div className="icon-btn" title="Add to favorites" onClick={onAddFav}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </div>
      </div>
    </nav>
  );
}
