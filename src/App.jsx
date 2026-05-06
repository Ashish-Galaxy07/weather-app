import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fade, setFade] = useState(true);

  const getBackground = () => {
    if (!weather) return "default";

    const condition = weather.weather[0].main;

    if (condition === "Clear") return "sunny";
    if (condition === "Clouds") return "cloudy";
    if (condition === "Rain") return "rainy";
    if (condition === "Snow") return "snowy";

    return "default";
  };

  const getWeather = async (city) => {
    try {
      setFade(false); // fade out

      setLoading(true);
      setError("");

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},&appid=0514f6e6b0e34cb93a9a346ff5f8e932&units=metric`
      );

      const data = await response.json();

      if (data.cod !== 200 && data.cod !== "200") {
        throw new Error(data.message);
      }

      setWeather(data);

      setTimeout(() => setFade(true), 200); // fade in
    } catch (err) {
      setError("City not found!");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`app ${getBackground()} ${fade ? "fade-in" : "fade-out"}`}>
      <h1>Weather App 🌤️</h1>

      <SearchBar getWeather={getWeather} />

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}

export default App;