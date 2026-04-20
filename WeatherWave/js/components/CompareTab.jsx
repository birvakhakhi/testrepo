// ============================================
//  CompareTab.jsx
//  Side-by-side city weather comparison tab
// ============================================
function CompareTab({ hero, query, unit }) {
  const { useState, useEffect } = React;

  const [compareInput,   setCompareInput]   = useState("London");
  const [compareCity,    setCompareCity]    = useState("London");
  const [compareWx,      setCompareWx]      = useState(null);
  const [compareLoading, setCompareLoading] = useState(false);

  async function doCompare(city) {
    const target = city || compareInput.trim();
    if (!target) return;
    setCompareCity(target);
    setCompareLoading(true);
    setCompareWx(null);
    try {
      const res  = await fetch(`https://wttr.in/${encodeURIComponent(target)}?format=j1`);
      const data = await res.json();
      setCompareWx(data);
    } catch (e) {
      // silently fail
    } finally {
      setCompareLoading(false);
    }
  }

  // Load default compare city on mount
  useEffect(() => { doCompare("London"); }, []);

  const rows = compareWx ? (() => {
    const cc    = compareWx.current_condition[0];
    const cTemp = Math.round(parseFloat(cc.temp_C));
    return [
      { lbl: 'Temperature', a: dispTemp(hero.temp,   unit), b: dispTemp(cTemp, unit) },
      { lbl: 'Feels Like',  a: dispTemp(hero.feels,  unit), b: dispTemp(Math.round(parseFloat(cc.FeelsLikeC)), unit) },
      { lbl: 'Humidity',    a: `${hero.humidity}%`,         b: `${cc.humidity}%` },
      { lbl: 'Wind',        a: `${hero.wind} km/h`,         b: `${cc.windspeedKmph} km/h` },
      { lbl: 'Visibility',  a: `${hero.visibility} km`,     b: `${cc.visibility} km` },
      { lbl: 'Pressure',    a: `${hero.pressure} hPa`,      b: `${cc.pressure} hPa` },
    ];
  })() : [];

  return (
    <div className="section fu">
      <div className="card">
        <div className="sec-title">Compare Cities</div>

        {/* Input row */}
        <div className="compare-input-row">
          <input className="compare-input" value={query} readOnly placeholder="Primary city"/>
          <span style={{ display: 'flex', alignItems: 'center', color: 'var(--muted)', fontWeight: 700, fontSize: '1.2rem' }}>vs</span>
          <input
            className="compare-input"
            value={compareInput}
            onChange={e => setCompareInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && doCompare()}
            placeholder="Compare with…"
          />
          <button className="btn" onClick={() => doCompare()}>Compare</button>
        </div>

        {/* Loading */}
        {compareLoading && (
          <div style={{ textAlign: 'center', padding: 20, color: 'var(--muted)' }}>Loading…</div>
        )}

        {/* Results */}
        {!compareLoading && compareWx && (() => {
          const cc    = compareWx.current_condition[0];
          const cTemp = Math.round(parseFloat(cc.temp_C));
          const cCode = parseInt(cc.weatherCode);
          const diff  = hero.temp - cTemp;

          return (
            <>
              {/* Side-by-side city cards */}
              <div className="compare-grid">
                <div className="compare-city">
                  <div className="compare-name">{hero.city}</div>
                  <div style={{ fontSize: '3.5rem', margin: '8px 0' }}>{wIcon(hero.code)}</div>
                  <div className="compare-temp">{dispTempNum(hero.temp, unit)}°</div>
                  <div className="compare-cond">{hero.desc}</div>
                </div>

                <div className="compare-vs">vs</div>

                <div className="compare-city">
                  <div className="compare-name">{compareCity.split(',')[0]}</div>
                  <div style={{ fontSize: '3.5rem', margin: '8px 0' }}>{wIcon(cCode)}</div>
                  <div className="compare-temp">{dispTempNum(cTemp, unit)}°</div>
                  <div className="compare-cond">{wDesc(cCode, cc.weatherDesc?.[0]?.value)}</div>
                </div>
              </div>

              {/* Difference summary */}
              <div className="compare-diff">
                <strong>{hero.city}</strong> is {Math.abs(diff)}°{' '}
                {diff > 0 ? 'warmer' : 'cooler'} than{' '}
                <strong>{compareCity.split(',')[0]}</strong>
              </div>

              {/* Metric table */}
              <div style={{ marginTop: 24 }}>
                <div className="sec-title">Side-by-Side</div>
                {rows.map((r, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center',
                    padding: '10px 0',
                    borderBottom: '1px solid rgba(180,210,240,0.2)',
                    gap: 12,
                  }}>
                    <span style={{ flex: 1, fontWeight: 700, fontSize: '0.88rem' }}>{r.a}</span>
                    <span style={{ color: 'var(--muted)', fontSize: '0.8rem', width: 90, textAlign: 'center' }}>{r.lbl}</span>
                    <span style={{ flex: 1, textAlign: 'right', fontWeight: 700, fontSize: '0.88rem' }}>{r.b}</span>
                  </div>
                ))}
              </div>
            </>
          );
        })()}
      </div>
    </div>
  );
}
