import React from "react";

const WeatherCard = ({ weather }) => {
  return (
    <div className="weather-card">
      <h2>{weather.name}</h2>

      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="weather icon"
      />

      <h3>{weather.main.temp}°C</h3>
      <p>{weather.weather[0].main}</p>

      <p>🤔 Feels like: {weather.main.feels_like}°C</p>
      <p>💧 Humidity: {weather.main.humidity}%</p>
      <p>🌬️ Wind: {weather.wind.speed} m/s</p>
    </div>
  );
};

export default WeatherCard;