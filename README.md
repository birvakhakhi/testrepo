# 🌊 WeatherWave — Weather Dashboard

![WeatherWave Banner](https://img.shields.io/badge/WeatherWave-Dashboard-2563eb?style=for-the-badge&logo=cloud&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![API](https://img.shields.io/badge/API-wttr.in-0ea5e9?style=for-the-badge&logo=cloud&logoColor=white)

> A real-time weather dashboard built with React, HTML, and CSS — no build tools, no API key, no installation required. Just open and use.

---

## ✨ Features

### 🌤️ Core Weather Data
- **Real-time weather** for any city in the world
- Current temperature, feels like, humidity, wind speed, visibility, pressure
- Weather condition with dynamic emoji icons
- High / Low temperature for the day

### 🕐 Forecasts
- **Hourly forecast** with rain probability for today
- **3-Day forecast** with temperature range bars
- Per-day hourly breakdown in the Forecast tab

### 🎛️ Interactive Features
- **°C / °F toggle** — switch units instantly without re-fetching
- **Dark / Light mode** — full theme switch with one click
- **Search autocomplete** — city suggestions as you type
- **Favorites strip** — save cities, see live temps, click to switch
- **📍 Geolocation** — auto-detect your city using GPS
- **City Compare** — compare weather of two cities side by side

### 📊 Detailed Panels
- **Rain Probability Chart** — bar chart for hourly rain chances
- **Wind Compass** — animated needle showing wind direction
- **Feels Like Detail** — explains why it feels hotter/colder
- **Sun & UV Card** — sunrise, sunset, UV index, daylight arc
- **Air Details** — animated progress bars for all metrics
- **Air Quality Index (AQI)** — estimated AQI with color scale
- **Weather Tips** — smart outfit and activity recommendations
- **Location Map** — visual pin showing the searched city

### 🎨 Design
- Dynamic hero card color based on weather (clear, rain, storm, snow, fog)
- Floating weather icon animation
- Frosted glass card effects
- Smooth fade-up animations on load
- Toast notifications for favorites actions
- Fully responsive on mobile

---

## 🚀 Getting Started

### No installation needed!

1. **Download** the `index.html` file
2. **Open** it in any modern browser (Chrome, Firefox, Edge, Safari)
3. That's it — the app loads instantly ✅

```bash
# Or clone the full repo
git clone https://github.com/YOUR_USERNAME/weatherwave.git
cd weatherwave

# Open directly in browser
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **HTML5** | Page structure and markup |
| **CSS3** | Styling, animations, dark mode, responsive layout |
| **JavaScript (ES2022)** | App logic, data handling, API calls |
| **React 18** | UI framework (via CDN, no npm needed) |
| **Babel Standalone** | Compiles JSX in the browser |
| **Google Fonts** | DM Sans + DM Serif Display typography |
| **wttr.in API** | Free weather data — no API key required |
| **Fetch API** | Built-in browser API for HTTP requests |
| **Geolocation API** | Built-in browser API for device location |

---

## 🌐 API Reference

This project uses **[wttr.in](https://wttr.in)** — a free, open-source weather service.

### Endpoint Used
```
GET https://wttr.in/{city}?format=j1
```

### Example Request
```javascript
const response = await fetch('https://wttr.in/Mumbai?format=j1');
const data = await response.json();
```

### Data Extracted

**`current_condition[0]`** — Current weather
| Field | Description |
|---|---|
| `temp_C` | Temperature in Celsius |
| `FeelsLikeC` | Feels like temperature |
| `humidity` | Humidity percentage |
| `windspeedKmph` | Wind speed in km/h |
| `winddirDegree` | Wind direction in degrees |
| `winddir16Point` | Wind direction (N, NE, SW…) |
| `visibility` | Visibility in km |
| `pressure` | Atmospheric pressure in hPa |
| `cloudcover` | Cloud cover percentage |
| `uvIndex` | UV Index (0–11) |
| `weatherCode` | Numeric condition code |
| `weatherDesc[0].value` | Text description |

**`weather[0..2]`** — 3-Day forecast
| Field | Description |
|---|---|
| `date` | Forecast date |
| `maxtempC` | Max temperature |
| `mintempC` | Min temperature |
| `astronomy[0].sunrise` | Sunrise time |
| `astronomy[0].sunset` | Sunset time |
| `hourly[]` | 8 hourly slots (every 3 hours) |

**`weather[n].hourly[]`** — Hourly data
| Field | Description |
|---|---|
| `time` | Time slot (0, 300, 600 … 2100) |
| `tempC` | Temperature at that hour |
| `weatherCode` | Condition code |
| `chanceofrain` | Rain probability (%) |

---

## 📁 Project Structure

```
weatherwave/
│
└── index.html          # The entire project — HTML + CSS + JS in one file
└── README.md           # This file
```

> The entire project lives in a **single HTML file**. All CSS is in a `<style>` tag, and all JavaScript/React is in a `<script type="text/babel">` tag.

---

## 🔧 How It Works

```
User types city → Search triggered
        ↓
fetch('https://wttr.in/{city}?format=j1')
        ↓
Response: JSON data
        ↓
React state updated (setWx)
        ↓
Component re-renders with new data
        ↓
UI updates automatically
```

### Key React Concepts Used

```javascript
// Store city query
const [query, setQuery] = useState("Mumbai");

// Fetch when query changes
useEffect(() => { fetchCity(query); }, [query]);

// Fetch function
const fetchCity = async (city) => {
  const res = await fetch(`https://wttr.in/${city}?format=j1`);
  const data = await res.json();
  setWx(data); // triggers re-render
};
```

### Weather Code → Emoji Mapping

```javascript
function wIcon(code) {
  if ([386, 389, 395].includes(code)) return "⛈️";  // Storm
  if ([305, 308, 356].includes(code)) return "🌧️";  // Rain
  if (code === 113)                   return "☀️";   // Clear
  if (code === 116)                   return "⛅";   // Partly cloudy
  // ...and so on
}
```

### °C to °F Conversion

```javascript
function toF(celsius) {
  return Math.round(celsius * 9/5 + 32);
}
```

---

## 🌙 Dark Mode Implementation

Dark mode uses **CSS variables** toggled by a class on `<body>`:

```css
/* Light mode defaults */
:root {
  --bg: #deedf8;
  --text: #1a2a3a;
  --card-bg: rgba(255,255,255,0.84);
}

/* Dark mode overrides */
body.dark {
  --bg: #0f172a;
  --text: #e2e8f0;
  --card-bg: rgba(30,41,59,0.9);
}
```

```javascript
// Toggle with one line
document.body.classList.toggle('dark', isDark);
```

---

## 📱 Responsive Design

| Breakpoint | Layout |
|---|---|
| `> 900px` | 2-column and 3-column grids |
| `≤ 900px` | Single column, stacked cards |
| `≤ 640px` | Compact nav, smaller hero text |

---

## ⚠️ Limitations

| Limitation | Reason |
|---|---|
| Only 3-day forecast | wttr.in free tier limit |
| AQI is estimated | wttr.in doesn't provide real AQI — calculated from humidity + conditions |
| No historical data | Would require a paid API |
| Autocomplete is local | Uses a hardcoded list, not a live geocoding API |
| No severe weather alerts | Would require a government weather API |

---

## 🔮 Future Improvements

- [ ] Integrate a real AQI API (IQAir / OpenAQ)
- [ ] Add 7-day forecast using a paid weather API
- [ ] Live city search with a geocoding API (e.g., OpenStreetMap Nominatim)
- [ ] Save favorites to `localStorage` so they persist on refresh
- [ ] Add weather map overlay (radar, satellite)
- [ ] PWA support — make it installable on mobile
- [ ] Historical weather data charts
- [ ] Weather alerts and notifications

---

## 👨‍💻 Authors

**Birva Khakhi, Heer Monpara, Dhyey Kachariya**
- GitHub: github.com/birvakhakhi/testrepo
- Project Link: [https://github.com/birvakhakhi/weatherwave](https://github.com/birvakhakhi/weatherwave)

---


## 🙏 Acknowledgements

- [wttr.in](https://wttr.in) by Igor Chubin — free weather API
- [React](https://react.dev) by Meta — UI library
- [Google Fonts](https://fonts.google.com) — DM Sans & DM Serif Display
- [Shields.io](https://shields.io) — README badges

---
