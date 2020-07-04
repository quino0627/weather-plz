/* eslint-disable @typescript-eslint/no-explicit-any */
import { Observable, of as of$, concat } from 'rxjs';
import { mergeMap, takeUntil, catchError, map } from 'rxjs/operators';
import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { PayloadActionCreator } from 'typesafe-actions';
import { startLoading, finishLoading } from './loading';

// ! for the limitation of typesafe-actions, template string is not available
// export const createRequestActionTypes = (type: string): string[] => {
//   const FULFILLED = `${type}_SUCCESS`;
//   const REJECTED = `${type}_REJECTED`;
//   const CANCELLED = `${type}_CANCELED`;
//   return [type, FULFILLED, REJECTED, CANCELLED];
// };

export default (
  action$: Observable<Action>,
  asyncAction: {
    request: PayloadActionCreator<any, any>;
    success: PayloadActionCreator<any, any>;
    failure: PayloadActionCreator<any, any>;
    cancel: PayloadActionCreator<any, any>;
  },
  api: (action?: Action<any>) => Observable<Action<any>>
): Observable<Action> =>
  action$.pipe(
    ofType(asyncAction.request),
    mergeMap(action =>
      concat(
        of$(startLoading(action.type)),
        api(action).pipe(
          map(response => asyncAction.success(response)),
          takeUntil(action$.pipe(ofType(asyncAction.cancel))),
          catchError(error => of$(asyncAction.failure(error)))
        ),

        of$(finishLoading(action.type))
      )
    )
  );
