'use strict';
import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Button, Container, Content, Badge, Text } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Hideo } from 'react-native-textinput-effects';
import DropdownAlert from 'react-native-dropdownalert';
import * as TYPES from '../actions/types';
import { logIn, clearStatus } from '../actions/user';
import commonStyle from '../styles/common';
const { width, height } = Dimensions.get('window');

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            btnFlag: true
        };
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePswd = this.onChangePswd.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    componentWillMount(){
        console.log('login componentWillMount');
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.isLoggedIn != nextProps.isLoggedIn && nextProps.isLoggedIn === true) {
            this.props.navigation.navigate('MainPage');
            return false;
        }
        if (this.props.time != nextProps.time && nextProps.status == TYPES.LOGGED_ERROR) {
            this.dropdown.alertWithType('error', '操作未成功', nextProps.message);
            return false;
        }
        return true;
    }

    handleLogin() {
        if (!this.state.username || !this.state.password) {
            this.dropdown.alertWithType('warn', '输入错误', '手机号码和密码必须输入');
            return;
        }
        let opt = {
            'name': this.state.username,
            'password': this.state.password,
        };
        this.props.dispatch(logIn(opt));
    }


    onChangeName(text) {
        this.setState({ 'username': text });
    }

    onChangePswd(text) {
        this.setState({ 'password': text });
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
                                onChangeText={this.onChangeName}
                                iconClass={Icon}
                                iconName={'phone'}
                                iconColor={'white'}
                                iconBackgroundColor={'#f2a59d'}
                                inputStyle={{ color: '#464949', fontSize: 18 }}
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
                                inputStyle={{ color: '#464949', fontSize: 18 }}
                            />
                        </View>
                    </View>
                    <View style={styles.btnWrap}>
                        <Button primary full style={styles.btn} onPress={this.handleLogin}><Text style={styles.btnText}> 登录 <Icon name='sign-in' style={{ fontSize: 18 }} /> </Text></Button>
                    </View>
                    <View style={styles.link}>
                        <View>
                            <Button success style={styles.linkLeft} onPress={() => {navigate('RegisterPage')}}><Text  > 注册 <Icon name='user-plus' style={{ fontSize: 18 }} /> </Text></Button>
                        </View>
                        <View>
                            <Button danger style={styles.linkRight} onPress={() => {navigate('RegisterPage')}}><Text > 忘记密码 <Icon name='question' style={{ fontSize: 18 }} /> </Text></Button>
                        </View>
                    </View>
                    <DropdownAlert ref={(ref) => this.dropdown = ref} closeInterval={2000} messageStyle={{ marginTop: 10,fontSize: 18, color: 'white' }}/>
                </Content>
            </Container>
        );
    }
}

var styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    content: { paddingTop: 0 },
    input: { flexDirection: 'row', height: 60 },
    btnWrap: { height: 40, marginTop: 20, backgroundColor: '#FFF' },
    btn: { borderRadius: 0 },
    btnText: { fontSize: 18, fontWeight: '300', color: '#FFF' },
    link: { flexDirection: 'row', marginTop: 30, height: 35 },
    linkLeft: { position: 'relative', width: (width - 20) / 2, height: 35, borderRadius: 0 },
    linkRight: { position: 'relative', width: (width - 20) / 2, height: 35, borderRadius: 0 },
    familyWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', margin: 30 },
    familyIcon: { width: 100, height: 100 },
})

function select(store) {
    return {
        isLoggedIn: store.userStore.isLoggedIn,
        user: store.userStore.user,
        status: store.userStore.status,
        message: store.userStore.message,
        time: store.userStore.time
    }
}


export default connect(select)(LoginPage);


