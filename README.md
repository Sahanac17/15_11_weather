# Weather App

## What the app is

* A weather website.
* You type a city name and see the current weather for that city.

## How it works

* Type a city name in the search box.
* Click **Search** (or press Enter).
* The page shows the weather for that city:
  * the city name and country
  * the local time there
  * a small weather picture and a short description, like "Partly cloudy"
  * the temperature in Celsius
  * what it feels like, in Celsius
  * the humidity
  * the wind speed (in km/h) and direction

## Where the weather comes from

* The weather data comes from [weatherapi.com](https://www.weatherapi.com).
* The page doesn't talk to weatherapi.com directly. It asks a small function on the server (in the `api` folder), and that function asks weatherapi.com.

## Where it is hosted

* The code lives on GitHub.
* The website is published on [Vercel](https://vercel.com).
* The weatherapi.com key is a secret. It is stored on Vercel as an environment variable called `WEATHER_API_KEY`.
* The key is never written in the code, and the page never sees it.

## What happens when something goes wrong

* If the city is empty or can't be found, the page shows: "We couldn't find that city. Please check the spelling and try again."
* If the weather can't be loaded for any other reason, the page shows: "The weather service is unavailable right now. Please try again later."

## Live link

[add live link here]

## Credits

* Weather data from [weatherapi.com](https://www.weatherapi.com).
