import * as TYPES from './types';
import * as CFG from '../configs/config';


/**
 * 新建家庭
 * 
 * @export
 * @param {any} opt 
 * @returns 
 */
export function createFamily(opt) {
    return async (dispatch) => {
        try {
            let res = await fetch(`${CFG.DOMAIN}/family/${opt.id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'user-agent': opt.userId },
                body: JSON.stringify({ name: opt.name })
            });
            let resText = await res.text();
            let resJson = '';
            try {
                resJson = JSON.parse(resText);
            } catch (e) {
                resJson = { message: resText };
            }
            if (res.status == '200') {
                resJson.type = opt.type;
                dispatch({ 'type': TYPES.CREATE_FAMILY_OK, 'payload': resJson });
            } else {
                dispatch({ 'type': TYPES.CREATE_FAMILY_ERROR, 'message': resJson.message });
            }
        } catch (err) {
            dispatch({ 'type': TYPES.CREATE_FAMILY_ERROR, 'message': err.message });
        };
    }
}


/**
 * 修改家庭信息
 * 
 * @export
 * @param {any} opt 
 * @returns 
 */
export function updateFamily(opt) {
    return async (dispatch) => {
        try {
            let res = await fetch(`${CFG.DOMAIN}/family/${opt.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'user-agent': opt.userId },
                body: JSON.stringify({ name: opt.name })
            });
            let resText = await res.text();
            let resJson = '';
            try {
                resJson = JSON.parse(resText);
            } catch (e) {
                resJson = { message: resText };
            }
            if (res.status == '200') {
                resJson.type = opt.type;
                dispatch({ 'type': TYPES.UPDATE_FAMILY_OK, 'payload': resJson });
            } else {
                dispatch({ 'type': TYPES.UPDATE_FAMILY_ERROR, 'message': resJson.message });
            }
        } catch (err) {
            dispatch({ 'type': TYPES.UPDATE_FAMILY_ERROR, 'message': err.message });
        };
    }
}


/**
 * 获取家庭列表
 * 
 * @export
 * @param {any} opt 
 * @returns 
 */
export function getFamily(opt) {
    return async (dispatch) => {
        try {
            let res = await fetch(`${CFG.DOMAIN}/family/list`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'user-agent': opt.userId }
            });
            let resText = await res.text();
            let resJson = '';
            try {
                resJson = JSON.parse(resText);
            } catch (e) {
                resJson = { message: resText };
            }
            if (res.status == '200') {
                resJson.type = opt.type;
                dispatch({ 'type': TYPES.GET_FAMILY_OK, 'payload': resJson });
            } else {
                dispatch({ 'type': TYPES.GET_FAMILY_ERROR, 'message': resJson.message });
            }
        } catch (err) {
            dispatch({ 'type': TYPES.GET_FAMILY_ERROR, 'message': err.message });
        };
    }
}


/**
 * 家庭页面数据初始化
 * 
 * @export
 * @param {any} opt 
 * @returns 
 */
export function initFamilyData(opt) {
    return async (dispatch) => {
        try {
            let res = await fetch(`${CFG.DOMAIN}/family/init`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'user-agent': opt.userId }
            });
            let resText = await res.text();
            let resJson = '';
            try {
                resJson = JSON.parse(resText);
            } catch (e) {
                resJson = { message: resText };
            }
            if (res.status == '200') {
                resJson.type = opt.type;
                dispatch({ 'type': TYPES.INIT_OK, 'payload': resJson });
            } else {
                dispatch({ 'type': TYPES.INIT_ERROR, 'message': resJson.message });
            }
        } catch (err) {
            dispatch({ 'type': TYPES.INIT_ERROR, 'message': err.message });
        };
    }
}

/**
 * 获取家庭列表和家庭成员列表
 * 
 * @export
 * @param {any} opt 
 * @returns 
 */
