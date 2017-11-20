import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, TextInput, Image, ScrollView } from 'react-native';
import { Container, Content, Badge, Text, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import DropdownAlert from 'react-native-dropdownalert';
import commonStyle from '../styles/common';

class RecordDetail extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params.title,
    });

    constructor(props) {
        super(props);
        this.state = {
            type: props.navigation.state.params.type,
            scroll: true,
        }
    }

    render() {
        const user = this.props.user;
        const title = this.props.navigation.state.params.title;
        const type = this.props.navigation.state.params.type;
        const id = this.props.navigation.state.params.id;
        let members = this.props.members;
        let index = members.findIndex((m)=>{
            return m._id == id;
        });
        if (index == -1) {
            return <Container style={[commonStyle.wrapper, styles.container]}>
            </Container>;
        }
        let member = members[index];
        
        const arr = member[type];
        let cards = [];
        let self = this;
        arr.forEach(function (v, i) {
            cards.push(<View key={i} style={{ padding: 8, paddingTop: 18, marginBottom: 4, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#F0F0F0', }}>
                <Text style={styles.textTitle}>{v.name}</Text>
                <Text style={styles.textNormal}>{v.content}</Text>
            </View>);
        });
        return <Container style={[commonStyle.wrapper, styles.container]}>
            <Content>
                {cards}
                <DropdownAlert ref={(ref) => this.dropdown = ref} closeInterval={2000} messageStyle={{ marginTop: 10, fontSize: 18, color: 'white' }} />
            </Content>
        </Container>;
    };
};


var styles = StyleSheet.create({
    container: { flex: 1, padding: 4 },
    btn: { marginTop: 10, borderRadius: 0 },
    textTitle: { fontSize: 18, fontWeight: '300', color: '#666' , paddingBottom: 12 },
    textNormal: { fontSize: 18, color: '#000', fontWeight: '300', paddingBottom: 8  },
    textSmall: { fontSize: 16, color: '#333' },
    textTint: { fontSize: 16, color: '#666' }
})

function select(store) {
    return {
        isLoggedIn: store.userStore.isLoggedIn,
        user: store.userStore.user,
        members: store.family.members,
        status: store.tag.status,
        message: store.tag.message,
        time: store.tag.time
    }
}

export default connect(select)(RecordDetail);