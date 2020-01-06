import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions} from 'redux-actions';
import * as actions from '../actions';
import { reducer as formReducer } from 'redux-form';

const tasks = handleActions({
	[actions.addTask](state, { payload: task }) {
		const { byId, allIds } = state;
		return {
			...state,
			byId: { [task.id]: task, ...byId },
			allIds: [ task.id, ...allIds ]
		}
	},
	[actions.removeTask](state, { payload: { id } }) {
		const { byId, allIds } = state;
		return {
			...state,
			byId: _.omit(byId, id),
			allIds: _.without(allIds, id)
		}
	},
	[actions.toggleTaskState](state, { payload: { id } }) {
		const task = state.byId[id];
		const newState = task.state === 'active' ? 'finished' : 'active';
		const newTask = { ...task, state: newState };
		return {
			...state,
			byId: { ...state.byId, [task.id]: newTask }
		}
	},
	[actions.setFilterName](state, { payload: { name } }) {
		return {
			...state,
			currentFilterName: name
		}
	},
}, { byId: {}, allIds: [], currentFilterName: 'all'} );

const tasksUIState = handleActions({
	[actions.addTask](state, { payload: task }) {
		return { [task.id]: 'light', ...state}
	},
	[actions.removeTask](state, { payload: { id } }) {
		return _.omit(state, id);
	},
	[actions.toggleTaskTheme](state, { payload: { task } }) {
		const newTheme = state[task.id] === 'light' ? 'dark' : 'light';
		return { ...state, [task.id]: newTheme}
	},
}, {})

const text = handleActions({
	[actions.updateText](state, { payload: { text } }) {
		return text;
	}
}, '');

export default combineReducers({
	tasks,
	tasksUIState,
	text,
	form: formReducer
});

