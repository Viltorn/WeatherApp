/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  useState, useRef, useContext,
} from 'react';
import axios from 'axios';
import _ from 'lodash';
import cn from 'classnames';
import CloseBtn from '../images/CloseBtn.svg';
import routes from '../routes';
import WeatherContext from '../context/weatherContext';
import BtnArrow from '../images/BtnArrow.svg';
import './SearchPanel.css';
import { parseCityData } from '../utils/parseFunctions';

/* UTILS */

const cutArr = (arr, number = 5) => arr.slice(0, number);

const getCities = (city, cities) => {
  const checkedCities = cities.find((item) => item.cityName === city.cityName);
  if (checkedCities) {
    return cities;
  }
  return cutArr([city, ...cities]);
};

/* SEARCH PANEL */

const SearchPanel = () => {
  const inputEl = useRef();
  const [inputValue, setValue] = useState('Москва');
  const {
    isSearchOpen,
    activeCity,
    setActiveCity,
    setSearchedHistory,
    getSearchedHistory,
    toogleSearchBar,
    makeWeatherRequest,
    setError,
    wheatherKey,
    setSubmitting,
    error,
    isSubmitting,
  } = useContext(WeatherContext);

  const searchedCities = getSearchedHistory() ?? [];

  const handleChange = (e) => {
    setError(null);
    setValue(e.target.value);
  };

  const handleActiveClick = (city) => {
    makeWeatherRequest(city.lat, city.lon, wheatherKey);
    setActiveCity(city);
    toogleSearchBar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (inputValue === '') {
        throw new Error('Поле не должно быть пустым!');
      }
      const response = await axios.get(routes.cityRoute(inputValue));
      if (response.status === 200 && response.data.length > 0) {
        const cityData = parseCityData(response.data[0]);
        const citiesToDisplay = getCities(cityData, searchedCities);
        setActiveCity({ ...cityData });
        setSearchedHistory(citiesToDisplay);
        setValue('');
        setSubmitting(false);
        await makeWeatherRequest(cityData.lat, cityData.lon, wheatherKey);
        toogleSearchBar(false);
      } else {
        throw new Error('Упс! Город не найден, попробуйте другой');
      }
    } catch (err) {
      console.log(err);
      setError(err.message);
      setSubmitting(false);
      inputEl.current.focus();
    }
  };

  return (
    <div className="search-panel" style={{ transform: `${isSearchOpen ? 'translateX(0)' : 'translate(-100%)'}` }}>
      <div className="search-panel__container">
        <button className="search-panel__close-button" onClick={() => toogleSearchBar(false)} id="close-panel" type="button" aria-label="Закрыть панель">
          <img src={CloseBtn} alt="search icon" />
        </button>
        <form className="search-panel__form" onSubmit={handleSubmit}>
          <div className="search-bar__input-block">
            <input type="search" value={inputValue} ref={inputEl} onChange={handleChange} className="buttons search-bar__input" id="search" />
            {error && (
              <p className="search-bar__error-msg">
                {error}
              </p>
            )}
          </div>
          <label htmlFor="search" className="visually-hidden">
            Поиск города
          </label>
          <button className="search-bar__button buttons" disabled={isSubmitting} id="search-city" aria-label="Найти" type="submit">
            Найти
          </button>
        </form>
        <div className="search-bar__searched-cities">
          {searchedCities.length !== 0 && (
            searchedCities.map((item) => (
              <button type="button" key={_.uniqueId()} onClick={() => handleActiveClick(item)} className={cn('search-bar__searched-btn', { active: activeCity.cityName === item.cityName })}>
                {item.cityName}
                {activeCity.cityName === item.cityName && (
                  <img src={BtnArrow} alt="button arrow right" />
                )}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;
