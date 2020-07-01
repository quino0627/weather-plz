/* Ducks Modular Redux Pattern을 이용한  */
import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import styles from './styles';
import weathers, { fetchWeatherGeoEpic } from './weathers';
import loading from './loading';
import locations, { fetchLocationEpic } from './locations';

export const rootEpic = combineEpics(fetchWeatherGeoEpic, fetchLocationEpic);
export const rootReducer = combineReducers({
  styles,
  weathers,
  locations,
  loading,
});

export type RootState = ReturnType<typeof rootReducer>;
