
import { StackNavigator } from 'react-navigation';

import FamilyPage from '../pages/family';
import CreateFamilyPage from '../pages/createFamily';
import ApplyFamilyPage from '../pages/applyFamily';
import ApplyJoinMyFamilyPage from '../pages/applyJoinMyFamily';
import MemberTagPage from '../pages/memberTag';
import MemberTagDetailPage from '../pages/memberTagDetail';


export default Family = StackNavigator({
    FamilyPage: {
        screen: FamilyPage,
        navigationOptions: {
            headerTitle: '我的家庭',
            headerBackTitleStyle: { fontSize: 16 },
            headerTitleStyle: { color: '#333' }
        }
    },
    CreateFamilyPage: {
        screen: CreateFamilyPage,
        navigationOptions: {
            headerTitle: '创建家庭',
            headerBackTitleStyle: { fontSize: 16 },
            headerTitleStyle: { color: '#333' }
        }
    },
    ApplyFamilyPage: {
        screen: ApplyFamilyPage,
        navigationOptions: {
            headerTitle: '加入家庭',
            headerBackTitleStyle: { fontSize: 16 },
            headerTitleStyle: { color: '#333' }
        }
    },
    ApplyJoinMyFamilyPage: {
        screen: ApplyJoinMyFamilyPage,
        navigationOptions: {
            headerTitle: '处理请求',
            headerBackTitleStyle: { fontSize: 16 },
            headerTitleStyle: { color: '#333' }
        }
    },
    MemberTagPage: {
        screen: MemberTagPage,
        navigationOptions: {
            headerBackTitleStyle: { fontSize: 16 },
            headerTitleStyle: { color: '#333' }
        }
    },
    MemberTagDetailPage: {
        screen: MemberTagDetailPage,
        navigationOptions: {
            headerBackTitleStyle: { fontSize: 16 },
            headerTitleStyle: { color: '#333' }
        }
    },
});
