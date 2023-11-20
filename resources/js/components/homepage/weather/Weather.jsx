import { useEffect, useState } from "react";
import { weather_API_KEY, weather_URL } from "./api/api";
import Forecast from "./Forecast";

export default function Weather() {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [currentForecast, setCurrentForecast] = useState(null);


    const loadWeather = async () => {
        try {
            const [weatherResponse, forecastResponse] = await Promise.all([
                fetch(
                    `${weather_URL}/weather?lat=60.587249&lon=-140.449988&appid=${weather_API_KEY}&units=metric`
                ),
                fetch(
                    `${weather_URL}/forecast?lat=60.587249&lon=-140.449988&appid=${weather_API_KEY}&units=metric`
                ),
            ]);

            const weatherData = await weatherResponse.json();
            const forecastData = await forecastResponse.json();

            setCurrentWeather(weatherData);
            setCurrentForecast(forecastData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadWeather();
        console.log('fetched')
    }, []);


    return (
        <div
            className="container"
        >
            {currentWeather && (
                <Forecast
                    data={currentWeather}
                    forecast={currentForecast}
                />
            )}
        </div>
    );
}