export function getFamilyListAndMembers(opt) {
    return async (dispatch) => {
        try {
            let res = await fetch(`${CFG.DOMAIN}/family/listAndMembers`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'user-agent': opt.userId }
            });
            let resText = await res.text();
            let resJson = '';
            try {
                resJson = JSON.parse(resText);
            } catch (e) {
                resJson = { message: resText };
            }
            if (res.status == '200') {
                resJson.type = opt.type;
                dispatch({ 'type': TYPES.GET_FAMILY_AND_MEMBERS_OK, 'payload': resJson });
            } else {
                dispatch({ 'type': TYPES.GET_FAMILY_AND_MEMBERS_ERROR, 'message': resJson.message });
            }
        } catch (err) {
            dispatch({ 'type': TYPES.GET_FAMILY_AND_MEMBERS_ERROR, 'message': err.message });
        };
    }
}

/**
 * 获取单个家庭成员信息
 * 
 * @export
 * @param {any} opt 
 * @returns 
 */
export function getFamilyMembers(opt) {
    return async (dispatch) => {
        try {
            let res = await fetch(`${CFG.DOMAIN}/family/${opt.id}/members`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'user-agent': opt.userId }
            });
            let resText = await res.text();
            let resJson = '';
            try {
                resJson = JSON.parse(resText);
            } catch (e) {
                resJson = { message: resText };
            }
            if (res.status == '200') {
                resJson.type = opt.type;
                dispatch({ 'type': TYPES.GET_MEMBERS_OK, 'payload': resJson });
            } else {
                dispatch({ 'type': TYPES.GET_MEMBERS_ERROR, 'message': resJson.message });
            }
        } catch (err) {
            dispatch({ 'type': TYPES.GET_MEMBERS_ERROR, 'message': err.message });
        };
    }
}

/**
 * 加入家庭
 * 
 * @export
 * @param {any} opt
 * @returns 
 */
export function joinFamily(opt) {
    return async (dispatch) => {
        try {
            let res = await fetch(`${CFG.DOMAIN}/family/${opt.id}/join`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'user-agent': opt.userId },
                body: JSON.stringify({ name: opt.name })
            });
            let resText = await res.text();
            let resJson = '';
            try {
                resJson = JSON.parse(resText);
            } catch (e) {
                resJson = { message: resText };
            }
            if (res.status == '200') {
                resJson.type = opt.type;
                dispatch({ 'type': TYPES.JOIN_FAMILY_OK, 'payload': resJson });
            } else {
                dispatch({ 'type': TYPES.JOIN_FAMILY_ERROR, 'message': resJson.message });
            }
        } catch (err) {
            dispatch({ 'type': TYPES.JOIN_FAMILY_ERROR, 'message': err.message });
        };
    }
}


/**
 * 退出家庭
 * 
 * @export
 * @param {any} opt
 * @returns 
 */
