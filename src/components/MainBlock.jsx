import React from 'react';
import ForecastBlock from './ForecastBlock';
import TodayForecast from './TodayForecast';
import './MainBlock.css';

const MainBlock = () => (
  <main className="main-block">
    <ForecastBlock />
    <TodayForecast />
  </main>
);

export default MainBlock;
