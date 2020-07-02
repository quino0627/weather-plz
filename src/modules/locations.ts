/* eslint-disable no-param-reassign */
import { ActionType, createReducer, createAsyncAction } from 'typesafe-actions';
import { Observable, of, bindCallback, concat } from 'rxjs';
import { Action } from 'redux';
import { ofType, StateObservable } from 'redux-observable';
import { mergeMap, catchError, map, tap, mapTo } from 'rxjs/operators';
import { RootState } from 'modules';
import { createRequestActionTypes } from './createRequestEpic';
import { fetchWeatherGeoAsync } from './weathers';
import { startLoading, finishLoading } from './loading';

const [
  FETCH_LOCATION,
  FETCH_LOCATION_FULFILLED,
  FETCH_LOCATION_REJECTED,
  FETCH_LOCATION_CANCELLED,
] = createRequestActionTypes('locations/FETCH_LOCATION');

export const fetchLocationAsync = createAsyncAction(
  FETCH_LOCATION,
  FETCH_LOCATION_FULFILLED,
  FETCH_LOCATION_REJECTED,
  FETCH_LOCATION_CANCELLED
)<void, { latitude: number; longitude: number }, { error: string }, unknown>();

export type Geolocation = {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
};
type GeolocationType = Geolocation;
const initialState: GeolocationType = {
  latitude: null,
  longitude: null,
  error: null,
};
const actions = { fetchLocationAsync };
type GeolocationAction = ActionType<typeof actions>;

const getCurrentPositionObservable = bindCallback(
  (options: unknown, cb: unknown) => {
    if (typeof options === 'function') {
      cb = options;
      options = null;
    }
    navigator.geolocation.getCurrentPosition(cb, cb, options);
  }
);
const getCurrentPosition$ = getCurrentPositionObservable({
  enableHighAccuracy: false,
  timeout: 5000,
  maximumAge: 0,
});

export const fetchLocationEpic = (
  action$: Observable<Action>
): Observable<Action> =>
  action$.pipe(
    ofType(fetchLocationAsync.request),
    mergeMap(action =>
      concat(
        of(startLoading(action.type)),
        getCurrentPosition$.pipe(
          map(position =>
            fetchLocationAsync.success({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            })
          ),
          catchError(() => of(fetchLocationAsync.failure({ error: 'denied' })))
        ),
        of(finishLoading(action.type))
      )
    )
  );

export const fetchWeatherAfterLocationEpic = (
  action$: Observable<Action>,
  state: StateObservable<any>
): Observable<Action> =>
  action$.pipe(
    ofType(fetchLocationAsync.success),
    mergeMap(async () =>
      fetchWeatherGeoAsync.request({
        lat: state.value.locations.latitude,
        lon: state.value.locations.longitude,
      })
    )
  );

const locations = createReducer<GeolocationType, GeolocationAction>(
  initialState,
  {
    [FETCH_LOCATION]: state => ({ ...state }),
    [FETCH_LOCATION_FULFILLED]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    [FETCH_LOCATION_REJECTED]: (state, { payload: { error } }) => {
      return {
        ...state,
        error,
      };
    },
    [FETCH_LOCATION_CANCELLED]: state => ({ ...state }),
  }
);
export default locations;