export function quitFamily(opt) {
    return async (dispatch) => {
        try {
            let res = await fetch(`${CFG.DOMAIN}/family/${opt.id}/quit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'user-agent': opt.userId },
            });
            let resText = await res.text();
            let resJson = '';
            try {
                resJson = JSON.parse(resText);
            } catch (e) {
                resJson = { message: resText };
            }
            if (res.status == '200') {
                resJson.type = opt.type;
                dispatch({ 'type': TYPES.QUIT_FAMILY_OK, 'payload': resJson });
            } else {
                dispatch({ 'type': TYPES.QUIT_FAMILY_ERROR, 'message': resJson.message });
            }
        } catch (err) {
            dispatch({ 'type': TYPES.QUIT_FAMILY_ERROR, 'message': err.message });
        };
    }
}


/**
 * 申请加入家庭
 * 
 * @export
 * @param {any} opt
 * @returns 
 */
export function applyJoinFamily(opt) {
    return async (dispatch) => {
        try {
            let res = await fetch(`${CFG.DOMAIN}/family/${opt.id}/applyJoinFamily`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'user-agent': opt.userId },
                body: JSON.stringify({ message: opt.message })
            });
            let resText = await res.text();
            let resJson = '';
            try {
                resJson = JSON.parse(resText);
            } catch (e) {
                resJson = { message: resText };
            }
            if (res.status == '200') {
                resJson.type = opt.type;
                dispatch({ 'type': TYPES.APPLY_JOIN_FAMILY_OK, 'payload': resJson });
            } else {
                dispatch({ 'type': TYPES.APPLY_JOIN_FAMILY_ERROR, 'message': resJson.message });
            }
        } catch (err) {
            dispatch({ 'type': TYPES.APPLY_JOIN_FAMILY_ERROR, 'message': err.message });
        };
    }
}


/**
 * 查询我加入家庭的请求
 * 
 * @export
 * @param {any} opt
 * @returns 
 */
export function getApplyJoinFamily(opt) {
    return async (dispatch) => {
        try {
            let res = await fetch(`${CFG.DOMAIN}/family/${opt.id}/getApplyJoinFamily`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'user-agent': opt.userId },
            });
            let resText = await res.text();
            let resJson = '';
            try {
                resJson = JSON.parse(resText);
            } catch (e) {
                resJson = { message: resText };
            }
            if (res.status == '200') {
                resJson.type = opt.type;
                dispatch({ 'type': TYPES.GET_APPLY_JOIN_FAMILY_OK, 'payload': resJson });
            } else {
                dispatch({ 'type': TYPES.GET_APPLY_JOIN_FAMILY_ERROR, 'message': resJson.message });
            }
        } catch (err) {
            dispatch({ 'type': TYPES.GET_APPLY_JOIN_FAMILY_ERROR, 'message': err.message });
        };
    }
}


/**
 * 查询所有加入自己家庭的请求
 * 
 * @export
 * @param {any} opt
 * @returns 
 */
export function getUserApplyJoinFamily(opt) {
    return async (dispatch) => {
        try {
            let res = await fetch(`${CFG.DOMAIN}/family/${opt.id}/getUserApplyJoinFamily`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'user-agent': opt.userId },
            });
            let resText = await res.text();
            let resJson = '';
            try {
                resJson = JSON.parse(resText);
            } catch (e) {
                resJson = { message: resText };
            }
            if (res.status == '200') {
                resJson.type = opt.type;
                dispatch({ 'type': TYPES.GET_USER_APPLY_JOIN_FAMILY_OK, 'payload': resJson });
            } else {
                dispatch({ 'type': TYPES.GET_USER_APPLY_JOIN_FAMILY_ERROR, 'message': resJson.message });
            }
        } catch (err) {
            dispatch({ 'type': TYPES.GET_USER_APPLY_JOIN_FAMILY_ERROR, 'message': err.message });
        };
    }
}


/**
 * 处理加入自己家庭的请求
 * 
 * @export
 * @param {any} opt
 * @returns 
 */
export function dealApplyJoinFamily(opt) {
    return async (dispatch) => {
        try {
            let res = await fetch(`${CFG.DOMAIN}/family/${opt.id}/dealApplyJoinFamily`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'user-agent': opt.userId },
                body: JSON.stringify({ applyUserId: opt.applyUserId, dealStatus: opt.dealStatus })
            });
            let resText = await res.text();
            let resJson = '';
            try {
                resJson = JSON.parse(resText);
            } catch (e) {
                resJson = { message: resText };
            }
            if (res.status == '200') {
                resJson.type = opt.type;
                dispatch({ 'type': TYPES.DEAL_APPLY_JOIN_FAMILY_OK, 'payload': opt });
            } else {
                dispatch({ 'type': TYPES.DEAL_APPLY_JOIN_FAMILY_ERROR, 'message': resJson.message });
            }
        } catch (err) {
            dispatch({ 'type': TYPES.DEAL_APPLY_JOIN_FAMILY_ERROR, 'message': err.message });
        };
    }
}

/**
 * 查看家庭成员标签
 * 
 * @export
 * @param {any} opt 
 * @returns 
 */
export function getMemberInfo(opt) {
    return async (dispatch) => {
        try {
            let res = await fetch(`${CFG.DOMAIN}/family/member/${opt.memberId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'user-agent': opt.userId }
            });
            let resText = await res.text();
            let resJson = '';
            try {
                resJson = JSON.parse(resText);
            } catch (e) {
                resJson = { message: resText };
            }
            if (res.status == '200') {
                resJson.type = opt.type;
                dispatch({ 'type': TYPES.GET_MEMBER_TAGS_OK, 'payload': resJson });
            } else {
                dispatch({ 'type': TYPES.GET_MEMBER_TAGS_ERROR, 'message': resJson.message });
            }
        } catch (err) {
            dispatch({ 'type': TYPES.GET_MEMBER_TAGS_ERROR, 'status': 'error', 'message': err.message });
        };
    }
}