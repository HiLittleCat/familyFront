import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, TextInput, Image, ScrollView, TouchableOpacity, PanResponder } from 'react-native';
import { Container, Content, Badge, Text, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import DropdownAlert from 'react-native-dropdownalert';
import commonStyle from '../styles/common';

class RecordDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: props.navigation.state.params.type,
        }
    }

    render() {
        const user = this.props.user;
        const navigate = this.props.navigation.navigate;
        const title = this.props.navigation.state.params.title;
        const type = this.props.navigation.state.params.type;
        const arr = this.props.tags[type];
        let cards = [];
        let self = this;
        arr.forEach(function (v, i) {
            let visibilityText = '公开';
            let visibilityTextColor = 'green';

            if (v.visibility == null || v.visibility.length == 0) {
                visibilityText = '公开';
            } else if (v.visibility.length == 1) {
                visibilityText = '保密';
                visibilityTextColor = 'red';
            } else {
                visibilityText = '对部分家庭成员公开';
                visibilityTextColor = '#400227';
            }
            cards.push(
                <TouchableOpacity key={i} onPress={() => { navigate('RecordEditPage', { userId: user._id, type: type, ...v }) }}>
                    <View style={{ flexDirection: 'row', padding: 8, paddingTop: 18, marginBottom: 4, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#F0F0F0', }}>
                        <View style={{ flex: 5 }}>
                            <Text style={styles.textTitle}>{v.name}<Text style={[styles.visibilityText, { color: visibilityTextColor }]} > {visibilityText}</Text></Text>
                            <Text style={styles.textNormal}>{v.content}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        });
        return <Container style={[commonStyle.wrapper, styles.container]}>
            <Content>
                <View style={{ flex: 1, alignItems:'center', marginTop: 5, marginBottom: 10 }}>
                    <TouchableOpacity style={{
                        width: 40, height: 40, 
                    }} onPress={() => { navigate('RecordAddPage', { userId: user._id, type: type }) }}><Text style={{ fontSize: 30, backgroundColor: 'transparent', textAlign: 'center', lineHeight: 40, fontWeight:'300' }} >+</Text></TouchableOpacity>
                </View>
                {cards}
                <DropdownAlert ref={(ref) => this.dropdown = ref} closeInterval={2000} messageStyle={{ marginTop: 10, fontSize: 18, color: 'white' }} />
            </Content>
        </Container>;
    };
};
var styles = StyleSheet.create({
    container: { flex: 1, padding: 4 , backgroundColor: 'white'},
    btn: { marginTop: 10, borderRadius: 0 },
    textTitle: { fontSize: 18, fontWeight: '300', color: '#666', paddingBottom: 12 },
    textNormal: { fontSize: 18, color: '#000', fontWeight: '300', paddingBottom: 8 },
    textSmall: { fontSize: 16, color: '#333' },
    visibilityText: { fontSize: 16, fontWeight: '300' },
    textTint: { fontSize: 16, color: '#666' }
})

function select(store) {
    return {
        isLoggedIn: store.userStore.isLoggedIn,
        user: store.userStore.user,
        tags: store.tag.tags,
        status: store.tag.status,
        message: store.tag.message,
        time: store.tag.time
    }
}

export default connect(select)(RecordDetail);