import {
  ActionType,
  createReducer,
  createAsyncAction,
  createAction,
} from 'typesafe-actions';
import { weatherListType } from '../library/types/weatherListType';
import { locationWeatherType } from '../library/types/locationWeatherType';
import { createRequestActionTypes } from './createRequestEpic';

/** Action Types */
// 위도 경도 값을 받아 날씨 값을 가져오는 액션
const FETCH_WEATHER_GEO = 'weathers/FETCH_WEATHER_GEO';
const FETCH_WEATHER_GEO_FULFILLED = 'weathers/FETCH_WEATHER_GEO_FULFILLED';
const FETCH_WEATHER_GEO_REJECTED = 'weathers/FETCH_WEATHER_GEO_REJECTED';
const FETCH_WEATHER_GEO_CANCELLED = 'weathers/FETCH_WEATHER_GEO_CANCELLED';

// 여러 도시의 날씨 값을 가져오는 액션
const FETCH_WEATHERS_BY_ID = 'weathers/FETCH_WEATHERS_BY_ID';
const FETCH_WEATHERS_BY_ID_FULFILLED =
  'weathers/FETCH_WEATHERS_BY_ID_FULFILLED';
const FETCH_WEATHERS_BY_ID_REJECTED = 'weathers/FETCH_WEATHERS_BY_ID_REJECTED';
const FETCH_WEATHERS_BY_ID_CANCELLED =
  'weathers/FETCH_WEATHERS_BY_ID_CANCELLED';

// 로컬스토리지에 접근해서 값을 fetch하는 액션
const GET_LOCALSTORAGE = 'weathers/GET_LOCALSTORAGE';

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

export const getLocalStorage = createAction(GET_LOCALSTORAGE)<unknown>();

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
  [GET_LOCALSTORAGE]: (state, { payload }) => ({ ...state, ...payload }),
});

export default weathers;
