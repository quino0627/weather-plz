import { ajax } from 'rxjs/ajax';
import { Observable } from 'rxjs';
import { Action } from 'redux';
import queryString from 'query-string';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getGeoWeather(action: any): Observable<Action<unknown>> {
  const { payload } = action;
  console.log(queryString.stringify(payload));
  return ajax.getJSON(
    `https://api.openweathermap.org/data/2.5/weather?q=london&appid=${process.env.OPEN_WEATHER_API_KEY}`
  );
}

export const tmp = 3;

// `https://api.openweathermap.org/data/2.5/weather?q=london&appid=${process.env.OPEN_WEATHER_API_KEY}`
