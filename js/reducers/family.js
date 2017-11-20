'use strict';
import * as TYPES from '../actions/types';

const initialState = {
    familys: [],
    members: [],
    myApply: [],
    toDealApply: [],
    status: null,
    message: null,
    time: null
};

export default function family(state = initialState, action) {
    let nextFamilys = state.familys.concat([]);
    let nextMembers = state.members.concat([]);
    let nextMyApply = state.myApply.concat([]);
    let nextToDealApply = state.toDealApply.concat([]);
    switch (action.type) {
        case TYPES.CLEAR_STATUS:
            return {
                ...state,
                status: null,
                message: null,
                time: null
            }
        case TYPES.INIT_OK:
            nextMyApply = action.payload.myApply;
            nextMyApply.sort(function(a,b){
                return b.createAt > a.createAt;
            });
            nextToDealApply = action.payload.toDealApply;
            nextToDealApply.sort(function(a,b){
                return b.createAt > a.createAt;
            });
            return {
                ...state,
                familys: action.payload.familys,
                members: action.payload.members,
                myApply: nextMyApply,
                toDealApply: nextToDealApply,
                status: action.type,
                message: '初始化成功',
                time: Date.now()
            };
        case TYPES.INIT_ERROR:
            return {
                ...state,
                status: action.type,
                message: action.message,
                time: Date.now()
            };
        case TYPES.CREATE_FAMILY_OK:
            nextFamilys.push(action.family);
            return {
                ...state,
                familys: nextFamilys,
                status: action.type,
                message: '创建家庭成功',
                time: Date.now()
            };
        case TYPES.CREATE_FAMILY_ERROR:
            return {
                ...state,
                status: action.type,
                message: action.message,
                time: Date.now()
            };
        case TYPES.UPDATE_FAMILY_OK:
            {
                let index = nextFamilys.findIndex((v) => {
                    return v._id == action.payload.id;
                });
                nextFamilys[index] = payload;
                return {
                    ...state,
                    familys: nextFamilys,
                    status: action.type,
                    message: '更新家庭信息成功',
                    time: Date.now()
                };
            }
        case TYPES.UPDATE_FAMILY_ERROR:
            return {
                ...state,
                status: action.type,
                message: action.message,
                time: Date.now()
            };
        case TYPES.GET_FAMILY_OK:
            return {
                ...state,
                familys: action.payload,
                status: action.type,
                message: '查询家庭信息成功',
                time: Date.now()
            };
        case TYPES.GET_FAMILY_ERROR:
            return {
                ...state,
                status: action.type,
                message: action.message,
                time: Date.now()
            };
        case TYPES.GET_FAMILY_AND_MEMBERS_OK:
            return {
                ...state,
                familys: action.payload.familys,
                members: action.payload.members,
                status: action.type,
                message: '查询家庭信息成功',
                time: Date.now()
            };
        case TYPES.GET_FAMILY_AND_MEMBERS_ERROR:
            return {
                ...state,
                status: action.type,
                message: action.message,
                time: Date.now()
            };
        case TYPES.GET_MEMBERS_OK:
            return {
                ...state,
                members: nextMembers.concat(action.payload),
                status: action.type,
                message: '查询家庭成员列表成功',
                time: Date.now()
            };
        case TYPES.GET_MEMBERS_ERROR:
            return {
                ...state,
                status: action.type,
                message: action.message,
                time: Date.now()
            };
        case TYPES.QUIT_FAMILY_OK:
            {
                let index = nextFamilys.findIndex((v) => {
                    return v._id == action.payload.id;
                });
                nextFamilys.splice(index, 1);
                nextMembers = nextMembers.filter((m) => {
                    return m.familyId != action.payload.id;
                });

                return {
                    ...state,
                    nextFamilys: nextFamilys,
                    members: nextMembers,
                    status: action.type,
                    message: '退出家庭成功',
                    time: Date.now()
                };
            }
        case TYPES.QUIT_FAMILY_ERROR:
            return {
                ...state,
                status: action.type,
                message: action.message,
                time: Date.now()
            };
        case TYPES.APPLY_JOIN_FAMILY_OK:
            nextMyApply.push(action.payload);
            return {
                ...state,
                myApply: nextMyApply,
                status: action.type,
                message: '提交申请成功',
                time: Date.now()
            };
        case TYPES.APPLY_JOIN_FAMILY_ERROR:
            return {
                ...state,
                status: action.type,
                message: action.message,
                time: Date.now()
            };
        case TYPES.GET_APPLY_JOIN_FAMILY_OK:
            return {
                ...state,
                myApply: action.payload,
                status: action.type,
                message: '提交申请成功',
                time: Date.now()
            };
        case TYPES.GET_APPLY_JOIN_FAMILY_ERROR:
            return {
                ...state,
                status: action.type,
                message: action.message,
                time: Date.now()
            };
        case TYPES.GET_USER_APPLY_JOIN_FAMILY_OK:
            return {
                ...state,
                toDealApply: action.payload,
                status: action.type,
                message: '提交申请成功',
                time: Date.now()
            };
        case TYPES.GET_USER_APPLY_JOIN_FAMILY_ERROR:
            return {
                ...state,
                status: action.type,
                message: action.message,
                time: Date.now()
            };
        case TYPES.DEAL_APPLY_JOIN_FAMILY_OK:
            {
                let index = nextToDealApply.findIndex(function (v) {
                    return v.familyId == action.payload.id;
                });
                nextToDealApply[index].dealStatus = action.payload.dealStatus;
                return {
                    ...state,
                    toDealApply: nextToDealApply,
                    status: action.type,
                    message: '提交申请成功',
                    time: Date.now()
                };
            }
        case TYPES.DEAL_APPLY_JOIN_FAMILY_ERROR:
            return {
                ...state,
                status: action.type,
                message: action.message,
                time: Date.now()
            };
        case TYPES.GET_MEMBER_TAGS_OK:
            {
                let index = nextMembers.findIndex(function (v) {
                    return v._id == action.payload._id;
                });
                nextMembers[index] = Object.assign(nextMembers[index], action.payload);
                return {
                    ...state,
                    members: nextMembers,
                    status: action.type,
                    message: action.message,
                    time: Date.now()
                };
            }
        case TYPES.GET_MEMBER_TAGS_ERROR:
            return {
                ...state,
                status: action.type,
                message: action.message,
                time: Date.now()
            };
        default:
            return state;
    }

}