"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.windDirections = exports.months = exports.weekDays = void 0;
var weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
exports.weekDays = weekDays;
var months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
exports.months = months;
var windDirections = [{
  name: 'C',
  maxDegree: 22
}, {
  name: 'СВ',
  maxDegree: 67
}, {
  name: 'В',
  maxDegree: 112
}, {
  name: 'ЮВ',
  maxDegree: 157
}, {
  name: 'Ю',
  maxDegree: 202
}, {
  name: 'ЮЗ',
  maxDegree: 247
}, {
  name: 'З',
  maxDegree: 292
}, {
  name: 'СЗ',
  maxDegree: 337
}, {
  name: 'C',
  maxDegree: 360
}];
exports.windDirections = windDirections;