/* eslint-disable no-param-reassign */
import { ActionType, createReducer, createAsyncAction } from 'typesafe-actions';
import { Observable, of, bindCallback } from 'rxjs';
import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { createRequestActionTypes } from './createRequestEpic';

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
    mergeMap(() =>
      getCurrentPosition$.pipe(
        map(position =>
          fetchLocationAsync.success({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        ),
        catchError(() => of(fetchLocationAsync.failure({ error: 'denied' })))
      )
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
