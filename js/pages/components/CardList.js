import React, { Component } from 'react';
import {
    Dimensions,
    Easing,
    View,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window');

export default class CardList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pressedStyle: { },

            top_width: width - 32,
            top_height: height / 5,
            bottom_width: width - 8,
            bottom_height: height / 8 - 16,
            content_height: 0,

            plus: 1,

            BottomBorderRadius: 0,

            offset: 0
        };

        this._onPress = this._onPress.bind(this);

    }

    _onPress() {
        this.props.onClick();
    }

    renderBottom() {
        var editButton = <View style={{ opacity: this.state.plus, justifyContent: 'center', alignItems: 'center' }}>
            <Icon name='arrows-alt' style={{ fontSize: 20, color: this.props.color }} />
        </View>

        return (
            <View style={[styles.bottom,
            {
                width: this.state.bottom_width,
                height: this.state.bottom_height,
                borderRadius: this.state.BottomBorderRadius
            }]}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: '300', marginTop:10, marginBottom: 10 }}>{this.props.title}</Text>
                </View>
            </View>
        )
    };

    render() {
        return (
            <View style={[styles.container, this.state.pressedStyle]}>
                <TouchableOpacity onPress={this._onPress}>
                    <View ref='container'  style={[{ alignItems: 'center' }]}>
                        {this.renderBottom()}
                    </View>
                </TouchableOpacity>
            </View>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        alignSelf: 'center',
    },
    top: {
        marginBottom: 0,
        backgroundColor: 'blue'
    },
    bottom: {
        marginTop: 2,
        padding: 8,
        backgroundColor: 'white',
        borderBottomWidth: 0,
        borderBottomColor: '#F0F0F0',
    },
    backButton: {
        position: 'absolute',
        backgroundColor: 'transparent',
        top: 32,
        left: 10,
    }
});