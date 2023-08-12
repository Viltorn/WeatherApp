import React, { useContext } from 'react';
import './ForecastCard.css';
import WeatherSpinner from './WeatherSpinner.jsx';
import WeatherContext from '../context/weatherContext';
import routes from '../routes';

const ForecastCard = ({ type, data, width }) => {
  const { isLoading } = useContext(WeatherContext);
  const currentDate = data[0];
  const maxTemp = type === 'week' ? Math.max(...data[1].temp) : data[1].temp;
  const minTemp = type === 'week' ? Math.min(...data[1].temp) : '';
  const { itemIcon } = data[1];

  return (
    <div className="forecast-block__card" style={{ width: `${width}px`, backgroundImage: isLoading ? '' : `url(${routes.weatherIcon(itemIcon)})`, justifyContent: isLoading ? 'center' : '' }}>
      {isLoading && (
        <WeatherSpinner />
      )}
      {type === 'week' && !isLoading && (
      <>
        <p className="forecast-block__card-value">
          {currentDate}
        </p>
        <div className="forecast-block__card-temperature">
          <p className="forecast-block__card-value">
            {maxTemp}
            °C
          </p>
          <p className="forecast-block__card-value text-mute">
            {minTemp}
            °C
          </p>
        </div>
      </>
      )}
      {type === 'hour' && !isLoading && (
      <>
        <p className="forecast-block__card-value">{currentDate}</p>
        <p className="forecast-block__card-value">
          {maxTemp}
          °C
        </p>
      </>
      )}
    </div>
  );
};

export default ForecastCard;
