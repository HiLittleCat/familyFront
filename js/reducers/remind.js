'use strict';
import * as TYPES from '../actions/types';

const initialState = {
    remindsToMe: [],
    remindsToMeCompleted: [],
    remindsICreate: [],
    remindsICreateCompleted: []
};

export default function remind(state = initialState, action) {
    let nextRemindsToMe = state.remindsToMe.concat([]);
    let nextRemindsICreate = state.remindsICreate.concat([]);
    let nextRemindsToMeCompleted = state.remindsToMeCompleted.concat([]);
    let nextRemindsICreateCompleted = state.remindsICreateCompleted.concat([]);
    switch (action.type) {
        case TYPES.CLEAR_STATUS:
            return {
                ...state,
                status: null,
                message: null,
                time: null
            }
        case TYPES.GET_REMIND_TOME_OK:
            nextRemindsToMe = action.payload.filter((v) => {
                return v.dealStatus == 1;
            });
            nextRemindsToMeCompleted = action.payload.filter((v) => {
                return v.dealStatus == 2;
            });
            nextRemindsToMe.sort((a, b) => {
                return b.completeDate > a.completeDate;
            });
            nextRemindsToMeCompleted.sort((a, b) => {
                return b.completeDate > a.completeDate;
            });
            return {
                ...state,
                remindsToMe: nextRemindsToMe,
                remindsToMeCompleted: nextRemindsToMeCompleted,
                status: action.type,
                message: '获取数据成功',
                time: Date.now()
            };
        case TYPES.GET_REMIND_TOME_ERROR:
            return {
                ...state,
                status: action.type,
                message: action.message,
                time: Date.now()
            };
        case TYPES.GET_REMIND_ICREATE_OK:
            nextRemindsICreate = action.payload.filter((v) => {
                return v.dealStatus == 1;
            });
            nextRemindsICreateCompleted = action.payload.filter((v) => {
                return v.dealStatus == 2;
            });
            nextRemindsICreate.sort((a, b) => {
                return b.completeDate > a.completeDate;
            });
            nextRemindsICreateCompleted.sort((a, b) => {
                return b.completeDate > a.completeDate;
            });
            return {
                ...state,
                remindsICreate: nextRemindsICreate,
                remindsICreateCompleted: nextRemindsICreateCompleted,
                status: action.type,
                message: '获取数据成功',
                time: Date.now()
            };
        case TYPES.GET_REMIND_ICREATE_ERROR:
            return {
                ...state,
                status: action.type,
                message: action.message,
                time: Date.now()
            };
        case TYPES.CREATE_REMIND_OK:
            nextRemindsICreate.push(action.payload);
            nextRemindsICreate.sort((a, b) => {
                return b.completeDate > a.completeDate;
            });
            if (action.payload.userId == action.payload.toUserId) {
                nextRemindsToMe.push(action.payload);
            }
            return {
                ...state,
                remindsToMe: nextRemindsToMe,
                remindsICreate: nextRemindsICreate,
                status: action.type,
                message: '创建成功',
                time: Date.now()
            };
        case TYPES.CREATE_REMIND_ERROR:
            return {
                ...state,
                status: action.type,
                message: action.message,
                time: Date.now()
            };
        case TYPES.UPDATE_REMIND_MESSAGE_OK:
            {
                let index = nextRemindsICreate.findIndex((v) => {
                    return v._id == action.payload.id
                });
                nextRemindsICreate[index].message = action.payload.message;
                nextRemindsICreate[index].completeDate = action.payload.completeDate;
                nextRemindsICreate.sort((a, b) => {
                    return b.completeDate > a.completeDate;
                });
                if (action.payload.userId == action.payload.toUserId) {
                    if (action.payload.dealStatus == 1) {
                        let index = nextRemindsToMe.findIndex((v) => {
                            return v._id == action.payload.id
                        });
                        nextRemindsToMe[index].message = action.payload.message;
                        nextRemindsToMe[index].completeDate = action.payload.completeDate;
                        nextRemindsToMe.sort((a, b) => {
                            return b.completeDate > a.completeDate;
                        });
                    } else {
                        let index = nextRemindsToMeCompleted.findIndex((v) => {
                            return v._id == action.payload.id
                        });
                        nextRemindsToMeCompleted[index].message = action.payload.message;
                        nextRemindsToMeCompleted[index].completeDate = action.payload.completeDate;
                        nextRemindsToMeCompleted.sort((a, b) => {
                            return b.completeDate > a.completeDate;
                        });
                    }
                }
                return {
                    ...state,
                    remindsToMe: nextRemindsToMe,
                    remindsToMeCompleted: nextRemindsToMeCompleted,
                    remindsICreate: nextRemindsICreate,
                    status: action.type,
                    message: '更新成功',
                    time: Date.now()
                };
            }
        case TYPES.UPDATE_REMIND_MESSAGE_ERROR:
            return {
                ...state,
                status: action.type,
                message: action.message,
                time: Date.now()
            };
        case TYPES.DEAL_REMIND_OK:
            {
                if (action.payload.dealStatus == 2) {
                    let index = nextRemindsToMe.findIndex((v) => {
                        return v._id == action.payload.id
                    });
                    nextRemindsToMe[index].dealStatus = 2;
                    let remind = nextRemindsToMe.splice(index, 1);
                    nextRemindsToMeCompleted = nextRemindsToMeCompleted.concat(remind);
                } else {
                    let index = nextRemindsToMeCompleted.findIndex((v) => {
                        return v._id == action.payload.id
                    });
                    nextRemindsToMeCompleted[index].dealStatus = 1;
                    let remind = nextRemindsToMeCompleted.splice(index, 1);
                    nextRemindsToMe = nextRemindsToMe.concat(remind);
                }
                return {
                    ...state,
                    remindsToMe: nextRemindsToMe,
                    remindsToMeCompleted: nextRemindsToMeCompleted,
                    status: action.type,
                    message: '更新成功',
                    time: Date.now()
                };
            }
        case TYPES.DEAL_REMIND_ERROR:
            return {
                ...state,
                status: action.type,
                message: action.message,
                time: Date.now()
            };
        case TYPES.REMOVE_REMIND_OK:
            {
                let status = action.payload.dealStatus;
                if (status == 1) {
                    let index = nextRemindsICreate.findIndex((v) => {
                        return v._id == action.payload.id;
                    });
                    nextRemindsICreate.splice(index, 1);
                } else {
                    let index = nextRemindsICreateCompleted.findIndex((v) => {
                        return v._id == action.payload.id;
                    });
                    nextRemindsICreateCompleted.splice(index, 1);
                }
                if (action.payload.userId == action.payload.toUserId) {
                    if (status == 1) {
                        let index = nextRemindsToMe.findIndex((v) => {
                            return v._id == action.payload.id;
                        });
                        nextRemindsToMe.splice(index, 1);
                    } else {
                        let index = nextRemindsToMeCompleted.findIndex((v) => {
                            return v._id == action.payload.id;
                        });
                        nextRemindsToMeCompleted.splice(index, 1);
                    }
                }
                return {
                    ...state,
                    remindsToMe: nextRemindsToMe,
                    remindsToMeCompleted: nextRemindsToMeCompleted,
                    remindsICreate: nextRemindsICreate,
                    remindsICreateCompleted: nextRemindsICreateCompleted,
                    status: action.type,
                    message: '删除成功',
                    time: Date.now()
                };
            }
        case TYPES.REMOVE_REMIND_ERROR:
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