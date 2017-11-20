import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, TextInput, Image, ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Container, Content, Badge, Text } from 'native-base';
import Swipeout from 'react-native-swipeout';
import DropdownAlert from 'react-native-dropdownalert';
import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import commonStyle from '../styles/common';
import * as RemindAction from '../actions/remind';
import * as TYPES from '../actions/types';

class Remind extends Component {
    constructor(props) {
        super(props);
        let index = this.props.members.findIndex((v) => {
            return v._id == this.props.user._id;
        });
        let toUser = this.props.members[index];

        this.state = {
            ...this.props.navigation.state.params.remind,
            toUserName: toUser.name
        }
        console.log(this.state);
        this.editRemind = this.editRemind.bind(this);
    }


    shouldComponentUpdate(nextProps, nextState) {
        console.log('remindAdd shouldComponentUpdate');

        if (this.props.isLoggedIn != nextProps.isLoggedIn && nextProps.isLoggedIn === true) {
            this.dropdown.alertWithType('error', '操作未成功', '尚未登录，请先登录');
            return false;
        }
        if (this.props.time != nextProps.time && nextProps.status == TYPES.UPDATE_REMIND_MESSAGE_ERROR) {
            this.dropdown.alertWithType('error', '操作未成功', nextProps.message);
            return false;
        }
        if (this.props.time != nextProps.time && nextProps.status == TYPES.UPDATE_REMIND_MESSAGE_OK) {
            this.props.navigation.goBack();
            return true;
        }
        return true;
    }

    editRemind() {
        if (!this.state.familyId) {
            this.dropdown.alertWithType('warn', '输入错误', '缺少家庭信息');
            return;
        }
        if (!this.state.toUserId || !this.state.message || !this.state.completeDate) {
            this.dropdown.alertWithType('warn', '输入错误', '缺少输入信息');
            return;
        }
        let opt = {
            id: this.state._id,
            familyId: this.state.familyId,
            userId: this.props.user._id,
            toUserId: this.state.toUserId,
            message: this.state.message,
            completeDate: this.state.completeDate,
            dealStatus: this.state.dealStatus
        }
        this.props.dispatch(RemindAction.updateRemind(opt));
    }

    _membersOption(rowData, rowID, highlighted) {
        return <TouchableHighlight>
            <View style={{ flexDirection: 'row', marginBottom: 10, }}>
                <Image style={styles.selectLogo} source={{ uri: rowData.logo }} ></Image>
                <Text style={styles.selectText}>{rowData.name}</Text>
            </View>
        </TouchableHighlight>
    }

    _renderSeparator() {
        return <View></View>
    }

    _membersSelect(index, value) {
        this.state.familyId = value.familyId;
        this.state.toUserId = value._id;
    }

    _dateSelect(index, value) {
        this.state.completeDate = value;
    }

    render() {
        let self = this;
        let members = this.props.members;

        const dates = [
            moment().format('YYYY-MM-DD'),
            moment().add(1, 'days').format('YYYY-MM-DD'),
            moment().add(2, 'days').format('YYYY-MM-DD'),
            moment().add(3, 'days').format('YYYY-MM-DD'),
            moment().add(4, 'days').format('YYYY-MM-DD'),
            moment().add(5, 'days').format('YYYY-MM-DD'),
            moment().add(6, 'days').format('YYYY-MM-DD'),
            moment().add(7, 'days').format('YYYY-MM-DD')
        ];

        return (<Container style={[commonStyle.wrapper, styles.container]}>
            <Content>
                <View style={styles.formatWrap}>
                    <TextInput
                        maxLength={50}
                        defaultValue={this.state.message}
                        style={styles.textInput}
                        onChangeText={(text) => this.setState({ message: text })}
                        placeholder='填写事项'
                    />
                    <ModalDropdown
                        style={styles.dropdown}
                        textStyle={styles.textStyle}
                        dropdownStyle={styles.dropdownStyle}
                        animated={false}
                        dropdownTextStyle={styles.dropdownTextStyle}
                        renderSeparator={this._renderSeparator.bind(this)}
                        options={members}
                        renderRow={this._membersOption.bind(this)}
                        onSelect={(index, value) => { this.setState({ toUserName: value.name }); this._membersSelect(index, value) }}
                    >
                        <Text style={styles.textStyle}>{this.state.toUserName}</Text>
                    </ModalDropdown>
                    <ModalDropdown
                        style={styles.dropdown}
                        textStyle={styles.textStyle}
                        defaultIndex={0}
                        defaultValue={this.state.completeDate}
                        dropdownStyle={styles.dropdownStyle}
                        animated={false}
                        dropdownTextStyle={styles.dropdownTextStyle}
                        renderSeparator={this._renderSeparator.bind(this)}
                        options={dates}
                        onSelect={(index, value) => { this._dateSelect(index, value) }}
                    >
                    </ModalDropdown>
                </View>
                <TouchableOpacity style={styles.btnWrap} onPress={() => { self.editRemind() }}>
                    <Icon name='ios-checkmark' size={40} />
                </TouchableOpacity>
                <DropdownAlert ref={(ref) => this.dropdown = ref} closeInterval={2000} messageStyle={{ marginTop: 10, fontSize: 18, color: 'white' }} />
            </Content>
        </Container>);
    };
};

var styles = StyleSheet.create({
    container: { flex: 1, padding: 15 },
    messageWrap: { padding: 10 },
    message: { fontSize: 18, fontWeight: '300', color: '#333' },
    messageThrough: { fontSize: 18, fontWeight: '300', color: '#999', textDecorationLine: 'line-through' },
    iconButton: { fontSize: 30 },
    formatWrap: { marginBottom: 20, marginTop: 10 },
    textInput: { margin: 10, padding: 10, borderBottomColor: '#EEE', borderBottomWidth: 1, fontSize: 18, fontWeight: '300', color: '#333' },
    dropdown: { flex: 1, margin: 10, padding: 10, borderBottomWidth: 1, borderBottomColor: '#EEE' },
    textStyle: { fontSize: 18, fontWeight: '300', color: '#333' },
    dropdownStyle: { marginTop: 10, padding: 15, paddingRight: 20 },
    renderSeparator: { borderBottomWidth: 0 },
    dropdownTextStyle: { fontSize: 18, fontWeight: '300', color: '#333' },
    selectLogo: { width: 30, height: 30, marginRight: 5, backgroundColor: 'gray', borderRadius: 15 },
    selectText: { fontWeight: '300', color: '#333', textAlign: 'center', lineHeight: 30 },
    btnWrap: { flex: 1, alignItems: 'center' }
})

function select(store) {
    return {
        isLoggedIn: store.userStore.isLoggedIn,
        user: store.userStore.user,
        members: store.family.members,
        status: store.remind.status,
        message: store.remind.message,
        time: store.remind.time
    }
}
export default connect(select)(Remind);