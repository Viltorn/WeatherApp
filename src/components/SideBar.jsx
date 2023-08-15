/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext } from 'react';
import SearchPanel from './SearchPanel.jsx';
import locationPin from '../images/LocationPin.svg';
import theme from '../themeData';
import WeatherContext from '../context/weatherContext';
import routes from '../routes.js';
import WeatherSpinner from './WeatherSpinner.jsx';
import './SideBar.css';

const SideBar = () => {
  const [currentTheme, setTheme] = useState('light');
  const {
    activeCity, weatherData, toogleSearchBar, getLocatedWeather, isLoading,
  } = useContext(WeatherContext);

  const { day, month, weekDay } = weatherData.currentDate;

  const changeTheme = () => {
    const newThem = currentTheme === 'light' ? 'dark' : 'light';
    const currentThemeData = theme[newThem];
    currentThemeData.forEach((variable) => {
      const { name, value } = variable;
      document.documentElement.style.setProperty(name, value);
    });
    setTheme(newThem);
  };

  return (
    <aside className="side-bar">
      <div className="side-bar__content">
        <SearchPanel />
        <div className="side-bar__fixed-block">
          <div className="side-bar__buttons-block">
            <button onClick={() => toogleSearchBar(true)} type="button" id="show-panel" className="buttons side-bar__btn" aria-label="Поиск города">
              Поиск города
            </button>
            <button onClick={changeTheme} type="button" className={currentTheme === 'light' ? 'side-bar__themeswitcher-btn light' : 'side-bar__themeswitcher-btn dark'} aria-label="Переключатель тем" />
          </div>
          <div className="side-bar__snowflake-image">
            {!isLoading ? (
              <img
                alt="weahter icon"
                src={routes.weatherBigIcon(weatherData.icon)}
              />
            ) : (
              <WeatherSpinner />
            )}
          </div>
        </div>
        {!isLoading ? (
          <div className="side-bar__weather">
            <div className="temperature-block">
              <span className="temperature-block__value">
                {weatherData.temperature}
                {' '}
              </span>
              <span className="temperature-block__sign">°C</span>
            </div>
            <h2 className="side-bar__precipitation">{weatherData.condition}</h2>
            <p className="side-bar__info">
              Ощущается как
              {' '}
              {weatherData.feelsTemp}
              {' '}
              °C
            </p>
            <div className="side-bar__info-container">
              <p className="side-bar__info side-bar__info-container_data">Сегодня</p>
              <p className="side-bar__info side-bar__info-container_data">
                {weekDay}
                ,
                {' '}
                {day}
                {' '}
                {month}
              </p>
            </div>
            <div className="side-bar__location-container">
              <button type="button" onClick={getLocatedWeather} className="side-bar__btn-styless">
                <img src={locationPin} alt="location pin" />
              </button>
              <p className="side-bar__info side-bar__location-place">{activeCity.cityName}</p>
            </div>
          </div>
        ) : (
          <WeatherSpinner />
        )}
      </div>
    </aside>
  );
};

export default SideBar;
