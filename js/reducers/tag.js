'use strict';
import * as TYPES from '../actions/types';

const initialState = {
    tags: {
        clothes: [],
        food: [],
        housing: [],
        moving: [],
        health: [],
        entertainment: [],
        education: [],
        else: []
    },
    status: null,
    message: null,
    time: null
};

export default function tag(state = initialState, action) {
    switch (action.type) {
        case TYPES.CLEAR_STATUS:
            return {
                ...state,
                status: null,
                message: null,
                time: null
            }
        case TYPES.GET_TAGS_OK:
            return {
                ...state,
                tags: action.tags,
                status: action.type,
                message: action.message,
                time: Date.now()
            };
        case TYPES.GET_TAGS_ERROR:
            return {
                ...state,
                status: action.type,
                message: action.message,
                time: Date.now()
            };
        case TYPES.UPDATE_TAG_OK:
            let cTags = Object.assign({}, state.tags);
            let curTag = action.tag;
            let tagArr = cTags[curTag.type];
            let index = tagArr.findIndex(function (v) {
                return v._id == curTag.id;
            });
            let tag = tagArr[index];
            tag.content = curTag.content;
            tag.visibility = curTag.visibility;
            return {
                ...state,
                tags: cTags,
                status: action.type,
                message: '修改标签成功',
                time: Date.now()                
            };
        case TYPES.UPDATE_TAG_ERROR:
            return {
                ...state,
                status: action.type,
                message: action.message,
                time: Date.now()
            };
        case TYPES.CREATE_TAG_OK:
            cTags = Object.assign({}, state.tags);
            cTags[action.tag.type].push(action.tag);
            return {
                ...state,
                tags: cTags,
                status: action.type,
                message: '创建标签成功',
                time: Date.now()
                
            };
        case TYPES.CREATE_TAG_ERROR:
            return {
                ...state,
                status: action.type,
                message: action.message,
                time: Date.now()
            };
        case TYPES.DELETE_TAG_OK:
            cTags = Object.assign({}, state.tags);
            tagArr = cTags[action.tag.type];
            index = tagArr.findIndex(function (v) {
                return v._id == action.tag.id;
            });
            tagArr.splice(index, 1);
            return {
                ...state,
                tags: cTags,
                status: action.type,
                message: '删除标签成功',
                time: Date.now()
            };
        case TYPES.DELETE_TAG_ERROR:
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