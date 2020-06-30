/** Method Chaining 방식을 이용한 Loading Reducer */
import { createAction, ActionType, createReducer } from 'typesafe-actions';

export const startLoading = createAction('loading/START_LOADING')<string>();
export const finishLoading = createAction('loading/FINISH_LOADING')<string>();

export type loading = {
  [key: string]: boolean;
};
type LoadingState = loading;
const initialState: LoadingState = {};

const actions = { startLoading, finishLoading };
type LoadingAction = ActionType<typeof actions>;

const loading = createReducer<LoadingState, LoadingAction>(initialState)
  .handleAction(startLoading, (state, action) => ({
    ...state,
    [action.payload]: true,
  }))
  .handleAction(finishLoading, (state, action) => ({
    ...state,
    [action.payload]: true,
  }));

export default loading;
