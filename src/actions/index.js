import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPostsAndUsers = () => {
    return async function (dispatch, getState) {
        await dispatch(fetchPosts());
        const userIds = _.uniq(_.map(getState().posts, 'userId'));
        userIds.forEach(id => dispatch(fetchUser(id)));
    }
}

export const fetchPosts = () => {
    return async function (dispatch, getState) {
        const response = await jsonPlaceholder.get('/posts');

        dispatch({ type: 'FETCH_POSTS', payload: response.data });
    }
};

export const fetchUser = (id) => {
    return async function (dispatch) {
        const response = await jsonPlaceholder.get(`/users/${id}`);

        dispatch({ type: 'FETCH_USER', payload: response.data });
    }
}

// export const fetchUser = (id) => {
//     return function (dispatch) {
//         _fetchUSer(id, dispatch);
//     }
// };

// const _fetchUSer = _.memoize(async (id, dispatch) => {
//     const response = await jsonPlaceholder.get(`/users/${id}`);
//     dispatch({ type: 'FETCH_USER', payload: response.data });
// });