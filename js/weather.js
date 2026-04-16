import { getWeather } from "./api.js";

const API_KEY = "5a90f45f974f401abde183234262903";

export function initWeather() {
  const weatherSpan = document.querySelector(".weather span");
  const weatherImg = document.querySelector(".weather img");

  if (!weatherSpan) return;

  weatherSpan.textContent = "Loading weather...";

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        try {
          const weatherData = await getWeather(latitude, longitude, API_KEY);
          const temp = Math.round(weatherData.current.temp_c);
          const city = weatherData.location.name;
          const iconUrl = weatherData.current.condition.icon;
          const conditionText = weatherData.current.condition.text;

          weatherSpan.textContent = `${temp} C° - ${city}`;

          if (weatherImg) {
            weatherImg.src = `https:${iconUrl}`;
            weatherImg.alt = conditionText;
          }
        } catch (error) {
          console.warn("API Error: ", error);
          weatherSpan.textContent = `API Error: ${error.message}`;
        }
      },
      (error) => {
        console.warn("Geolocation error: ", error);
        let msg = "Location error";
        if (error.code === 1) msg = "Location permission denied";
        else if (error.code === 2) msg = "Position unavailable";
        weatherSpan.textContent = msg;
      },
    );
  } else {
    weatherSpan.textContent = "Geolocation not supported";
  }
}
