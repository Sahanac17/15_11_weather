const UNAVAILABLE = "The weather service is unavailable right now. Please try again later.";
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const form = document.getElementById("search-form");
const input = document.getElementById("city-input");
const message = document.getElementById("message");
const result = document.getElementById("result");

// Turns "2026-11-15 14:32" into "Sat 15 Nov, 14:32". If it looks different, shows it as it is.
function formatTime(text) {
  const match = /^(\d{4})-(\d{2})-(\d{2}) (\d{1,2}):(\d{2})$/.exec(text);
  if (!match) return text;
  const date = new Date(Date.UTC(+match[1], +match[2] - 1, +match[3]));
  const hour = match[4].padStart(2, "0");
  return DAYS[date.getUTCDay()] + " " + +match[3] + " " + MONTHS[date.getUTCMonth()] + ", " + hour + ":" + match[5];
}

function showMessage(text) {
  result.hidden = true;
  message.textContent = text;
  message.hidden = false;
}

function showWeather(w) {
  message.hidden = true;
  document.getElementById("place").textContent = w.city + ", " + w.country;
  document.getElementById("time").textContent = "Local time: " + formatTime(w.localTime);
  const icon = document.getElementById("icon");
  icon.src = w.iconUrl;
  icon.alt = w.description;
  document.getElementById("temp").textContent = Math.round(w.temperatureC) + "°C";
  document.getElementById("desc").textContent = w.description;
  document.getElementById("feels").textContent = Math.round(w.feelsLikeC) + "°C";
  document.getElementById("humidity").textContent = w.humidity + "%";
  document.getElementById("wind").textContent = Math.round(w.windKph) + " km/h " + w.windDir;
  result.hidden = false;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const response = await fetch("/api/weather?city=" + encodeURIComponent(input.value.trim()));
    const data = await response.json();
    if (data.error) {
      showMessage(data.error);
    } else {
      showWeather(data);
    }
  } catch (err) {
    showMessage(UNAVAILABLE);
  }
});
