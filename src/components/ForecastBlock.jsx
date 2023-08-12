/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState, useEffect, useContext,
} from 'react';
import _ from 'lodash';
import cn from 'classnames';
import ForecastCard from './ForecastCard';
import WeatherContext from '../context/weatherContext';
import './ForecastBlock.css';

const gap = 24;
const cardWidth = 100;
const slideWidth = cardWidth + gap;

const ForecastBlock = () => {
  const [forecastType, setForecast] = useState('week');
  const [sliderWeeks, setWeeksSlider] = useState({ currentStep: 0, viewWidth: 596, maxSteps: 2 });
  const [sliderHours, setHoursSlider] = useState({ currentStep: 0, viewWidth: 720, maxSteps: 2 });
  const { forecastData } = useContext(WeatherContext);

  const dataToDisplay = forecastType === 'week' ? forecastData.daysForecast : forecastData.hoursForecast;
  const currentSlider = forecastType === 'week' ? sliderWeeks : sliderHours;

  const calculateMaxCards = (windowWidth) => {
    const calcSliderData = (number, data) => {
      const displayNumber = Math.min(number, data.length);
      const viewWidth = (slideWidth * displayNumber) - gap;
      const maxSteps = Math.floor(((data.length * slideWidth) - viewWidth) / slideWidth);
      return { viewWidth, maxSteps };
    };

    if (windowWidth >= 1440) {
      const maxCardsDisplay = 6;
      const weeksSliderData = calcSliderData(maxCardsDisplay, forecastData.daysForecast);
      const hoursSliderData = calcSliderData(maxCardsDisplay, forecastData.hoursForecast);
      setWeeksSlider({ currentStep: 0, ...weeksSliderData });
      setHoursSlider({ currentStep: 0, ...hoursSliderData });
    } else if (windowWidth > 833) {
      const maxCardsDisplay = 3;
      const weeksSliderData = calcSliderData(maxCardsDisplay, forecastData.daysForecast);
      const hoursSliderData = calcSliderData(maxCardsDisplay, forecastData.hoursForecast);
      setWeeksSlider({ currentStep: 0, ...weeksSliderData });
      setHoursSlider({ currentStep: 0, ...hoursSliderData });
    } else {
      setWeeksSlider({ currentStep: 0, viewWidth: null });
      setHoursSlider({ currentStep: 0, viewWidth: null });
    }
  };

  const changeForecastType = (type) => {
    if (type !== forecastType) {
      setForecast(type);
    }
  };

  useEffect(() => {
    calculateMaxCards(window.innerWidth);
  }, [forecastData]);

  useEffect(() => {
    const handleWindowResize = () => {
      calculateMaxCards(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  const changeSlide = (step) => {
    if (forecastType === 'week') {
      setWeeksSlider({ ...sliderWeeks, currentStep: sliderWeeks.currentStep + step });
    } else {
      setHoursSlider({ ...sliderHours, currentStep: sliderHours.currentStep + step });
    }
  };

  return (
    <section className="forecast-block">
      <div className="forecast-block__options">
        <h2 className="forecast-block__title">Прогноз</h2>
        <div className="forecast-block__options-list">
          <button data="week" type="button" className={cn('forecast-block__option-item', { active: forecastType === 'week' })} onClick={() => changeForecastType('week')}>на неделю</button>
          <button data="hour" type="button" className={cn('forecast-block__option-item', { active: forecastType === 'hour' })} onClick={() => changeForecastType('hour')}>почасовой</button>
        </div>
      </div>
      <div className="forecast-block__weather-overview">
        <button type="button" onClick={() => changeSlide(-1)} className={cn('forecast-block__previous-btn', 'forecast-block__btn', { disabled: currentSlider.currentStep === 0 })} disabled={currentSlider.currentStep === 0} aria-label="Предыдущий" />
        <div className="forecast-block__cards-viewport" style={currentSlider.viewWidth ? { width: `${currentSlider.viewWidth}px` } : { width: '100%' }}>
          <div className="forecast-block__weather-cards" style={{ gap: `${gap}px`, transform: `translateX(-${currentSlider.currentStep * slideWidth}px)` }}>
            {dataToDisplay.length !== 0 && (dataToDisplay.map((item) => (
              <ForecastCard key={_.uniqueId()} data={item} type={forecastType} width={cardWidth} />
            )))}
          </div>
        </div>
        <button type="button" onClick={() => changeSlide(1)} className={cn('forecast-block__next-btn', 'forecast-block__btn', { disabled: currentSlider.currentStep === currentSlider.maxSteps })} disabled={currentSlider.currentStep === currentSlider.maxSteps} aria-label="Следующий" />
      </div>
    </section>
  );
};

export default ForecastBlock;
