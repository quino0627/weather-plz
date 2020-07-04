/* Ducks Modular Redux Pattern을 이용한  */
import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import styles from './styles';
import weathers from './weathers';
import {
  fetchWeatherGeoEpic,
  fetchWeathersByIdEpic,
  InsertStorageAfterSuccessEpic,
} from './epics';
import loading from './loading';
import locations, {
  fetchLocationEpic,
  fetchWeatherAfterLocationEpic,
} from './locations';

export const rootEpic = combineEpics(
  fetchWeatherGeoEpic,
  fetchLocationEpic,
  fetchWeatherAfterLocationEpic,
  fetchWeathersByIdEpic,
  InsertStorageAfterSuccessEpic
);
export const rootReducer = combineReducers({
  styles,
  weathers,
  locations,
  loading,
});

export type RootState = ReturnType<typeof rootReducer>;
