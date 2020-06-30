/* Ducks Modular Redux Pattern을 이용한  */
import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import styles from './styles';
import weathers, { fetchWeatherGeoEpic } from './weathers';

export const rootEpic = combineEpics(fetchWeatherGeoEpic);
export const rootReducer = combineReducers({ styles, weathers });

export type RootState = ReturnType<typeof rootReducer>;
