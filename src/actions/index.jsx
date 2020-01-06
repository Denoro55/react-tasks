import { createAction } from 'redux-actions';

// inputs
export const updateText = createAction('TEXT_UPDATE');

// tasks
export const addTask = createAction('TASK_ADD');
export const removeTask = createAction('TASK_REMOVE');
export const toggleTaskState = createAction('TASK_TOGGLE_STATE');
export const setFilterName = createAction('TASK_SET_FILTER_NAME');

// ui
export const toggleTaskTheme = createAction('TASK_TOGGLE_THEME');