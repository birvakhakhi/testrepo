// ============================================
//  WeatherTip.jsx
//  Smart weather tip + clothing advice card
// ============================================
function WeatherTip({ hero }) {
  const tip = weatherTip(hero.code, hero.temp, hero.humidity);

  return (
    <div className="card tip-card">
      <div className="tip-icon">{tip.icon}</div>
      <div className="tip-title">{tip.title}</div>
      <div className="tip-text">{tip.text}</div>
      <div style={{
        marginTop: 16,
        paddingTop: 16,
        borderTop: '1px solid rgba(134,239,172,0.3)'
      }}>
        <div className="sec-title" style={{ marginBottom: 8 }}>What to Wear</div>
        <div style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text)' }}>
          {clothingAdvice(hero.temp)}
        </div>
      </div>
    </div>
  );
}
