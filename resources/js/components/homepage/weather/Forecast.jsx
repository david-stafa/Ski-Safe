import { useState } from "react";
import HourForecast from "./HourForecas";
import "./currentWeather.scss";

export default function Forecast({ data, forecast }) {

    const [isOpen, setIsOpen] = useState(false);

  return (
      <div
          className="weather"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
      >
          <div className="weather__top">
              <div className="weather__top-paragraph">
                  <p className="city">Mnt. Logan</p>
                  <p className="description">{data.weather[0].description}</p>
              </div>
              <img
                  src={`images/weather-icons/${data.weather[0].icon}.png`}
                  alt="weather"
                  className="weather-icon"
              />
          </div>
          <div className="weather__bottom">
              <p className="temperature">{Math.round(data.main.temp)}°C</p>
              <div className="details">
                  <div className="parameter-row">
                      <span className="parameter-label top">Details</span>
                  </div>
                  <div className="parameter-row">
                      <span className="parameter-label">Feels like</span>
                      <span className="parameter-value">
                          {Math.round(data.main.feels_like)} °C
                      </span>
                  </div>
                  <div className="parameter-row">
                      <span className="parameter-label">Wind</span>
                      <span className="parameter-value">
                          {data.wind.speed} m/s
                      </span>
                  </div>
                  <div className="parameter-row">
                      <span className="parameter-label">Humidity</span>
                      <span className="parameter-value">
                          {data.main.humidity} %
                      </span>
                  </div>
                  <div className="parameter-row">
                      <span className="parameter-label">Pressure</span>
                      <span className="parameter-value">
                          {data.main.pressure} hPa
                      </span>
                  </div>
              </div>
          </div>
          {isOpen ? <HourForecast data={data} forecast={forecast} /> : ""}
      </div>
  );
}
