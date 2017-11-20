/**
 * 底部标签导航
 */
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RemindPage from './remind';
import RecordPage from './record';
import FamilyPage from './family';
import ProfilePage from './profile';

export default Main = TabNavigator({
    Record: {
        screen: RecordPage,
        navigationOptions: {
            tabBarLabel: '记录',
            tabBarIcon: ({ tintColor }) => (
                <Icon name='list' style={[styles.tabBarIcon, { fontSize: 25, color: tintColor }]} />
            ),
        },
    },
    Remind: {
        screen: RemindPage,
        navigationOptions: {
            tabBarLabel: '提醒',
            tabBarIcon: ({ tintColor }) => (
                <Icon name='bell' style={[styles.tabBarIcon, { fontSize: 25, color: tintColor }]} />
            ),
        },
    },
    Family: {
        screen: FamilyPage,
        navigationOptions: {
            tabBarLabel: '家庭',
            tabBarIcon: ({ tintColor }) => (
                <Icon name='group' style={[styles.tabBarIcon, { fontSize: 25, color: tintColor }]} />
            ),
        },
    },
    Profile: {
        screen: ProfilePage,
        navigationOptions: {
            tabBarLabel: '我',
            tabBarIcon: ({ tintColor }) => (
                <Icon name='user' style={[styles.tabBarIcon, { fontSize: 25, color: tintColor }]} />
            ),
        },
    }
}, {
    initialRouteName: 'Remind',
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    backBehavior: 'none',
    tabBarOptions: {
        style: { height: 49, backgroundColor: '#EEE' },
        indicatorStyle: { height: 0 }, 
        activeBackgroundColor: '#666',
        activeTintColor: '#FFF',
        inactiveTintColor: '#000',
        inactiveBackgroundColor: '#000',
        inactiveTintColor: '#FFFFFF',
        showLabel: false,
        showIcon: true
    },
});

const styles = StyleSheet.create({
    tabBarIcon: {
        width: 25,
        height: 25
    }
});
