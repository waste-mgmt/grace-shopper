import axios from 'axios';
import store from '../store'

const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER'

export const gettingCurrentUser = currentUser => {
	type: RECEIVE_CURRENT_USER,
	currentUser
}

const initialCurrentUser = {}

export default function (state = initialCurrentUser, action) {
	switch(action.type) {

		case RECEIVE_CURRENT_USER:
			return action.currentUser
			break

		default:
			return state;
	}
}

export const currentUserInfo = userId => {
	return dispatch => {
		return axios.get(`/api/users/${userId}`)
			.then(res => {
				dispatch(gettingCurrentUser(res.data))
			})
	}
}

export const onUser = nextRouterState => {
	const userId = nextRouterState.params.userId
	return axios.get(`/api/users/${userId}`)
			.then(res => {
				dispatch(gettingCurrentUser(res.data))
	})
}