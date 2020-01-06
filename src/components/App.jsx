import React from 'react';

import Form from './Form';
import Tasks from './Tasks';
import Filter from './Filter';

const App = () => {
	return (
		<div className="col-4">
			<Form />
			<Filter />
			<Tasks />
		</div>
	)
}

export default App;