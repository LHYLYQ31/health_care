import React, {PureComponent} from 'react';
import {View, Image, Dimensions, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button} from 'react-native-elements';

const {width} = Dimensions.get('window');
export default class Register extends PureComponent {
    constructor(props) {
        super(props);
    };

    componentDidMount() {
        // this.fetchIndexArtical(1);
    };

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#eeeeee'}}>
                <View style={{flex: 1}}>
                    <Image source={require('../images/login_poster.jpg')} resizeMode={'contain'}/>
                </View>
                <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
                    <Input
                        placeholder='用户名'
                        leftIcon={
                            <Icon
                                name='user'
                                size={22}
                                color='black'
                                style={{marginRight: 10}}
                            />
                        }
                        inputContainerStyle={{borderColor:'transparent'}}
                        textContentType={'username'}
                        containerStyle={{width:width*0.7,backgroundColor: '#ffffff', borderRadius: 2,marginBottom:50}}
                    />
                    <Input
                        placeholder='密码'
                        leftIcon={
                            <Icon
                                name='lock'
                                size={22}
                                color='black'
                                style={{marginRight: 10}}
                            />
                        }
                        inputContainerStyle={{borderColor:'transparent'}}
                        textContentType={'password'}
                        containerStyle={{width:width*0.7,backgroundColor: '#ffffff', borderRadius: 2,marginBottom:50}}
                    />
                    <Button
                        title="登录"
                        buttonStyle={{width:width*0.7,borderRadius: 2,backgroundColor:'#1890ff',marginBottom:60}}
                        onPress={()=>{this.props.navigation.navigate('Home')}}
                    />
                    <View style={{width:width*0.7,alignItems:'flex-end'}}>
                        <Text style={{color:'#1890ff'}} onPress={()=>{this.props.navigation.navigate('Register')}}>注册新用户</Text>
                    </View>
                </View>
            </View>
        )
    };
}