/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ajax } from 'rxjs/ajax';
import { Observable } from 'rxjs';
import { Action } from 'redux';
import queryString from 'query-string';

export function getGeoWeather(action: any): Observable<Action<unknown>> {
  const { payload } = action;
  const latLon = queryString.stringify(payload);
  return ajax.getJSON(
    `${process.env.OPEN_WEATHER_API_BASE}/weather?${latLon}&appid=${process.env.OPEN_WEATHER_API_KEY}&${process.env.OPEN_WEATHER_API_SETTINGS}`
  );
}

export function getWeathersById(action: any): Observable<Action<unknown>> {
  const { payload } = action;
  const ids = queryString.stringify({ id: payload }, { arrayFormat: 'comma' });
  return ajax.getJSON(
    `${process.env.OPEN_WEATHER_API_BASE}/group?${ids}&appid=${process.env.OPEN_WEATHER_API_KEY}&${process.env.OPEN_WEATHER_API_SETTINGS}`
  );
}

// `https://api.openweathermap.org/data/2.5/weather?q=london&appid=${process.env.OPEN_WEATHER_API_KEY}`

/**
 * Daejeon: 1835224
 * Daegu: 1835327
 * Busan: 1838519
 * Incheon: 1843561
 */
