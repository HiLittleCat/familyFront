import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Container, Content, Badge, Text } from 'native-base';
import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import DropdownAlert from 'react-native-dropdownalert';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import commonStyle from '../styles/common';
import * as RemindAction from '../actions/remind';
import * as TYPES from '../actions/types';

class Remind extends Component {
    constructor(props) {
        super(props);
        this.complete = this.complete.bind(this);
        this.removeRemind = this.removeRemind.bind(this);
        this.undoComplete = this.undoComplete.bind(this);
    }

    componentWillMount() {
        console.log('remind componentWillMount');
        this.props.dispatch(RemindAction.getRemindsToMe({ userId: this.props.user._id }));
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.isLoggedIn != nextProps.isLoggedIn && nextProps.isLoggedIn === true) {
            this.dropdown.alertWithType('error', '操作未成功', '尚未登录，请先登录');
            return false;
        }
        if (this.props.time != nextProps.time && nextProps.status == TYPES.DEAL_REMIND_ERROR) {
            this.dropdown.alertWithType('error', '操作未成功', nextProps.message);
            return false;
        }
        return true;
    }

    complete(e) {
        let opt = {
            id: e._id,
            userId: this.props.user._id,
            dealStatus: 2
        }
        this.props.dispatch(RemindAction.dealRemind(opt));
    }

    undoComplete(e) {
        let opt = {
            id: e._id,
            userId: this.props.user._id,
            dealStatus: 1
        }
        this.props.dispatch(RemindAction.dealRemind(opt));
    }

    removeRemind(e) {
        this.props.dispatch(RemindAction.removeRemind({ id: e._id, userId: this.props.user._id, ...e }));
    }

    render() {
        let self = this;
        const navigate = this.props.navigation.navigate;
        let [remindsToMe, remindsToMeCompleted] = [this.props.remindsToMe, this.props.remindsToMeCompleted];
        let [remindsToMeView, remindsToMeCompletedView] = [[], []];
        remindsToMe.forEach(function (e, i) {
            let swipeoutBtns = [
                {
                    text: <Icon name='ios-checkmark' size={30} />,
                    backgroundColor: 'white',
                    onPress: () => { self.complete(e) }
                }
            ]
            remindsToMeView.push(<Swipeout right={swipeoutBtns} backgroundColor='white' key={e._id} buttonWidth={40}>
                <View style={styles.messageWrap}>
                    <Text style={styles.message}>{e.message}</Text>
                </View>
            </Swipeout>)
        });

        remindsToMeCompleted.forEach(function (e, i) {
            let swipeoutBtns = [
                {
                    text: <EvilIcons name='undo' size={30} />,
                    backgroundColor: 'white',
                    onPress: () => { self.undoComplete(e) }
                },
                {
                    text: <EvilIcons name='close' size={26} />,
                    backgroundColor: 'white',
                    onPress: () => { self.removeRemind(e) }
                }
            ]
            remindsToMeCompletedView.push(<Swipeout right={swipeoutBtns} backgroundColor='white' key={e._id} buttonWidth={40}>
                <View style={styles.messageWrap}>
                    <Text style={styles.messageThrough}>{e.message}</Text>
                </View>
            </Swipeout>)
        });

        return (<Container style={[commonStyle.wrapper, styles.container]}>
            <Content>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                    <TouchableOpacity style={{ flex: 1, width: 40, height: 40,}} onPress={() => { navigate('RemindICreatePage')}}>
                        <FontAwesomeIcon name='clone' style={{ fontSize: 22, backgroundColor: 'transparent', textAlign: 'center', lineHeight: 40, fontWeight: '300' }} />
                    </TouchableOpacity>
                </View>
                {remindsToMeView}
                {remindsToMeCompletedView}
                <DropdownAlert ref={(ref) => this.dropdown = ref} closeInterval={2000} messageStyle={{ marginTop: 10, fontSize: 18, color: 'white' }} />
            </Content>
        </Container>);
    };
};

var styles = StyleSheet.create({
    container: { flex: 1 , padding: 15},
    messageWrap: { padding: 10 },
    message: { fontSize: 18, fontWeight: '300', color: '#333' },
    messageThrough: { fontSize: 18, fontWeight: '300', color: '#999', textDecorationLine: 'line-through' },
    iconButton: { fontSize: 30 }
})

function select(store) {
    return {
        isLoggedIn: store.userStore.isLoggedIn,
        user: store.userStore.user,
        remindsToMe: store.remind.remindsToMe,
        remindsToMeCompleted: store.remind.remindsToMeCompleted,
        status: store.remind.status,
        message: store.remind.message,
        time: store.remind.time
    }
}
export default connect(select)(Remind);