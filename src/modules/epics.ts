import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { getGeoWeather, getWeathersById } from '../library/api/weather';
import { setWithExpire } from '../library/utils';
import { fetchWeatherGeoAsync, fetchWeathersByIdAsync } from './weathers';
import createRequestEpic from './createRequestEpic';

export const fetchWeatherGeoEpic = (
  action$: Observable<Action>
): Observable<Action> =>
  createRequestEpic(action$, fetchWeatherGeoAsync, getGeoWeather);

export const fetchWeathersByIdEpic = (
  action$: Observable<Action>
): Observable<Action> =>
  createRequestEpic(action$, fetchWeathersByIdAsync, getWeathersById);

export const InsertStorageAfterSuccessEpic = (
  action$: Observable<Action>
): Observable<Action> => {
  return Observable.create(_observer => {
    const subscription = action$
      .pipe(
        ofType(fetchWeatherGeoAsync.success, fetchWeathersByIdAsync.success)
      )
      .subscribe(action => {
        setWithExpire(action.type, action.payload, 600000);
      });
    return (): void => subscription.unsubscribe();
  });
};
