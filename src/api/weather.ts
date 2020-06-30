import { ajax } from 'rxjs/ajax';
import { Observable } from 'rxjs';
import { Action } from 'redux';

export function getGeoWeather(): Observable<Action<unknown>> {
  return ajax.getJSON(
    `https://api.openweathermap.org/data/2.5/weather?q=london&appid=${process.env.OPEN_WEATHER_API_KEY}`
  );
}

export const tmp = 3;

// `https://api.openweathermap.org/data/2.5/weather?q=london&appid=${process.env.OPEN_WEATHER_API_KEY}`
