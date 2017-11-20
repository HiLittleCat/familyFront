'use strict';

import * as TYPES from '../actions/types';

const initialState = {
	isLoggedIn: false,
	user: {},
	status: null,
	message: null,
	time: null
};

export default function user(state = initialState, action) {

	switch (action.type) {
		case TYPES.LOGGED_DOING:
			return {
				...state,
				status: 'doing'
			};
		case TYPES.LOGGED_IN:
			return {
				...state,
				isLoggedIn: true,
				user: action.user,
				status: action.type
			};
		case TYPES.LOGGED_OUT:
			return {
				...state,
				isLoggedIn: false,
				user: {},
				status: action.type,
				message: action.message
			};
		case TYPES.LOG_OUT_ERROR:
			return {
				...state,
				status: action.type,
				message: action.message
			};
		case TYPES.LOGGED_ERROR:
			return {
				...state,
				isLoggedIn: false,
				user: {},
				status: action.type,
				message: action.message,
				time: Date.now()
			};
		case TYPES.CLEAR_STATUS:
			return {
				...state,
				status: null,
				message: null
			}
		case TYPES.REGISTER_DOING:
			return {
				...state,
				status: 'doing'
			};
		case TYPES.UPDATE_USER_INFO_OK:
			let nextUser = Object.assign(state.user, action.payload);
			return {
				...state,
				user: nextUser,
				status: action.type,
				message: action.message
			};
		case TYPES.UPDATE_USER_INFO_ERROR:
			return {
				...state,
				status: action.type,
				message: action.message
			};
		case TYPES.REGISTER_OK:
			return {
				...state,
				isLoggedIn: false,
				user: {},
				status: action.type,
				message: action.message
			};
		case TYPES.REGISTER_ERROR:
			return {
				...state,
				isLoggedIn: false,
				user: {},
				status: action.type,
				message: action.message
			};
		default:
			return state;
	}

}