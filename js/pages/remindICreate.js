import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, TextInput, Image, ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Container, Content, Badge, Text } from 'native-base';
import Swipeout from 'react-native-swipeout';
import DropdownAlert from 'react-native-dropdownalert';
import ModalDropdown from 'react-native-modal-dropdown';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import commonStyle from '../styles/common';
import * as RemindAction from '../actions/remind';

class Remind extends Component {
    constructor(props) {
        super(props);
        this.removeRemind = this.removeRemind.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(RemindAction.getRemindsICreate({ userId: this.props.user._id }));
    }

    removeRemind(e) {
        this.props.dispatch(RemindAction.removeRemind({ id: e._id, userId: this.props.user._id, ...e }));
    }


    render() {
        let self = this;
        const navigate = this.props.navigation.navigate;
        let members = this.props.members;
        let [remindsICreate, remindsICreateCompleted] = [this.props.remindsICreate, this.props.remindsICreateCompleted];
        let [remindsICreateView, remindsICreateCompletedView] = [[], []];
        remindsICreate.forEach(function (e, i) {
            let swipeoutBtns = [
                {
                    text: <Icon name='edit' size={20} />,
                    backgroundColor: 'white',
                    onPress: () => { navigate('RemindEditPage', { remind: e }) }
                },
                {
                    text: <EvilIcons name='close' size={26} />,
                    backgroundColor: 'white',
                    onPress: () => { self.removeRemind(e) }
                }
            ]
            remindsICreateView.push(<Swipeout right={swipeoutBtns} backgroundColor='white' key={e._id} buttonWidth={40}>
                <View style={styles.messageWrap}>
                    <Text style={styles.message}>{e.message}</Text>
                </View>
            </Swipeout>)
        });

        remindsICreateCompleted.forEach(function (e, i) {
            let swipeoutBtns = [
                {
                    text: <EvilIcons name='close' size={26} />,
                    backgroundColor: 'white',
                    onPress: () => { self.removeRemind(e) }
                }
            ]
            remindsICreateCompletedView.push(<Swipeout right={swipeoutBtns} backgroundColor='white' key={e._id} buttonWidth={40}>
                <View style={styles.messageWrap}>
                    <Text style={styles.messageThrough}>{e.message}</Text>
                </View>
            </Swipeout>)
        });

        return (<Container style={[commonStyle.wrapper, styles.container]}>
            <Content>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                    <TouchableOpacity style={{ flex: 1, width: 40, height: 40, }} onPress={() => { navigate('RemindAddPage') }}>
                        <Text name='clone' style={{ fontSize: 30, backgroundColor: 'transparent', textAlign: 'center', lineHeight: 40, fontWeight: '300' }} >+</Text>
                    </TouchableOpacity>
                </View>
                {remindsICreateView}
                {remindsICreateCompletedView}
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
})

function select(store) {
    return {
        isLoggedIn: store.userStore.isLoggedIn,
        user: store.userStore.user,
        remindsICreate: store.remind.remindsICreate,
        remindsICreateCompleted: store.remind.remindsICreateCompleted,
        members: store.family.members,
        status: store.remind.status,
        message: store.remind.message,
        time: store.remind.time
    }
}
export default connect(select)(Remind);