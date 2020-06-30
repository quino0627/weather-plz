/* eslint-disable @typescript-eslint/no-explicit-any */
import { Observable, race, of } from 'rxjs';
import { mergeMap, takeUntil, catchError, map } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { PayloadActionCreator } from 'typesafe-actions';

export const createRequestActionTypes = (type: string): string[] => {
  const FULFILLED = `${type}_SUCCESS`;
  const REJECTED = `${type}_REJECTED`;
  const CANCELLED = `${type}_REJECTED`;
  return [type, FULFILLED, REJECTED, CANCELLED];
};

export default (
  action$: Observable<Action>,
  asyncAction: {
    request: PayloadActionCreator<any, any>;
    success: PayloadActionCreator<any, any>;
    failure: PayloadActionCreator<any, any>;
    cancel: PayloadActionCreator<any, any>;
  },
  api: string
): Observable<Action> =>
  action$.pipe(
    ofType(asyncAction.request),
    mergeMap(_unusedAction =>
      race(
        ajax.getJSON(api).pipe(
          map(response => asyncAction.success(response)),
          takeUntil(action$.pipe(ofType(asyncAction.cancel))),
          catchError(error => of(asyncAction.failure(error)))
        )
      )
    )
  );
