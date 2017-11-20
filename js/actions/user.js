import * as TYPES from './types';
import * as CFG from '../configs/config';
/**
 * 登录
 * 
 * @export
 * @param {any} opt 
 * @returns 
 */
export function logIn(opt) {
	return async (dispatch) => {
		//dispatch({ 'type': TYPES.LOGGED_DOING });
		try {
			let res = await fetch(`${CFG.DOMAIN}/user/login/`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ 'mobile': opt.name, 'password': opt.password })
			});

			let resJson = await res.json();
			if (res.status == '200') {
				let user = {};
				let tags = {};
				let keys = Object.keys(resJson);
				let tagType = ['clothes', 'food', 'housing', 'moving', 'health', 'entertainment', 'education', 'else'];
				keys.forEach(function (v) {
					if (tagType.indexOf(v) > -1) {
						tags[v] = resJson[v];
					} else {
						user[v] = resJson[v];
					}
				});
				dispatch({ 'type': TYPES.LOGGED_IN, 'user': user });
				//dispatch({ 'type': TYPES.GET_TAGS_OK, 'tags': tags });
			} else {
				dispatch({ 'type': TYPES.LOGGED_ERROR, 'message': resJson.message });
			}
		} catch (err) {
			dispatch({ 'type': TYPES.LOGGED_ERROR, 'message': err.message });
		};
	}
}

/**
 * 退出登录
 * 
 * @export
 * @param {any} opt 
 * @returns 
 */
export function logOut(opt) {
	return async (dispatch) => {
		try {
			if (opt.id == null) {
				dispatch({ 'type': TYPES.LOGGED_OUT, 'status': 'done' });
				return;
			}
			let res = await fetch(`${CFG.DOMAIN}/user/logout/`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', 'user-agent': opt.id }
			});
			let resJson = await res.json();
			if (res.status == '200') {
				dispatch({ 'type': TYPES.LOGGED_OUT });
			} else {
				dispatch({ 'type': TYPES.LOG_OUT_ERROR, 'message': resJson.message });
			}
		} catch (err) {
			dispatch({ 'type': TYPES.LOG_OUT_ERROR, 'message': err.message });
		};
	}
}

export function doRegister(opt) {
	return async (dispatch) => {
		//dispatch({ 'type': TYPES.REGISTER_DOING });
		try {
			let res = await fetch(CFG.DOMAIN + '/user/sign', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ 'mobile': opt.name, name: opt.nickname, 'password': opt.password })
			});
			let resJson = await res.json();
			if (res.status == '200') {
				dispatch({ 'type': TYPES.REGISTER_OK, 'user': resJson });
			} else {
				dispatch({ 'type': TYPES.REGISTER_ERROR, 'message': resJson.message });
			}
		} catch (err) {
			dispatch({ 'type': TYPES.REGISTER_ERROR, 'status': 'error', 'message': err.message });
		};
	}
}

export function updateUserInfo(opt) {
	return async (dispatch) => {
		//dispatch({ 'type': TYPES.REGISTER_DOING });
		try {
			let res = await fetch(CFG.DOMAIN + '/user/', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json', 'user-agent': opt.userId },
				body: JSON.stringify({ 'name': opt.name, 'logo': opt.logo })
			});
			let resJson = await res.json();
			if (res.status == '200') {
				dispatch({ 'type': TYPES.UPDATE_USER_INFO_OK, 'payload': resJson });
			} else {
				dispatch({ 'type': TYPES.UPDATE_USER_INFO_ERROR, 'message': resJson.message });
			}
		} catch (err) {
			dispatch({ 'type': TYPES.UPDATE_USER_INFO_ERROR, 'status': 'error', 'message': err.message });
		};
	}
}

export function clearStatus() {
	return { 'type': TYPES.CLEAR_STATUS };
}

export function registerClear() {
	return { 'type': TYPES.REGISTER_CLEAR };
}