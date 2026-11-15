const NOT_FOUND = "We couldn't find that city. Please check the spelling and try again.";
const UNAVAILABLE = "The weather service is unavailable right now. Please try again later.";

module.exports = async function handler(req, res) {
  const city = String(req.query.city || "").trim().slice(0, 100);

  if (!city) {
    return res.status(404).json({ error: NOT_FOUND });
  }

  const key = process.env.WEATHER_API_KEY;
  if (!key) {
    return res.status(503).json({ error: UNAVAILABLE });
  }

  try {
    const params = new URLSearchParams({ key, q: city });
    const response = await fetch("https://api.weatherapi.com/v1/current.json?" + params, {
      signal: AbortSignal.timeout(8000),
    });
    const data = await response.json().catch(() => null);

    // 1003 = no city given, 1006 = no matching city found
    const errorCode = data && data.error && data.error.code;
    if (errorCode === 1003 || errorCode === 1006) {
      return res.status(404).json({ error: NOT_FOUND });
    }

    if (!response.ok || !data || !data.location || !data.current || !data.current.condition) {
      return res.status(503).json({ error: UNAVAILABLE });
    }

    const { location, current } = data;
    const icon = String(current.condition.icon || "");

    return res.status(200).json({
      city: location.name,
      country: location.country,
      localTime: location.localtime,
      description: current.condition.text,
      iconUrl: icon.startsWith("//") ? "https:" + icon : icon,
      temperatureC: current.temp_c,
      feelsLikeC: current.feelslike_c,
      humidity: current.humidity,
      windKph: current.wind_kph,
      windDir: current.wind_dir,
    });
  } catch (err) {
    return res.status(503).json({ error: UNAVAILABLE });
  }
};
