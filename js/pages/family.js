import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Button, Icon, Left, Right, Body, Thumbnail } from 'native-base';
import IconVector from 'react-native-vector-icons/FontAwesome';
import commonStyle from '../styles/common';
import * as TYPES from '../actions/types';
import { initFamilyData } from '../actions/family';
import CardList from './components/CardList';

class Family extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log('Family componentWillMount');
        this.props.dispatch(initFamilyData({ userId: this.props.user._id }));
    }

    render() {
        if (!this.props.isLoggedIn) {
            return <Container style={[commonStyle.wrapper, styles.container]}>
            </Container>;
        }
        const userId = this.props.user._id;
        const navigate = this.props.navigation.navigate;
        let familys = this.props.family.familys;
        let members = this.props.family.members;
        let toDealApplys = this.props.family.toDealApply;
        let familysView = [];
        if (familys.length == 0) {
            familysView.push(<Card key={0}><CardItem style={{ height: 60 }}><Text style={{ fontWeight: '300', color: '#333' }}>暂时没有加入家庭</Text></CardItem></Card>);
        } else {
            familys.forEach(function (e, i) {
                let _members = members.filter((v) => {
                    return v.familyId == e._id;
                });
                let membersView = [];
                _members.forEach((m, index) => {
                    membersView.push(
                        <View key={'m' + index} style={{ margin: 8 }} >
                            <TouchableOpacity onPress={() => { navigate('MemberTagPage', { id: m._id, headerTitle: m.name }) }} >
                                <Image style={{ width: 60, height: 60, marginBottom: 10, backgroundColor: 'gray', borderRadius: 30 }} source={{ uri: m.logo }} ></Image>
                                <Text style={[styles.textNormal, { color: '#333', textAlign: 'center' }]}>{m.name}</Text>
                            </TouchableOpacity>
                        </View>
                    );
                });
                let _toDealApplys = toDealApplys.filter((d) => {
                    return d.familyId == e._id && d.dealStatus == 1;
                });
                let toDealApplysView = _toDealApplys.length > 0 ? <View><IconVector name='user-plus' /><Text style={styles.textNoramlActive} onPress={() => { navigate('ApplyJoinMyFamilyPage', { id: e._id }) }}>有 <Text style={{ color: 'red' }}>{_toDealApplys.length}</Text> 个新请求</Text></View>
                    :
                    <View style={{ flexDirection: 'row', marginTop: 15 }}><IconVector name='user-plus' style={{ fontSize: 18, marginRight: 5, color: '#000' }} /><Text style={styles.textNoramlActive} onPress={() => { navigate('ApplyJoinMyFamilyPage', { id: e._id }) }}>新成员</Text></View>
                    ;
                familysView.push(
                    <View key={i} style={{ flexDirection: 'row', padding: 8, paddingTop: 18, paddingBottom: 18, backgroundColor: 'white', borderWidth: 1, borderColor: '#F0F0F0', }}>
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <View>
                                    <Text style={{ fontSize: 18, fontWeight: '300', color: '#333', paddingBottom: 12 }}>{e.name} </Text>
                                    <Text style={{ fontSize: 18, fontWeight: '300', color: '#333', paddingBottom: 12 }}>家庭号：{e._id}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 20, flexWrap: 'wrap' }}>
                                {membersView}
                            </View>
                            <View style={{ margin: 5 }}>
                                {toDealApplysView}
                            </View>
                        </View>
                    </View>

                );
            });
        }
        let button = familys.length == 0 ? <View>
            <Button primary block style={[styles.btn]} onPress={() => { navigate('CreateFamilyPage') }}><Text style={styles.btnText}> 创建家庭  </Text></Button>
            <Button primary block style={[styles.btn]} onPress={() => { navigate('ApplyFamilyPage') }}><Text style={styles.btnText}> 申请加入家庭  </Text></Button>
        </View> : <View></View>;
        return (<Container style={[commonStyle.wrapper, styles.container]}>
            <Content>
                {familysView}
            </Content>
        </Container>);
    };
};

var styles = StyleSheet.create({
    container: { flex: 1, padding: 4 },
    btn: { marginTop: 10, borderRadius: 0 },
    textNormal: { fontSize: 18, color: '#000', fontWeight: '300' },
    textNoramlActive: { fontSize: 18, color: '#000', fontWeight: '300' },
    textSmall: { fontSize: 16, color: '#333' },
    textTint: { fontSize: 16, color: '#666' }
})

function select(store) {
    return {
        isLoggedIn: store.userStore.isLoggedIn,
        user: store.userStore.user,
        family: store.family,
        status: store.family.status,
        message: store.family.message
    }
}

export default connect(select)(Family);