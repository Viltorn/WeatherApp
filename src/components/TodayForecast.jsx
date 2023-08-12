import React, { useContext } from 'react';
import WindSign from '../images/WindSign.svg';
import './TodayForecast.css';
import DetailCard from './DetailCard';
import WeatherContext from '../context/weatherContext';

const TodayForecast = () => {
  const { weatherData } = useContext(WeatherContext);

  return (
    <section className="forecast-today">
      <h2 className="forecast-today__title">Подробно на сегодня</h2>
      <div className="forecast-today__cards-block">
        <DetailCard type="magor" name="Скорость ветра" data={weatherData.windData} units="м/с" img={WindSign} />
        <DetailCard type="magor" name="Влажность" data={weatherData.humidity} units="%" img={null} />
        <DetailCard type="minor" name="Видимость" data={weatherData.visibility} units="км" img={null} />
        <DetailCard type="minor" name="Давление" data={weatherData.pressure} units="мм рт. ст." img={null} />
      </div>
    </section>
  );
};

export default TodayForecast;
