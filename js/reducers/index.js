
import { combineReducers } from 'redux';
//import nav from './nav';
import userReducer from './user';
import tag from './tag';
import family from './family';
import remind from './remind';

export default combineReducers({
	//nav,
	userStore: userReducer,
	tag,
	family,
	remind
});
