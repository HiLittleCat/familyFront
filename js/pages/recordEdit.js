import React, { Component } from 'react';
import {
    Animated,
    ActivityIndicator,
    Dimensions,
    Easing,
    View,
    Image,
    StyleSheet,
    Text,
    TextInput
} from 'react-native';
import { connect } from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import { Button } from 'native-base';
import { updateUserTag, removeUserTag, clearStatus } from '../actions/userTag';
import commonStyle from '../styles/common';


const { width, height } = Dimensions.get('window');

class RecordEdit extends Component {

    constructor(props) {
        super(props);
        visibilityType = 0;
        let visibility = this.props.navigation.state.params.visibility;
        if (visibility == null || visibility.length == 0) {
            visibilityType = 0;
        } else if (visibility.length == 1) {
            visibilityType = 1;
        } else {
            visibilityType = 2;
        }
        this.state = {
            ...this.props.navigation.state.params,
            visibilityType
        };
        this.updateTag = this.updateTag.bind(this);
        this.removeTag = this.removeTag.bind(this);
        this.setVisbility = this.setVisbility.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.time != nextProps.time && nextProps.status == 'DELETE_TAG_ERROR') {
            this.dropdown.alertWithType('error', '删除未成功', nextProps.message);
            return false;
        } else if (this.props.time != nextProps.time && nextProps.status == 'UPDATE_TAG_ERROR') {
            this.dropdown.alertWithType('error', '修改未成功', nextProps.message);
            return false;
        } else if (this.props.time != nextProps.time && nextProps.status == 'DELETE_TAG_OK') {
            this.dropdown.alertWithType('success', '删除成功', '删除成功');
            return false;
        } else if (this.props.time != nextProps.time && nextProps.status == 'UPDATE_TAG_OK') {
            this.dropdown.alertWithType('success', '修改成功', '修改成功');
            return false;
        }
        return true;
    }

    updateTag() {
        if (!this.state.userId || !this.state._id || !this.state.type) {
            this.dropdown.alertWithType('warn', '输入错误', '缺少用户信息');
            return false;
        }
        if (!this.state.content) {
            this.dropdown.alertWithType('warn', '输入错误', '内容必须输入');
            return false;
        }
        if (this.props.navigation.state.params.content == this.state.content && this.props.navigation.state.params.visibility == this.state.visibility) {
            this.dropdown.alertWithType('warn', '输入错误', '没有修改');
            return false;
        }
        let opt = {
            userId: this.state.userId,
            id: this.state._id,
            type: this.state.type,
            content: this.state.content,
            visibility: this.state.visibility
        };
        this.props.dispatch(updateUserTag(opt));
    }

    removeTag() {
        if (!this.state.userId || !this.state._id || !this.state.type) {
            this.dropdown.alertWithType('warn', '输入错误', '缺少用户信息');
            return;
        }

        let opt = {
            userId: this.state.userId,
            id: this.state._id,
            type: this.state.type,
        };
        this.props.dispatch(removeUserTag(opt));
    }

    setVisbility(value) {
        if (value == 0) {
            this.state.visibility = [];
        } else if (value == 1) {
            this.state.visibility = [this.state.userId];
        } else{

        }
    }

    render() {
        return (
            <View style={[commonStyle.wrapper, styles.container]}>
                <View style={{ position: 'absolute', width: width, height: 100, backgroundColor: 'black' }}></View>
                <View style={{ backgroundColor: 'white', flex: 1, padding: 8, marginTop: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: '300', color: '#666', paddingTop: 12 }}>{this.state.name} </Text>
                    <TextInput
                        style={{ height: 180, borderColor: '#EEE', borderWidth: 1, marginTop: 20, marginBottom: 20, padding: 8, fontSize: 18, fontWeight: '300', color: '#333' }}
                        onChangeText={(content) => this.setState({ content })}
                        defaultValue={this.state.content}
                        multiline={true}
                        maxLength={200}
                    />
                    <RadioGroup onSelect={(index, value) => this.setVisbility(index, value)} selectedIndex={this.state.visibilityType}>
                        <RadioButton value={0} ><Text style={{ color: 'green' }}>公开</Text></RadioButton>
                        <RadioButton value={1}><Text style={{ color: 'red' }}>保密</Text></RadioButton>
                        <RadioButton value={2} disabled={true}><Text style={{ color: '#400227' }}>对部分家庭成员公开</Text></RadioButton>
                    </RadioGroup>

                    <Button primary full style={styles.btn} onPress={this.updateTag}><Text style={styles.btnText}> 保存修改 <Icon name='edit' style={{ fontSize: 18 }} /> </Text></Button>
                    <Button danger full style={styles.btn} onPress={this.removeTag}><Text style={styles.btnText}> 删除 <Icon name='remove' style={{ fontSize: 18 }} /> </Text></Button>
                </View>
                <DropdownAlert ref={(ref) => this.dropdown = ref} closeInterval={2000} messageStyle={{ marginTop: 10, fontSize: 18, color: 'white' }} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 4 },
    btn: { marginTop: 10, borderRadius: 0 },
    textNormal: { fontSize: 18, color: '#000', fontWeight: '300' },
    textNoramlActive: { fontSize: 18, color: '#0E48BE', fontWeight: '300' },
    textSmall: { fontSize: 16, color: '#333' },
    textTint: { fontSize: 16, color: '#666' },
    btn: { marginTop: 10 },
    btnText: { fontSize: 18, fontWeight: '300', color: '#FFF' },
})


function select(store, ownProps) {
    return {
        isLoggedIn: store.userStore.isLoggedIn,
        status: store.tag.status,
        message: store.tag.message,
        time: store.tag.time
    }
}
export default connect(select)(RecordEdit);
