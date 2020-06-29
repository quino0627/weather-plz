/* Ducks Modular Redux Pattern을 이용한  */
import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import styles from './styles';

export const rootEpic = combineEpics();
export const rootReducer = combineReducers({ styles });

export type RootState = ReturnType<typeof rootReducer>;
