import React, { useContext, useEffect, useState } from 'react';
import './DetailCard.css';
import WeatherSpinner from './WeatherSpinner.jsx';
import WeatherContext from '../context/weatherContext';

const CardOption = ({ props }) => {
  const {
    name, data, units, img,
  } = props;
  const [isShowAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowAnimation(true), 0);
  }, []);

  if (name === 'Скорость ветра') {
    const finalAngle = 45 + data.angle;
    const windStyle = { transform: `rotate(${finalAngle}deg` };
    return (
      <>
        <h3 className="detail-forecast__h3-title">{name}</h3>
        <div className="detail-forecast__wind-block">
          <p className="detail-forecast__card-value">
            {data.speed}
            <span className="detail-forecast__card-value-unit"> м/с</span>
          </p>
          <div className="detail-forecast__wind-sign-block">
            <img src={img} alt="wind sign" className="detail-forecast__wind-img" style={isShowAnimation ? windStyle : {}} />
            <span className="detail-forecast__wind-symbol">{data.name}</span>
          </div>
        </div>
      </>
    );
  }
  if (name === 'Влажность') {
    const scaleStyle = { width: `${data}%` };
    return (
      <>
        <h3 className="detail-forecast__h3-title">{name}</h3>
        <p className="detail-forecast__card-value">
          {data}
          <span className="detail-forecast__card-value-unit">
            {' '}
            {units}
          </span>
        </p>
        <div className="detail-forecast__scale-block">
          <div className="detail-forecast__scale-units">
            <p className="detail-forecast__scale-unit">0</p>
            <p className="detail-forecast__scale-unit">50</p>
            <p className="detail-forecast__scale-unit">100</p>
          </div>
          <div className="detail-forecast__scale-picture">
            <div className="detail-forecast__scale-current-value" style={isShowAnimation ? scaleStyle : {}} />
          </div>
          <p className="detail-forecast__scale-unit">%</p>
        </div>
      </>
    );
  }
  if (name === 'Давление') {
    return (
      <>
        <h3 className="detail-forecast__h3-title">{name}</h3>
        <p className="detail-forecast__card-value">
          {data}
          <span className="detail-forecast__card-value-unit_small">
            {' '}
            {units}
          </span>
        </p>
      </>
    );
  }

  return (
    <>
      <h3 className="detail-forecast__h3-title">{name}</h3>
      <p className="detail-forecast__card-value">
        {data}
        <span className="detail-forecast__card-value-unit">
          {' '}
          {units}
        </span>
      </p>
    </>
  );
};

const DetailCard = (props) => {
  const { isLoading } = useContext(WeatherContext);
  const { type } = props;
  return (
    <div className={type === 'magor' ? 'detail-forecast__major-card' : 'detail-forecast__minor-card'} style={{ justifyContent: isLoading ? 'center' : '' }}>
      {!isLoading ? (
        <CardOption props={props} />
      ) : (
        <WeatherSpinner />
      )}
    </div>
  );
};

export default DetailCard;
