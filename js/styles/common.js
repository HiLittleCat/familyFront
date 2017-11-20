'use strict';
/**
 * @class StylesCommon
 * @desc 通用样式
 * */

import React from 'react';
import {
  StyleSheet,
  PixelRatio,
  Dimensions,
} from 'react-native';
var cell_w = Dimensions.get('window').width;
var styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: 'white'
    },
    textCenter: {
        textAlign: 'center',
        flex: 1,
    },
    textAli: {
        textAlign: 'right',
    },

    justAlign: {
        alignItems: 'center', 
        justifyContent: 'center',
    },

    modal: {
        height: 100,
        width: 100,
        backgroundColor: '#FFF',
    },

    viewList: {
        padding: 10,
        fontSize: 15,
    },

    flexRow: {
        flexDirection: 'row',
    },
    textCommon: {
        color: '#333',
        fontSize: 18
    },
    shadow:{
        shadowOffset: {width: 5, height: 5},
        shadowColor: 'black',
        shadowOpacity: .3,
        shadowRadius: 5
    }

});
module.exports = styles;
