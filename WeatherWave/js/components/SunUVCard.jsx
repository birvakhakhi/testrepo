// ============================================
//  SunUVCard.jsx
//  Sunrise, sunset, UV index and daylight arc
// ============================================
function SunUVCard({ hero }) {
  const dl = daylight(hero.sunrise, hero.sunset);
  const uvLabel = hero.uvi <= 2 ? 'Low' : hero.uvi <= 5 ? 'Moderate' : hero.uvi <= 7 ? 'High' : 'Very High';

  return (
    <div className="card sun-card">
      <div className="sec-title">Sun &amp; UV</div>

      <div className="sun-row">
        <span className="sun-lbl">🌅 Sunrise</span>
        <span className="sun-val">{hero.sunrise}</span>
      </div>

      <div className="sun-row">
        <span className="sun-lbl">🌇 Sunset</span>
        <span className="sun-val">{hero.sunset}</span>
      </div>

      <div className="sun-row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <span className="sun-lbl">🌞 UV Index</span>
          <span className="sun-val">{hero.uvi} — {uvLabel}</span>
        </div>
        <div className="uv-bar" style={{ width: '100%' }}>
          <div className="uv-dot" style={{ left: `${Math.min(hero.uvi / 11 * 100, 93)}%` }}/>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <div className="sun-lbl" style={{ marginBottom: 8 }}>🌄 Daylight Arc</div>
        <div className="daylight-bar">
          <div className="daylight-fill" style={{ left: `${dl.pctStart}%`, width: `${dl.pctLen}%` }}/>
          <div className="sun-now-dot"   style={{ left: `${dl.pctStart + dl.pctNow * dl.pctLen / 100}%` }}/>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: '0.72rem', color: 'var(--muted)' }}>
          <span>{hero.sunrise}</span>
          <span>Now</span>
          <span>{hero.sunset}</span>
        </div>
      </div>
    </div>
  );
}
