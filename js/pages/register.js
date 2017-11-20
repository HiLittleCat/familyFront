'use strict';
import React, { Component } from 'react';
import { StyleSheet, View, Platform, TextInput, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Button, Container, Content, Text } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import DropdownAlert from 'react-native-dropdownalert';
import { Hideo } from 'react-native-textinput-effects';
import { logIn, clearStatus } from '../actions/user';
import commonStyle from '../styles/common';
const { width, height } = Dimensions.get('window');
import { doRegister, registerClear } from '../actions/user';


class regitsterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            nickname: '',
            password: '',
            repassword: ''
        };
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangePswd = this.onChangePswd.bind(this);
        this.onChangeRePswd = this.onChangeRePswd.bind(this);
        this.onChangeNickName = this.onChangeNickName.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.status == 'registerok') {
            this.dropdown.alertWithType('success', '注册成功', '注册成功');
            //this.props.navigation.navigate('LoginPage');
            return false;
        }
        if (nextProps.status == 'error') {
            this.dropdown.alertWithType('error', '操作未成功', nextProps.message);
            //this.props.dispatch(clearStatus());
            return false;
        }
        return true;
    }

    handleRegister() {
        if (!this.state.phone || !this.state.password || !this.state.repassword) {
            this.dropdown.alertWithType('warn', '输入错误', '手机号码和密码必须输入');
            return;
        }
        if (this.state.password != this.state.repassword) {
            this.dropdown.alertWithType('warn', '输入错误', '两次密码输入不相同');
            return;
        }
        let opt = {
            'name': this.state.phone,
            'nickname': this.state.nickname,
            'password': this.state.password,
        };
        this.props.dispatch(doRegister(opt));
    }

    onChangePhone(text) {
        this.setState({ 'phone': text });
    }

    onChangeNickName(text) {
        this.setState({ 'nickname': text });
    }

    onChangePswd(text) {
        this.setState({ 'password': text });
    }

    onChangeRePswd(text) {
        this.setState({ 'repassword': text });
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <Container style={[commonStyle.wrapper, styles.container]}>
                <Content style={styles.content}>
                    <View style={styles.familyWrap}><Image style={styles.familyIcon} source={require('../imgs/icons/family.png')} /></View>
                    <View >
                        <View style={styles.input}>
                            <Hideo
                                placeholder='手机号码'
                                maxLength={16}
                                onChangeText={this.onChangePhone}
                                iconClass={Icon}
                                iconName={'phone'}
                                iconColor={'white'}
                                iconBackgroundColor={'#f2a59d'}
                                inputStyle={{ color: '#464949', fontSize: 16 }}
                            />
                        </View>
                        <View style={styles.input}>
                            <Hideo
                                placeholder='名字'
                                maxLength={16}
                                onChangeText={this.onChangeNickName}
                                iconClass={Icon}
                                iconName={'user'}
                                iconColor={'white'}
                                iconBackgroundColor={'#f2a59d'}
                                inputStyle={{ color: '#464949', fontSize: 16 }}
                            />
                        </View>
                        <View style={styles.input}>
                            <Hideo
                                placeholder='密码'
                                maxLength={20}
                                secureTextEntry={true}
                                onChangeText={this.onChangePswd}
                                iconClass={Icon}
                                iconName={'lock'}
                                iconColor={'white'}
                                iconBackgroundColor={'#f2a59d'}
                                inputStyle={{ color: '#464949', fontSize: 16 }}
                            />
                        </View>
                        <View style={styles.input}>
                            <Hideo
                                placeholder='确认密码'
                                maxLength={20}
                                secureTextEntry={true}
                                onChangeText={this.onChangeRePswd}
                                iconClass={Icon}
                                iconName={'lock'}
                                iconColor={'white'}
                                iconBackgroundColor={'#f2a59d'}
                                inputStyle={{ color: '#464949', fontSize: 16 }}
                            />
                        </View>
                    </View>
                    <View style={styles.btnWrap}>
                        <Button primary full style={styles.btn} onPress={this.handleRegister}><Text style={styles.btnText}> 注册 <Icon name='user-plus' style={{ fontSize: 18 }} /> </Text></Button>
                    </View>
                    <DropdownAlert ref={(ref) => this.dropdown = ref} closeInterval={2000} messageStyle={{ marginTop: 10,fontSize: 16, color: 'white' }}/>
                </Content>
            </Container>
        );
    }
}

var styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    content: { paddingTop: 0 },
    input: { flexDirection: 'row', height: 60 },
    btnWrap: { height: 40, marginTop: 0, backgroundColor: '#FFF' },
    btn: { borderRadius: 0 },
    btnText: { fontSize: 18, fontWeight: '600', color: '#FFF' },
    familyWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', margin: 30 },
    familyIcon: { width: 100, height: 100 },
})

function select(store) {
    return {
        isLoggedIn: store.userStore.isLoggedIn,
        status: store.userStore.status,
        message: store.userStore.message
    }
}


export default connect(select)(regitsterPage);


