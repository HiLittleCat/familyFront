import * as TYPES from './types';
import * as CFG from '../configs/config';

/**
 * 获取对我的提醒
 * 
 * @export
 * @param {any} opt 
 * @returns 
 */
export function getRemindsToMe(opt) {
    return async (dispatch) => {
        try {
            let res = await fetch(`${CFG.DOMAIN}/remind/`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'user-agent': opt.userId }
            });
            let resText = await res.text();
            let resJson = '';
            try{
                resJson = JSON.parse(resText);
            }catch(e){
                resJson = { message: resText };
            }
            if (res.status == '200') {
                resJson.type = opt.type;
                dispatch({ 'type': TYPES.GET_REMIND_TOME_OK, 'payload': resJson });
            } else {
                dispatch({ 'type': TYPES.GET_REMIND_TOME_ERROR, 'message': resJson.message });
            }
        } catch (err) {
            dispatch({ 'type': TYPES.GET_REMIND_TOME_ERROR, 'status': 'error', 'message': err.message });
        };
    }
}

/**
 * 获取我对家人的提醒
 * 
 * @export
 * @param {any} opt 
 * @returns 
 */
export function getRemindsICreate(opt) {
    return async (dispatch) => {
        try {
            let res = await fetch(`${CFG.DOMAIN}/remind/icreate`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'user-agent': opt.userId }
            });
            let resText = await res.text();
            let resJson = '';
            try{
                resJson = JSON.parse(resText);
            }catch(e){
                resJson = { message: resText };
            }
            if (res.status == '200') {
                resJson.type = opt.type;
                dispatch({ 'type': TYPES.GET_REMIND_ICREATE_OK, 'payload': resJson });
            } else {
                dispatch({ 'type': TYPES.GET_REMIND_ICREATE_ERROR, 'message': resJson.message });
            }
        } catch (err) {
            dispatch({ 'type': TYPES.GET_REMIND_ICREATE_ERROR, 'status': 'error', 'message': err.message });
        };
    }
}

/**
 * 创建提醒
 * 
 * @export
 * @param {any} opt 
 * @returns 
 */
export function createRemind(opt) {
    return async (dispatch) => {
        try {
            let res = await fetch(`${CFG.DOMAIN}/remind/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'user-agent': opt.userId },
                body: JSON.stringify({ toUserId: opt.toUserId, familyId: opt.familyId, message: opt.message, completeDate: opt.completeDate })
            });
            let resText = await res.text();
            let resJson = '';
            try{
                resJson = JSON.parse(resText);
            }catch(e){
                resJson = { message: resText };
            }
            if (res.status == '200') {
                resJson.type = opt.type;
                dispatch({ 'type': TYPES.CREATE_REMIND_OK, 'payload': resJson });
            } else {
                dispatch({ 'type': TYPES.CREATE_REMIND_ERROR, 'message': resJson.message });
            }
        } catch (err) {
            dispatch({ 'type': TYPES.CREATE_REMIND_ERROR, 'status': 'error', 'message': err.message });
        };
    }
}

/**
 * 修改提醒内容
 * 
 * @export
 * @param {any} opt 
 * @returns 
 */
export function updateRemind(opt) {
    return async (dispatch) => {
        try {
            let res = await fetch(`${CFG.DOMAIN}/remind/${opt.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'user-agent': opt.userId },
                body: JSON.stringify({ toUserId: opt.toUserId, message: opt.message, completeDate: opt.completeDate })
            });
            let resText = await res.text();
            let resJson = '';
            try{
                resJson = JSON.parse(resText);
            }catch(e){
                resJson = { message: resText };
            }
            if (res.status == '200') {
                dispatch({ 'type': TYPES.UPDATE_REMIND_MESSAGE_OK, 'payload': opt });
            } else {
                dispatch({ 'type': TYPES.UPDATE_REMIND_MESSAGE_ERROR, 'message': resJson.message });
            }
        } catch (err) {
            dispatch({ 'type': TYPES.UPDATE_REMIND_MESSAGE_ERROR, 'status': 'error', 'message': err.message });
        };
    }
}


/**
 * 处理提醒事项
 * 
 * @export
 * @param {any} opt 
 * @returns 
 */
export function dealRemind(opt) {
    return async (dispatch) => {
        try {
            let res = await fetch(`${CFG.DOMAIN}/remind/${opt.id}/deal`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'user-agent': opt.userId },
                body: JSON.stringify({ dealStatus: opt.dealStatus })
            });
            let resText = await res.text();
            let resJson = '';
            try{
                resJson = JSON.parse(resText);
            }catch(e){
                resJson = { message: resText };
            }
            if (res.status == '200') {
                dispatch({ 'type': TYPES.DEAL_REMIND_OK, 'payload': opt });
            } else {
                dispatch({ 'type': TYPES.DEAL_REMIND_ERROR, 'message': resJson.message });
            }
        } catch (err) {
            dispatch({ 'type': TYPES.DEAL_REMIND_ERROR, 'status': 'error', 'message': err.message });
        };
    }
}


/**
 * 删除提醒事项
 * 
 * @export
 * @param {any} opt 
 * @returns 
 */
export function removeRemind(opt) {
    return async (dispatch) => {
        try {
            let res = await fetch(`${CFG.DOMAIN}/remind/${opt.id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', 'user-agent': opt.userId }
            });
            let resText = await res.text();
            let resJson = '';
            try{
                resJson = JSON.parse(resText);
            }catch(e){
                resJson = { message: resText };
            }
            if (res.status == '200') {
                dispatch({ 'type': TYPES.REMOVE_REMIND_OK, 'payload': opt });
            } else {
                dispatch({ 'type': TYPES.REMOVE_REMIND_ERROR, 'message': resJson.message });
            }
        } catch (err) {
            dispatch({ 'type': TYPES.REMOVE_REMIND_ERROR, 'status': 'error', 'message': err.message });
        };
    }
}