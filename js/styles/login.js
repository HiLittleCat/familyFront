'use strict';
/**
 * @class 
 * @desc login
 * */
import {
  StyleSheet,
  PixelRatio,
  Dimensions,
} from 'react-native';
var cell_w = Dimensions.get('window').width;
var styles = StyleSheet.create({
  

  imgWrap: {
    flexDirection: 'row',
    flex: 1,
  },

  loginMain: {
    flex: 1,
  },

  familyLogo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  },

  loginMainCon: {
    position: 'absolute',
    top: 60,
    left: (cell_w - 320) / 2,
    height: 330,
  },

  comCulture: {
    width: 320,
    marginTop: 50,
  },

  logoImg: {
    position: 'absolute',
    top: 0,
    left: cell_w / 7,
    width: cell_w / 7 * 5,
    resizeMode: 'contain',
  },

  formStyle: {
    marginTop: 30,
    width: 300,
    height: 120,
    borderRadius: 0,
  },


  formStyleRegister: {
    marginTop: 30,
    marginLeft: 10,
    width: 300,
    height: 230,
    borderRadius: 0,
  },

  formInput: {
    flexDirection: 'row',
    height: 70
  },

  loginInput: {
    height: 30,
    borderColor: '#000',
    flex: 1,
    fontSize: 18,
  },

  link: {
    flexDirection: 'row',
    marginTop: 30
  },

  linkLeft:{
    position: 'relative',
    width: 160,
    height: 50,
    textAlign: 'left', 
    color: '#62a2e0', 
  },

  linkRight: { 
    position: 'relative',
    width: 160,
    height: 50,
    textAlign: 'right', 
    color: '#62a2e0', 
  },

  btnWrap: {
    marginTop: 30,
    height: 40,
    backgroundColor: '#FFF',
  },

  btn:{
    borderRadius: 5
  },
  
  btnText:{
    fontSize: 18,
    color:'#FFF'
  }
})


module.exports = styles;
