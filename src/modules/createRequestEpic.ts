import { Observable } from 'rxjs';
import { Action } from 'redux';
import { createAsyncAction } from 'typesafe-actions';
import { AsyncAction } from 'rxjs/internal/scheduler/AsyncAction';

export const createRequestActionTypes = (type: string): string[] => {
  const FULFILLED = `${type}_SUCCESS`;
  const REJECTED = `${type}_REJECTED`;
  const CANCELLED = `${type}_REJECTED`;
  return [type, FULFILLED, REJECTED, CANCELLED];
};

// export default function createRequestEpic(typeaction$: Observable<Action>) {
//   const FULFILLED = `${type}_SUCCESS`;
//   const REJECTED = `${type}_REJECTED`;
//   const CANCELLED = `${type}_REJECTED`;
// }
