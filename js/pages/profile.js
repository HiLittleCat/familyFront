
import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Content, Card, CardItem, Body, Text, Icon, Left, Right, Button } from 'native-base';
import DropdownAlert from 'react-native-dropdownalert';
import { logOut, clearStatus } from '../actions/user';
import commonStyle from '../styles/common';
import * as TYPES from '../actions/types';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: props.isLoggedIn,
            user: props.user,
            status: props.status,
            message: props.message
        }
        this.logOut = this.logOut.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.status == TYPES.LOG_OUT_ERROR) {
            this.dropdown.alertWithType('error', '操作未成功', nextProps.message);
            return false;
        }
        if (this.props.status != nextProps.status && nextProps.status == TYPES.LOGGED_OUT) {
            this.props.navigation.navigate('LoginPage');
            return true;
        }
        return true;
    }

    logOut() {
        this.props.dispatch(logOut({ id: this.props.user._id }));
    }


    render() {
        const user = this.state.user;
        const navigate = this.props.navigation.navigate;
        if (!this.props.isLoggedIn) {
            return <Container style={[commonStyle.wrapper, styles.container]}>
                <Content>
                    <Button block danger style={styles.btn} onPress={() => { this.props.navigation.navigate('LoginPage') }}><Text > 登录 </Text></Button>
                </Content>
            </Container>;
        }
        return (<Container style={[commonStyle.wrapper, styles.container]}>
            <Content>
                <View style={{ flex: 1, alignItems: 'center', margin: 20 }} >
                    <TouchableOpacity onPress={() => { navigate('UpdateUserInfoPage') }} >
                        <Image style={{ width: 120, height: 120, marginBottom: 10, backgroundColor: 'gray', borderRadius: 60 }} source={{ uri: user.logo }} ></Image>
                        <Text style={[styles.textNormal, { color: '#333', textAlign: 'center' }]}>{user.name}</Text>
                    </TouchableOpacity>
                </View>
                <Button block danger style={styles.btn} onPress={() => this.logOut()}><Text > 退出登录 </Text></Button>
            </Content>
            <DropdownAlert ref={(ref) => this.dropdown = ref} closeInterval={2000} messageStyle={{ marginTop: 10, fontSize: 18, color: 'white' }} />
        </Container>);
    };
};

var styles = StyleSheet.create({
    container: { flex: 1, padding: 4, paddingTop: 20 },
    btn: { marginTop: 10, borderRadius: 0 },
    btnText: { fontSize: 18, fontWeight: '300', color: '#FFF' },
})



function select(store) {
    return {
        isLoggedIn: store.userStore.isLoggedIn,
        user: store.userStore.user,
        status: store.userStore.status,
        message: store.userStore.message,
    }
}

export default connect(select)(Profile);