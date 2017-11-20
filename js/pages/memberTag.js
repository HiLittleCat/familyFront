import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, TextInput, Image, ScrollView } from 'react-native';
import { Container, Content, Badge, Text, Button } from 'native-base';
import commonStyle from '../styles/common';
import CardList from './components/CardList';
import { getMemberInfo } from '../actions/family';

class List extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params ? navigation.state.params.headerTitle : '家庭成员记录',
    });

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.dispatch(getMemberInfo({ userId: this.props.user._id, memberId: this.props.navigation.state.params.id }));
    }

    render() {
        const navigate = this.props.navigation.navigate;
        const members = this.props.members;
        const memberId = this.props.navigation.state.params.id;
        const index = members.findIndex((v) => {
            return v._id == memberId;
        });
        if (index == -1) {
            return <Container >
            </Container>;
        }
        const tags = members[index];
        if (!tags || !tags.clothes) {
            return <Container >

            </Container>;
        }
        if (!this.props.isLoggedIn) {
            return <Container >

            </Container>;
        }
        return (<Container style={[commonStyle.wrapper, styles.container]}>
            <Content >
                <CardList title={'衣着'}
                    color={'#0E48BE'}
                    onClick={() => { navigate('MemberTagDetailPage', { id: memberId, title: '衣着', type: 'clothes' }) }}
                    items={tags.clothes.length}
                />
                <CardList title={'美食'}
                    color='#662BAB'
                    onClick={() => { navigate('MemberTagDetailPage', { id: memberId, title: '美食', type: 'food' }) }}
                    items={tags.food.length}
                />
                <CardList title={'家居'}
                    color={'#fc3758'}
                    onClick={() => { navigate('MemberTagDetailPage', { id: memberId, title: '家居', type: 'housing' }) }}
                    items={tags.housing.length}
                />
                <CardList title={'交通'}
                    color={'#5c05f5'}
                    onClick={() => { navigate('MemberTagDetailPage', { id: memberId, title: '交通', type: 'moving' }) }}
                    items={tags.moving.length}
                />
                <CardList title={'教育'}
                    color='gray'
                    onClick={() => { navigate('MemberTagDetailPage', { id: memberId, title: '教育', type: 'education' }) }}
                    items={tags.education.length}
                />
                <CardList title={'娱乐'}
                    color='#4c3980'
                    onClick={() => { navigate('MemberTagDetailPage', { id: memberId, title: '娱乐', type: 'entertainment' }) }}
                    items={tags.entertainment.length}
                />
                <CardList title={'健康'}
                    color='#0E48BE'
                    onClick={() => { navigate('MemberTagDetailPage', { id: memberId, title: '健康', type: 'health' }) }}
                    items={tags.health.length}
                />
                <CardList title={'其他'}
                    color='black'
                    onClick={() => { navigate('MemberTagDetailPage', { id: memberId, title: '其他', type: 'else' }) }}
                    items={tags.else.length}
                />
            </Content>
        </Container>);
    };
};

var styles = StyleSheet.create({
    container: { flex: 1 },
    button: { borderColor: 1, borderWidth: 1 }
})

function select(store, ownProps) {
    return {
        isLoggedIn: store.userStore.isLoggedIn,
        user: store.userStore.user,
        members: store.family.members,
        status: store.userStore.status,
        message: store.userStore.message
    }
}

export default connect(select)(List);