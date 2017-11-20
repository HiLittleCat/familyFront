'use strict';
import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Button, Container, Content, Badge, Text } from 'native-base';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Hideo } from 'react-native-textinput-effects';
import DropdownAlert from 'react-native-dropdownalert';
import { dealApplyJoinFamily } from '../actions/family';
import commonStyle from '../styles/common';
import * as TYPES from '../actions/types';

const { width, height } = Dimensions.get('window');

class comp extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log('applyJoinMyFamily componentWillMount');
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.isLoggedIn != nextProps.isLoggedIn && nextProps.isLoggedIn === true) {
            this.dropdown.alertWithType('error', '操作未成功', '尚未登录，请先登录');
            return false;
        }
        if (this.props.time != nextProps.time && nextProps.status == TYPES.DEAL_APPLY_JOIN_FAMILY_ERROR) {
            this.dropdown.alertWithType('error', '操作未成功', nextProps.message);
            return false;
        }
        return true;
    }

    access(applyUserId) {
        let opt = {
            'id': this.props.navigation.state.params.id,
            'applyUserId': applyUserId,
            'dealStatus': 2
        };
        this.props.dispatch(dealApplyJoinFamily(opt));
    }

    refuse(applyUserId) {
        let opt = {
            'id': this.props.navigation.state.params.id,
            'applyUserId': applyUserId,
            'dealStatus': 3
        };
        this.props.dispatch(dealApplyJoinFamily(opt));
    }

    render() {
        let self = this;
        const { navigate } = this.props.navigation;
        let toDealApply = this.props.toDealApply;
        let toDealApplyView = [];

        toDealApply.forEach(function (e, i) {
            let applyUserId = e.userId._id;
            let button = <View style={{ flex: 1 }}>
                <Button style={{ height: 30 }} onPress={self.access.bind(self, applyUserId)}><Text style={styles.textSmall}>接受</Text></Button>
                <Button danger style={{ height: 30, marginTop: 5 }} onPress={self.refuse.bind(self, applyUserId)}><Text style={styles.textSmall}>拒绝</Text></Button>
            </View >;
            if (e.dealStatus == 2) {
                button = <View style={{ flex: 1 }}>
                    <Text style={styles.textTint}>已接受</Text>
                </View>;
            } else if (e.dealStatus == 3) {
                button = <View style={{ flex: 1 }}>
                    <Text style={styles.textTint}>已拒绝</Text>
                </View>;
            }
            toDealApplyView.push(
                <View key={i} style={{ flexDirection: 'row', padding: 8, paddingTop: 18, paddingBottom: 18, backgroundColor: 'white' }}>
                    <View style={{ flex: 1 }}>
                        <Image style={{ width: 60, height: 60, marginBottom: 5, backgroundColor: 'gray', borderRadius: 30 }} source={{ uri: e.userId.logo }}></Image>
                    </View>
                    <View style={{ flex: 3 }}>
                        <Text style={[styles.textNormal, {padding: 5}]}>{e.userId.name}</Text>
                        <Text style={[styles.textNormal, {padding: 5}]}>{e.message}</Text>
                    </View>
                    {button}
                </View>
            );
        });
        return (
            <Container style={[commonStyle.wrapper, styles.container]}>
                <Content style={styles.content}>
                    {toDealApplyView}
                    <DropdownAlert ref={(ref) => this.dropdown = ref} closeInterval={2000} messageStyle={{ marginTop: 10, fontSize: 18, color: 'white' }} />
                </Content>
            </Container>
        );
    }
}

var styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    btn: { marginTop: 10, borderRadius: 0 },
    textNormal: { fontSize: 18, color: '#333', fontWeight: '300' },
    textNoramlActive: { fontSize: 18, color: '#0E48BE', fontWeight: '300' },
    textSmall: { fontSize: 16, fontWeight: '300' },
    textTint: { fontSize: 18, color: '#666', fontWeight: '300' }
})

function select(store) {
    return {
        isLoggedIn: store.userStore.isLoggedIn,
        familys: store.family.familys,
        toDealApply: store.family.toDealApply,
        status: store.family.status,
        message: store.family.message,
        time: store.family.time
    }
}


export default connect(select)(comp);


