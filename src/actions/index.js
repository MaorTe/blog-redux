import jsonPlaceholder from '../apis/jsonPlaceholder';
import _ from 'lodash';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
	await dispatch(fetchPosts());

	const userIds = _.uniq(_.map(getState().posts, 'userId'));
	userIds.forEach((id) => dispatch(fetchUser(id)));

	// alternative syntax for line 7 and 8, value is what executing them
	// _.chain(getState().posts)
	// 	.map('userId')
	// 	.uniq()
	// 	.forEach((id) => dispatch(fetchUser(id)))
	// 	.value();
};

export const fetchPosts = () => async (dispatch) => {
	const response = await jsonPlaceholder.get('/posts');
	dispatch({
		type: 'FETCH_POSTS',
		payload: response.data,
	});
};

const fetchUser = (id) => async (dispatch) => {
	const response = await jsonPlaceholder.get(`/users/${id}`);
	dispatch({
		type: 'FETCH_USER',
		payload: response.data,
	});
};

//memoized version, this solution works but what if we want to call a user more than one time?
// export const fetchUser = (id) => async (dispatch) => {
// 	_fetchUser(id, dispatch);
// };

// const _fetchUser = _.memoize(async (id, dispatch) => {
// 	const response = await jsonPlaceholder.get(`/users/${id}`);
// 	dispatch({
// 		type: 'FETCH_USER',
// 		payload: response.data,
// 	});
// });

// export { fetchPosts, fetchUser, fetchPostsAndUsers };
