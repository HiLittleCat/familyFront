
import { StackNavigator } from 'react-navigation';
import RemindPage from '../pages/remind';
import RemindICreatePage from '../pages/remindICreate';
import RemindAddPage from '../pages/remindAdd';
import RemindEditPage from '../pages/remindEdit';


export default Family = StackNavigator({
    RemindPage: {
        screen: RemindPage,
        navigationOptions: {
            headerTitle: '待办事项',
            headerBackTitleStyle: { fontSize: 16 },
            headerTitleStyle: { color: '#333' }
        }
    },
    RemindICreatePage: {
        screen: RemindICreatePage,
        navigationOptions: {
            headerTitle: '我创建的事项',
            headerBackTitleStyle: { fontSize: 16 },
            headerTitleStyle: { color: '#333' }
        }
    },
    RemindAddPage: {
        screen: RemindAddPage,
        navigationOptions: {
            headerTitle: '创建事项',
            headerBackTitleStyle: { fontSize: 16 },
            headerTitleStyle: { color: '#333' }
        }
    },
    RemindEditPage: {
        screen: RemindEditPage,
        navigationOptions: {
            headerTitle: '编辑事项',
            headerBackTitleStyle: { fontSize: 16 },
            headerTitleStyle: { color: '#333' }
        }
    }
},{
    mode: 'modal',
});
