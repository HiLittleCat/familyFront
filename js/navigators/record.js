
import { StackNavigator } from 'react-navigation';

import RecordListPage from '../pages/recordList';
import RecordDetailPage from '../pages/recordDetail';
import RecordEditPage from '../pages/recordEdit';
import RecordAddPage from '../pages/recordAdd';


export default Record = StackNavigator({
    RecordListPage: {
        screen: RecordListPage,
        navigationOptions: {
            headerTitle: '我的记录',
            headerBackTitleStyle: { fontSize: 16 },
            headerTitleStyle: { color: '#333' }
        }
    },
    RecordDetailPage: {
        screen: RecordDetailPage,
        navigationOptions: {
            headerTitle: '我的记录明细',
            headerBackTitleStyle: { fontSize: 16 },
            headerTitleStyle: { color: '#333' }
        }
    },
    RecordEditPage: {
        screen: RecordEditPage,
        navigationOptions: {
            headerTitle: '修改记录',
            headerBackTitleStyle: { fontSize: 16 },
            headerTitleStyle: { color: '#333' }
        }
    },
    RecordAddPage: {
        screen: RecordAddPage,
        navigationOptions: {
            headerTitle: '创建记录',
            headerBackTitleStyle: { fontSize: 16 },
            headerTitleStyle: { color: '#333' }
        }
    },
});
