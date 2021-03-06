'use strict';
import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Button, Container, Content, Badge, Text } from 'native-base';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Hideo } from 'react-native-textinput-effects';
import DropdownAlert from 'react-native-dropdownalert';
import { updateUserInfo } from '../actions/user';
import commonStyle from '../styles/common';
import * as TYPES from '../actions/types';

const { width, height } = Dimensions.get('window');

class comp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            logo: '',
        };
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeLogo = this.onChangeLogo.bind(this);
        this.submit = this.submit.bind(this);
    }


    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.isLoggedIn != nextProps.isLoggedIn && nextProps.isLoggedIn === true) {
            this.dropdown.alertWithType('error', '操作未成功', '尚未登录，请先登录');
            return false;
        }
        if (this.props.time != nextProps.time && nextProps.status == TYPES.UPDATE_USER_INFO_OK) {
            this.dropdown.alertWithType('error', '操作未成功', nextProps.message);
            return false;
        }
        if (this.props.time != nextProps.time && nextProps.status == TYPES.UPDATE_USER_INFO_ERROR) {
            this.dropdown.alertWithType('success', '操作成功', nextProps.message);
            return false;
        }
        return true;
    }

    submit() {
        if (!this.state.name) {
            this.dropdown.alertWithType('warn', '输入错误', '名字不能为空');
            return;
        }
        let opt = {
            'userId': this.props.user._id,
            'name': this.state.name,
            'logo': this.state.logo == '' || !this.state.logo ? this.props.user.logo : this.state.logo
        };
        this.props.dispatch(updateUserInfo(opt));
    }


    onChangeLogo(text) {
        this.setState({ 'id': text });
    }

    onChangeName(text) {
        this.setState({ 'name': text });
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <Container style={[commonStyle.wrapper, styles.container]}>
                <Content style={styles.content}>
                    <View >
                        <View style={styles.input}>
                            <Hideo
                                placeholder='名字'
                                maxLength={16}
                                onChangeText={this.onChangeName}
                                iconClass={FontAwesomeIcon}
                                iconName={'pencil'}
                                iconColor={'white'}
                                autoCorrect={false}
                                iconBackgroundColor={'#f2a59d'}
                                inputStyle={{ color: '#464949', fontSize: 18 }}
                            />
                        </View>
                        {/* <View style={styles.input}>
                            <Hideo
                                placeholder='头像'
                                maxLength={20}
                                onChangeText={this.onChangeLogo}
                                iconClass={FontAwesomeIcon}
                                iconName={'pencil'}
                                iconColor={'white'}
                                autoCorrect={false}
                                iconBackgroundColor={'#f2a59d'}
                                inputStyle={{ color: '#464949', fontSize: 18 }}
                            />
                        </View> */}
                    </View>
                    <View style={styles.btnWrap}>
                        <Button primary block style={styles.btn} onPress={this.submit}><Text > 修改  </Text></Button>
                    </View>
                    <DropdownAlert ref={(ref) => this.dropdown = ref} closeInterval={2000} messageStyle={{ marginTop: 10, fontSize: 18, color: 'white' }} />
                </Content>
            </Container>
        );
    }
}

var styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    content: { paddingTop: 20 },
    input: { flexDirection: 'row', height: 60 },
    btnWrap: { height: 40, marginTop: 0, backgroundColor: '#FFF' },
    btn: { borderRadius: 0 }
})

function select(store) {
    return {
        isLoggedIn: store.userStore.isLoggedIn,
        user: store.userStore.user,
        status: store.family.status,
        message: store.family.message,
        time: store.family.time
    }
}


export default connect(select)(comp);


