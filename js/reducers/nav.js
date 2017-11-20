import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../navigators/AppNavigator';

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('LoginPage'));

export default navReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
};
