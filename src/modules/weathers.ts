import dotenv from 'dotenv';
import { createAction, ActionType, createReducer } from 'typesafe-actions';
import { Observable, of, race } from 'rxjs';
import { mergeMap, map, takeUntil, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { Action } from 'redux';
import { ofType } from 'redux-observable';

/** Action Types */
const FETCH_WEATHER_GEO = 'weathers/FETCH_WEATHER_GEO';
const FETCH_WEATHER_GEO_FULFILLED = 'weathers/FETCH_WEATHER_GEO_FULFILLED';
const FETCH_WEATHER_GEO_REJECTED = 'weathers/FETCH_WEATHER_GEO_REJECTED';
const FETCH_WEATHER_GEO_CANCELLED = 'weathers/FETCH_WEATHER_GEO_CANCELLED';

export const fetchWeatherGeo = createAction(FETCH_WEATHER_GEO)<
  Partial<Coordinates>
>();
export const fetchWeatherGeoFulfilled = createAction(
  FETCH_WEATHER_GEO_FULFILLED
)<unknown>();
export const fetchWeatherGeoCanceled = createAction(
  FETCH_WEATHER_GEO_CANCELLED
)();
export const fetchWeatherRejected = createAction(FETCH_WEATHER_GEO_REJECTED)<
  any
>();

/** Type */
export type Weathers = {
  data: any;
  loading: boolean;
  error: any;
};
type WeathersState = Weathers;

/** InitialState */
const initialState: WeathersState = {
  data: null,
  loading: false,
  error: null,
};

/** Typescript Type of Actions */
const actions = {
  fetchWeatherGeo,
  fetchWeatherGeoCanceled,
  fetchWeatherGeoFulfilled,
  fetchWeatherRejected,
};
type WeathersAction = ActionType<typeof actions>;

const api = `https://api.openweathermap.org/data/2.5/weather?q=london&appid=${process.env.OPEN_WEATHER_API_KEY}`;

export const fetchWeatherGeoEpic = (
  action$: Observable<Action>
): Observable<Action> => {
  return action$.pipe(
    ofType(FETCH_WEATHER_GEO),
    mergeMap(_unusedAction =>
      race(
        ajax.getJSON(api).pipe(
          map(response => fetchWeatherGeoFulfilled(response)),
          takeUntil(action$.pipe(ofType(FETCH_WEATHER_GEO_CANCELLED))),
          catchError(error =>
            of({
              type: FETCH_WEATHER_GEO_REJECTED,
              payload: error.xhr.response,
              error: true,
            })
          )
        )
      )
    )
  );
};

const weathers = createReducer<WeathersState, WeathersAction>(initialState, {
  [FETCH_WEATHER_GEO]: (state, { payload: string }) => ({
    ...state,
    loading: true,
  }),
  [FETCH_WEATHER_GEO_CANCELLED]: state => ({ ...state, loading: false }),
  [FETCH_WEATHER_GEO_FULFILLED]: (state, { payload }) => ({
    ...state,
    data: payload,
    loading: false,
  }),
  [FETCH_WEATHER_GEO_REJECTED]: (state, { payload }) => ({
    ...state,
    error: payload,
    loading: false,
  }),
});

export default weathers;
