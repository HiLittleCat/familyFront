import * as TYPES from './types';
import * as CFG from '../configs/config';

/**
 * 修改用户标签
 * 
 * @export
 * @param {any} opt 
 * @returns 
 */
export function getAllTags(opt) {
    return async (dispatch) => {
        try {
            let res = await fetch(`${CFG.DOMAIN}/tag`, {
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
                dispatch({ 'type': TYPES.GET_TAGS_OK, 'tags': resJson });
            } else {
                dispatch({ 'type': TYPES.GET_TAGS_ERROR, 'message': resJson.message });
            }
        } catch (err) {
            dispatch({ 'type': TYPES.GET_TAGS_ERROR, 'status': 'error', 'message': err.message });
        };
    }
}

/**
 * 新建用户标签
 * 
 * @export
 * @param {any} opt 
 * @returns 
 */
export function createUserTag(opt) {
    return async (dispatch) => {
        try {
            let res = await fetch(`${CFG.DOMAIN}/tag/${opt.type}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'user-agent': opt.userId },
                body: JSON.stringify({ name: opt.name, 'content': opt.content, 'visibility': opt.visibility })
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
                dispatch({ 'type': TYPES.CREATE_TAG_OK, 'tag': resJson });
            } else {
                dispatch({ 'type': TYPES.CREATE_TAG_ERROR, 'message': resJson.message });
            }
        } catch (err) {
            dispatch({ 'type': TYPES.CREATE_TAG_ERROR, 'message': err.message });
        };
    }
}

/**
 * 修改用户标签
 * 
 * @export
 * @param {any} opt 
 * @returns 
 */
export function updateUserTag(opt) {
    return async (dispatch) => {
        try {
            let res = await fetch(`${CFG.DOMAIN}/tag/${opt.type}/${opt.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'user-agent': opt.userId },
                body: JSON.stringify({ 'content': opt.content, 'visibility': opt.visibility })
            });
            let resText = await res.text();
            let resJson = '';
            try{
                resJson = JSON.parse(resText);
            }catch(e){
                resJson = { message: resText };
            }
            if (res.status == '200') {
                dispatch({ 'type': TYPES.UPDATE_TAG_OK, 'tag': opt });
            } else {
                dispatch({ 'type': TYPES.UPDATE_TAG_ERROR, 'message': resJson.message });
            }
        } catch (err) {
            dispatch({ 'type': TYPES.UPDATE_TAG_ERROR, 'message': err.message });
        };
    }
}

/**
 * 删除用户标签
 * 
 * @export
 * @param {any} opt 
 * @returns 
 */
export function removeUserTag(opt) {
    return async (dispatch) => {
        try {
            let res = await fetch(`${CFG.DOMAIN}/tag/${opt.type}/${opt.id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', 'user-agent': opt.userId },
            });
            let resText = await res.text();
            let resJson = '';
            try{
                resJson = JSON.parse(resText);
            }catch(e){
                resJson = { message: resText };
            }
            if (res.status == '200') {
                dispatch({ 'type': TYPES.DELETE_TAG_OK, 'tag': opt });
            } else {
                dispatch({ 'type': TYPES.DELETE_TAG_ERROR, 'message': resJson.message });
            }
        } catch (err) {
            dispatch({ 'type': TYPES.DELETE_TAG_ERROR, 'message': err.message });
        };
    }
}

export function clearStatus() {
    return { 'type': TYPES.CLEAR_STATUS };
}