// ============================================
//  App.jsx
//  Root React component — wires together all
//  hooks and components, manages tab state
//  and derives display data from raw API data
// ============================================

function App() {
  const { useState, useEffect } = React;

  // ── State ──
  const [input,   setInput]   = useState("Mumbai");
  const [unit,    setUnit]    = useState('C');
  const [dark,    setDark]    = useState(false);
  const [tab,     setTab]     = useState('today');
  const [activeH, setActiveH] = useState(0);

  // ── Custom Hooks ──
  const { wx, loading, error, query, setQuery } = useWeather("Mumbai");
  const { favorites, favData, addFav, removeFav } = useFavorites(['Mumbai', 'London', 'New York']);

  // ── Dark mode side effect ──
  useEffect(() => {
    document.body.classList.toggle('dark', dark);
  }, [dark]);

  // ── Handlers ──
  function handleSearch(city) {
    const t = (city || input).trim();
    if (!t) return;
    setInput(t);
    setQuery(t);
  }

  function handleLocation() {
    if (!navigator.geolocation) return showToast("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(
      pos => {
        const coords = `${pos.coords.latitude.toFixed(2)},${pos.coords.longitude.toFixed(2)}`;
        setInput(coords);
        setQuery(coords);
      },
      () => showToast("Location access denied")
    );
  }

  // ── Derive display-ready data from raw API response ──
  let hero = null, hourly = [], daily = [];

  if (wx) {
    const cur      = wx.current_condition[0];
    const todayFc  = wx.weather[0];
    const code     = parseInt(cur.weatherCode);
    const nowH     = new Date().getHours();

    hero = {
      city:       query.split(',')[0].replace(/\d/g, '').trim() || query,
      date:       formatTodayDate(),
      temp:       Math.round(parseFloat(cur.temp_C)),
      feels:      Math.round(parseFloat(cur.FeelsLikeC)),
      humidity:   parseInt(cur.humidity),
      wind:       parseInt(cur.windspeedKmph),
      windDir:    parseInt(cur.winddirDegree || 0),
      windDirStr: cur.winddir16Point || 'N',
      visibility: parseInt(cur.visibility),
      pressure:   parseInt(cur.pressure),
      cloudCover: parseInt(cur.cloudcover || 50),
      uvi:        parseInt(cur.uvIndex || 5),
      code,
      desc:       wDesc(code, cur.weatherDesc?.[0]?.value),
      cls:        wClass(code),
      sunrise:    todayFc.astronomy?.[0]?.sunrise || "6:00 AM",
      sunset:     todayFc.astronomy?.[0]?.sunset  || "6:30 PM",
      highToday:  Math.round(parseFloat(todayFc.maxtempC)),
      lowToday:   Math.round(parseFloat(todayFc.mintempC)),
    };

    // Hourly slots (8 per day, every 3 hours)
    const allSlots = (todayFc.hourly || []).map(h => ({
      hNum: parseInt(h.time) / 100,
      temp: Math.round(parseFloat(h.tempC)),
      code: parseInt(h.weatherCode),
      rain: parseInt(h.chanceofrain || 0),
      desc: h.weatherDesc?.[0]?.value || "",
    }));

    // Find the slot nearest to current hour
    const nearestIdx = allSlots.reduce((best, h, i) =>
      Math.abs(h.hNum - nowH) < Math.abs(allSlots[best].hNum - nowH) ? i : best, 0
    );

    hourly = allSlots.slice(nearestIdx, nearestIdx + 9).map((h, i) => ({
      label: formatHourLabel(h.hNum * 100, i === 0),
      temp:  h.temp,
      icon:  wIcon(h.code),
      rain:  h.rain,
    }));

    // 3-day forecast
    daily = wx.weather.slice(0, 3).map((d, i) => {
      const mid  = d.hourly?.[4] || d.hourly?.[0] || {};
      const dc   = parseInt(mid.weatherCode || 113);
      return {
        name:    i === 0 ? 'Today' : getDayName(d.date),
        hi:      Math.round(parseFloat(d.maxtempC)),
        lo:      Math.round(parseFloat(d.mintempC)),
        icon:    wIcon(dc),
        desc:    wDesc(dc, mid.weatherDesc?.[0]?.value),
        rainPct: parseInt(mid.chanceofrain || 0),
      };
    });
  }

  // ── Render ──
  return (
    <>
      {/* Navigation Bar */}
      <Navbar
        input={input}
        setInput={setInput}
        onSearch={handleSearch}
        unit={unit}
        setUnit={setUnit}
        dark={dark}
        setDark={setDark}
        onLocation={handleLocation}
        onAddFav={() => addFav(query)}
        query={query}
      />

      <main>
        {/* Favorites Strip */}
        {favorites.length > 0 && (
          <FavoritesStrip
            favorites={favorites}
            favData={favData}
            query={query}
            unit={unit}
            onSelect={city => { setInput(city); setQuery(city); }}
            onAdd={() => addFav(query)}
            onRemove={removeFav}
          />
        )}

        {/* Tab Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
          <div className="tabs">
            {['today', 'forecast', 'details', 'compare'].map(t => (
              <button
                key={t}
                className={`tab${tab === t ? ' active' : ''}`}
                onClick={() => setTab(t)}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="state">
            <div className="spinner"/>
            <p>Fetching weather for <strong>{query}</strong>…</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="state">
            <div style={{ fontSize: '3rem' }}>⚠️</div>
            <p style={{ color: '#ef4444', fontWeight: 600 }}>{error}</p>
            <p>Please try a different city name.</p>
          </div>
        )}

        {/* ══════════════════════════════
            TODAY TAB
        ══════════════════════════════ */}
        {!loading && !error && hero && tab === 'today' && (
          <>
            <div className="section fu">
              <HeroCard hero={hero} unit={unit}/>
            </div>

            <HourlyForecast
              hourly={hourly}
              activeH={activeH}
              setActiveH={setActiveH}
              unit={unit}
            />

            <RainChart hourly={hourly}/>

            <div className="grid-2 fu fu3" style={{ marginBottom: 20 }}>
              <SunUVCard hero={hero}/>
              <WeatherTip hero={hero}/>
            </div>

            <AQICard hero={hero}/>
          </>
        )}

        {/* ══════════════════════════════
            FORECAST TAB
        ══════════════════════════════ */}
        {!loading && !error && hero && tab === 'forecast' && (
          <>
            <div className="section fu">
              <DailyForecast daily={daily} unit={unit}/>
            </div>

            {/* Per-day hourly breakdown */}
            {wx.weather.slice(0, 3).map((d, di) => {
              const dayLabel = di === 0 ? 'Today' : di === 1 ? 'Tomorrow' : getDayName(d.date);
              return (
                <div key={di} className="section fu fu1">
                  <div className="sec-title">{dayLabel} — Hourly Breakdown</div>
                  <div className="hourly-scroll">
                    {(d.hourly || []).map((h, i) => {
                      const hNum = parseInt(h.time) / 100;
                      const t    = Math.round(parseFloat(h.tempC));
                      const rain = parseInt(h.chanceofrain || 0);
                      return (
                        <div key={i} className="hour-card">
                          <span className="h-time">{formatHourLabel(h.time)}</span>
                          <span className="h-icon">{wIcon(parseInt(h.weatherCode))}</span>
                          <span className="h-temp">{dispTempNum(t, unit)}°</span>
                          {rain > 0 && <span className="h-rain">💧{rain}%</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </>
        )}

        {/* ══════════════════════════════
            DETAILS TAB
        ══════════════════════════════ */}
        {!loading && !error && hero && tab === 'details' && (
          <>
            <div className="section fu">
              <AirDetails hero={hero}/>
            </div>

            <div className="grid-2 fu fu1" style={{ marginBottom: 20 }}>
              <WindCompass hero={hero}/>

              {/* Feels Like Card */}
              <div className="card feels-card">
                <div className="sec-title">Feels Like</div>
                <div className="feels-big">{dispTempNum(hero.feels, unit)}°</div>
                <div className="feels-desc">{feelsDesc(hero.feels, hero.temp)}</div>
                <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <div className="air-lbl">Actual Temp</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 600 }}>{dispTempNum(hero.temp, unit)}°</div>
                  </div>
                  <div>
                    <div className="air-lbl">Difference</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 600, color: hero.feels > hero.temp ? '#ef4444' : '#3b82f6' }}>
                      {hero.feels > hero.temp ? '+' : ''}{hero.feels - hero.temp}°
                    </div>
                  </div>
                  <div>
                    <div className="air-lbl">Humidity</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 600 }}>{hero.humidity}%</div>
                  </div>
                  <div>
                    <div className="air-lbl">Wind Speed</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 600 }}>{hero.wind} km/h</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Map */}
            <div className="card map-card fu fu2">
              <div className="map-inner">
                <div className="map-rings">
                  <div className="ring"/>
                  <div className="ring"/>
                  <div className="ring"/>
                </div>
                <div className="map-pin">📍</div>
                <div className="map-label">📍 {hero.city}</div>
              </div>
            </div>
          </>
        )}

        {/* ══════════════════════════════
            COMPARE TAB
        ══════════════════════════════ */}
        {!loading && !error && hero && tab === 'compare' && (
          <CompareTab hero={hero} query={query} unit={unit}/>
        )}
      </main>
    </>
  );
}

// ── Mount React app into DOM ──
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
