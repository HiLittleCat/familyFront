import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
/**
 * 引入应用的所有页面
 */
import MainPage from './main';
import LoginPage from '../pages/login';
import RegisterPage from '../pages/register';

export default AppNavigator = StackNavigator({
    MainPage: {
        screen: MainPage,
        navigationOptions: {
            header: null
        }
    },
    LoginPage: {
        screen: LoginPage,
        navigationOptions: {
            headerTitle: '登录',
            headerBackTitleStyle : { fontSize: 16 }
        }
    },
    RegisterPage: {
        screen: RegisterPage,
        navigationOptions: {
            headerTitle: '注册',
            headerBackTitleStyle : { fontSize: 16 }
        }
    },
});

// const AppWithNavigationState = ({ dispatch, nav }) => (
//     <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
//   );
  
// //   AppWithNavigationState.propTypes = {
// //     dispatch: PropTypes.func.isRequired,
// //     nav: PropTypes.object.isRequired,
// //   };
  
//   const mapStateToProps = state => ({
//     nav: state.nav,
//   });
  
//   export default connect(mapStateToProps)(AppWithNavigationState);
