import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import * as actions from '../actions';

const mapStateToProps = (state) => {
	const { tasks: { byId, allIds, currentFilterName }, tasksUIState } = state;
	const taskstoArray = allIds.map(t => byId[t]);
	const tasks = currentFilterName === 'all' ? taskstoArray : taskstoArray.filter(t => t.state === currentFilterName);
	return { tasks, tasksUIState };
}

const actionCreators = {
	removeTask: actions.removeTask,
	toggleTaskState: actions.toggleTaskState,
	toggleTaskTheme: actions.toggleTaskTheme
}

class Tasks extends React.Component {
	toggleState = (id) => () => {
		const { toggleTaskState } = this.props;
		toggleTaskState({ id });
	}

	removeTask = (id) => () => {
		const { removeTask } = this.props;
		removeTask({ id });
	}

	toggleTheme = (task) => () => {
		const { toggleTaskTheme } = this.props;
		toggleTaskTheme({ task });
	}

	renderTask = (task) => {
		const { tasksUIState } = this.props;
		const classes = cn({
			'list-group-item d-flex': true, 
			'list-group-item-dark': tasksUIState[task.id] === 'dark'
		});
		return (
			<li key={task.id} className={classes}>
				<span>
					<button 
						onClick={this.toggleState(task.id)} 
						type="button" 
						className="btn btn-link p-0 text-decoration-none"
					> 
						{task.state === 'active' ? task.text : <s>{ task.text }</s>} 
					</button>
				</span>
				<button 
					onClick={this.toggleTheme(task)} 
					type="button" 
					className="btn btn-link p-0 text-decoration-none ml-auto mr-2"
				>
					theme
				</button>
				<button onClick={this.removeTask(task.id)} type="button" className="ml-2 mb-1 close">
					<span aria-hidden="true">&times;</span>
				</button>
			</li>
		)
	}

	render () {
		const { tasks } = this.props;

		if (tasks.length === 0) {
			return null;
		}

		return (
			<ul className="list-group">
				{tasks.map(this.renderTask)}
			</ul>
		)
	}
}

export default connect(mapStateToProps, actionCreators)(Tasks);