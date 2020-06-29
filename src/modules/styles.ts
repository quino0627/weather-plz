import { createAction, ActionType, createReducer } from 'typesafe-actions';

/** Action Types */
const TOGGLE_THEME = 'styles/TOGGLE_THEME';
const CHANGE_THEME = 'styles/CHANGE_THEME';
/** Action Create Function */
export const toggleTheme = createAction(TOGGLE_THEME)();
export const changeTheme = createAction(CHANGE_THEME)<string>();
/** Type */
export type Theme = {
  theme: string;
};
type StylesState = Theme;

/** InitialState */
const initialState: StylesState = {
  theme: 'light',
};

/** Typescript Type of Actions */
const actions = { toggleTheme, changeTheme };
type StylesAction = ActionType<typeof actions>;

/** Reducer */
const styles = createReducer<StylesState, StylesAction>(initialState, {
  [TOGGLE_THEME]: state => {
    return { ...state, theme: `${state.theme === 'light' ? 'dark' : 'light'}` };
  },
  [CHANGE_THEME]: (state, { payload: type }) => {
    return { ...state, theme: type };
  },
});

export default styles;
