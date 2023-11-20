import "./hourForecast.scss";

export default function HourForecast({ forecast }) {
    const dailyForecast = forecast.list.slice(0, 8).map((event) => event);

    const dateAndTime = dailyForecast.map((event, index) =>
        event.dt_txt.split(" ")
    );
    const time = dateAndTime.map((event) => event[1].slice(0, 5));

    const renderContent = dailyForecast.map((event, i) => (
        <div className="forecast__hourly" key={i}>
            <span className="forecast__hourly-time">{time[i]}</span>
            <img
                src={`images/weather-icons/${dailyForecast[i].weather[0].icon}.png`}
                alt="weather"
                className="forecast__hourly-image"
            />
            <span className="forecast__hourly-temperature">
                {Math.round(dailyForecast[i].main.temp)} °C
            </span>
            <span className="forecast__wind">{dailyForecast[i].wind.speed.toFixed(1)} m/s</span>
            <span className="forecast__humidity">{dailyForecast[i].main.humidity} %</span>
        </div>
    ));

    console.log(dailyForecast);

    return <div className="forecast">{renderContent}</div>;
}
