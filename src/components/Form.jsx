import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Field, reduxForm } from 'redux-form';

const mapStateToProps = (state) => {
	return {
		text: state.text
	};
}

const actionsCreators = {
	updateText: actions.updateText,
	addTask: actions.addTask
}

class Form extends React.Component {
	// handleInputChange = (e) => {
	// 	const { updateText } = this.props;
	// 	updateText({ text: e.target.value });
	// }

	handleSubmit = (values) => {
		const { addTask, updateText, text, reset } = this.props;
		const task = {
			id: _.uniqueId(),
			state: 'active',
			...values
		};
		addTask(task);
		// updateText({ text: '' });
		reset();
	}

	render() {
		const { text } = this.props;
		return (
			<form className="mb-4" onSubmit={this.props.handleSubmit(this.handleSubmit)}>
				<div className="d-flex">
					<Field className="form-control mr-4" name="text" type="text" component="input" required={true} />
					{/*<input className="form-control mr-4" onChange={this.handleInputChange} type="text" value={ text }/>*/}
					<button className="btn btn-primary" type="submit">Добавить</button>
				</div>
			</form>
		)
	}
}

const connectedForm = connect(mapStateToProps, actionsCreators)(Form);

export default reduxForm({
	form: 'taskForm'
})(connectedForm);