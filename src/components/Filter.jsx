import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const filters = [['all', 'All States'], ['active', 'Active States'], ['finished', 'Finished States']];

const mapStateToProps = (state) => {
	return {
		currentFilterName: state.tasks.currentFilterName
	};
}

const actionCreators = {
	setFilterName: actions.setFilterName
}

class Filter extends React.Component {
	handleSetFilter = (name) => () => {
		const { setFilterName } = this.props;
		setFilterName({ name })
	}

	renderFilter = (f, idx) => {
		const { currentFilterName } = this.props;
		if (currentFilterName === f[0]) {
			return f[1];
		}
		return (
			<button onClick={this.handleSetFilter(f[0])} type="button" className="btn btn-link border-0 p-0">
				{ f[1] }
			</button>
		)
	}

	render () {
		return (
			<div className="filters d-flex justify-content-around mb-4">
				{ filters.map(this.renderFilter) }
			</div>
		)
	}
}

export default connect(mapStateToProps, actionCreators)(Filter);