import { ActionType, createReducer, createAsyncAction } from 'typesafe-actions';
import { Observable } from 'rxjs';
import { Action } from 'redux';
import { weatherListType } from '../library/types/weatherListType';
import { locationWeatherType } from '../library/types/locationWeatherType';
import { getGeoWeather, getWeathersById } from '../library/api/weather';
import createRequestEpic, {
  createRequestActionTypes,
} from './createRequestEpic';

/** Action Types */
// 위도 경도 값을 받아 날씨 값을 가져오는 액션
const [
  FETCH_WEATHER_GEO,
  FETCH_WEATHER_GEO_FULFILLED,
  FETCH_WEATHER_GEO_REJECTED,
  FETCH_WEATHER_GEO_CANCELLED,
] = createRequestActionTypes('weathers/FETCH_WEATHER_GEO');

// 여러 도시의 날씨 값을 가져오는 액션
const [
  FETCH_WEATHERS_BY_ID,
  FETCH_WEATHERS_BY_ID_FULFILLED,
  FETCH_WEATHERS_BY_ID_REJECTED,
  FETCH_WEATHERS_BY_ID_CANCELLED,
] = createRequestActionTypes('weathers/FETCH_WEATHERS_BY_ID');

/** Action types */
export const fetchWeatherGeoAsync = createAsyncAction(
  FETCH_WEATHER_GEO,
  FETCH_WEATHER_GEO_FULFILLED,
  FETCH_WEATHER_GEO_REJECTED,
  FETCH_WEATHER_GEO_CANCELLED
)<
  { lat: number | null; lon: number | null },
  locationWeatherType,
  string,
  unknown
>();

export const fetchWeathersByIdAsync = createAsyncAction(
  FETCH_WEATHERS_BY_ID,
  FETCH_WEATHERS_BY_ID_FULFILLED,
  FETCH_WEATHERS_BY_ID_REJECTED,
  FETCH_WEATHERS_BY_ID_CANCELLED
)<number[], weatherListType, string, unknown>();

/** Type */
export type Weathers = {
  locationWeather: locationWeatherType | null;
  cityWeathers: weatherListType | null;
  error: { locationWeather: string | null; cityWeathers: string | null };
};
type WeathersState = Weathers;

/** InitialState */
const initialState: WeathersState = {
  locationWeather: null,
  cityWeathers: null,
  error: {
    locationWeather: null,
    cityWeathers: null,
  },
};

/** Typescript Type of Actions */
const actions = {
  fetchWeatherGeoAsync,
  fetchWeathersByIdAsync,
};
type WeathersAction = ActionType<typeof actions>;

export const fetchWeatherGeoEpic = (
  action$: Observable<Action>
): Observable<Action> =>
  createRequestEpic(action$, fetchWeatherGeoAsync, getGeoWeather);

export const fetchWeathersByIdEpic = (
  action$: Observable<Action>
): Observable<Action> =>
  createRequestEpic(action$, fetchWeathersByIdAsync, getWeathersById);

const weathers = createReducer<WeathersState, WeathersAction>(initialState, {
  [FETCH_WEATHER_GEO]: state => ({ ...state }),
  [FETCH_WEATHER_GEO_CANCELLED]: state => ({ ...state }),
  [FETCH_WEATHER_GEO_FULFILLED]: (state, { payload: locationWeather }) => ({
    ...state,
    locationWeather,
  }),
  [FETCH_WEATHER_GEO_REJECTED]: (state, { payload: err }) => ({
    ...state,
    error: {
      ...state.error,
      locationWeather: err,
    },
  }),
  [FETCH_WEATHERS_BY_ID]: state => ({ ...state }),
  [FETCH_WEATHERS_BY_ID_CANCELLED]: state => ({ ...state }),
  [FETCH_WEATHERS_BY_ID_FULFILLED]: (state, { payload: cityWeathers }) => ({
    ...state,
    cityWeathers,
  }),
  [FETCH_WEATHERS_BY_ID_REJECTED]: (state, { payload: err }) => ({
    ...state,
    error: {
      ...state.error,
      cityWeathers: err,
    },
  }),
});

export default weathers;
