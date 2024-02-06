import React from 'react';
import ForecastBlock from '../ForecastBlock/ForecastBlock';
import TodayForecast from '../TodayForecast/TodayForecast';
import './MainBlock.css';

const MainBlock = () => (
  <main className="main-block">
    <ForecastBlock />
    <TodayForecast />
  </main>
);

export default MainBlock;
