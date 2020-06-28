/* Ducks Modular Redux Pattern을 이용한  */
import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';

export const rootEpic = combineEpics();
export const rootReducer = combineReducers({});

export type RootState = ReturnType<typeof rootReducer>;
