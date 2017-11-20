
import { StackNavigator } from 'react-navigation';

import ProfilePage from '../pages/profile';
import UpdateUserInfoPage from '../pages/updateUserInfo';


export default Family = StackNavigator({
    ProfilePage: {
        screen: ProfilePage,
        navigationOptions: {
            headerTitle: '我的',
            headerBackTitleStyle: { fontSize: 16 },
            headerTitleStyle: { color: '#333' }
        }
    },
    UpdateUserInfoPage: {
        screen: UpdateUserInfoPage,
        navigationOptions: {
            headerTitle: '修改我的信息',
            headerBackTitleStyle: { fontSize: 16 },
            headerTitleStyle: { color: '#333' }
        }
    },
});
