import React from 'react';
import PostList from './PostList';

const App = () => {
	return (
		<div className="ui container">
			<div className="ui row">
				<div className="column eight wide">
					<PostList />
				</div>
			</div>
		</div>
	);
};

export default App;
