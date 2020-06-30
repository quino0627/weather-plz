import { pipe, race } from 'rxjs';
import { ofType } from 'redux-observable';
import { mergeMap } from 'rxjs/operators';

export const createRequestActionTypes = type => {
  const FULFILLED = `${type}_FULFILLED`;
  const REJECTED = `${type}_REJECTED`;
  const CANCELLED = `${type}_CANCELLED`;
  return [type, FULFILLED, REJECTED, CANCELLED];
};

export default function createRequestEpic(type, api, action$) {
  const FULFILLED = `${type}_FULFILLED`;
  const REJECTED = `${type}_REJECTED`;
  const CANCELLED = `${type}_CANCELLED`;

  return action$.pipe(
    ofType(type),
    mergeMap(async action => {
      const request = {};
    })
  );
}
