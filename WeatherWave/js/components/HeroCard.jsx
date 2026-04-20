// ============================================
//  HeroCard.jsx
//  Main weather hero card at the top of the page
// ============================================
function HeroCard({ hero, unit }) {
  return (
    <div className={`hero ${hero.cls}`}>
      <div className="hero-left">
        <div className="hero-city">{hero.city}</div>
        <div className="hero-region">{hero.date}</div>
        <div className="hero-temp">{dispTempNum(hero.temp, unit)}°</div>
        <div className="hero-feels">Feels like {dispTempNum(hero.feels, unit)}°</div>
        <div className="hero-stats">
          <div className="stat"><span className="val">{hero.humidity}%</span><span className="lbl">Humidity</span></div>
          <div className="stat"><span className="val">{hero.wind} km/h</span><span className="lbl">Wind</span></div>
          <div className="stat"><span className="val">{hero.visibility} km</span><span className="lbl">Visibility</span></div>
          <div className="stat"><span className="val">{hero.pressure} hPa</span><span className="lbl">Pressure</span></div>
          <div className="stat"><span className="val">{hero.cloudCover}%</span><span className="lbl">Cloud Cover</span></div>
        </div>
      </div>
      <div className="hero-right">
        <div className="hero-icon">{wIcon(hero.code)}</div>
        <div className="hero-cond">{hero.desc}</div>
        <div className="hero-hi-lo">H:{dispTempNum(hero.highToday, unit)}° · L:{dispTempNum(hero.lowToday, unit)}°</div>
      </div>
    </div>
  );
}
