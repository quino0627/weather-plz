import { ActionType, createReducer, createAsyncAction } from 'typesafe-actions';
import { Observable, of, race } from 'rxjs';
import { mergeMap, map, takeUntil, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { Action } from 'redux';
import { ofType } from 'redux-observable';
import createRequestEpic, {
  createRequestActionTypes,
} from './createRequestEpic';

/** Action Types */
const [
  FETCH_WEATHER_GEO,
  FETCH_WEATHER_GEO_FULFILLED,
  FETCH_WEATHER_GEO_REJECTED,
  FETCH_WEATHER_GEO_CANCELLED,
] = createRequestActionTypes('weathers/FETCH_WEATHER_GEO');

/** Action types */
export const fetchWeatherGeoAsync = createAsyncAction(
  FETCH_WEATHER_GEO,
  FETCH_WEATHER_GEO_FULFILLED,
  FETCH_WEATHER_GEO_REJECTED,
  FETCH_WEATHER_GEO_CANCELLED
)<Partial<Coordinates>, unknown, unknown, string>();

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
  fetchWeatherGeoAsync,
};
type WeathersAction = ActionType<typeof actions>;

const api = `https://api.openweathermap.org/data/2.5/weather?q=london&appid=${process.env.OPEN_WEATHER_API_KEY}`;

export const fetchWeatherGeoEpic = (
  action$: Observable<Action>
): Observable<Action> => createRequestEpic(action$, fetchWeatherGeoAsync, api);

const weathers = createReducer<WeathersState, WeathersAction>(initialState, {
  [FETCH_WEATHER_GEO]: state => ({
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
