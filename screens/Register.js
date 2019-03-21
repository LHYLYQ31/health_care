import React, { PureComponent } from 'react';
import {View, Image, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

const { width, height } = Dimensions.get('window');
export default class Register extends PureComponent{
    constructor(props){
        super(props);
    };
    componentDidMount(){
        // this.fetchIndexArtical(1);
    };
    render(){
        return (
            <View style={{flex:1,backgroundColor:'#eeeeee'}}>
                <View style={{flex:1}}>
                    <Image source={require('../images/login_poster.jpg')} resizeMode={'contain'}/>
                </View>
                <View style={{flex:2,justifyContent: 'center',alignItems:'center'}}>
                    <View style={{width:width*0.8,padding:20, backgroundColor:'#ffffff',borderRadius:4,justifyContent: 'center',alignItems:'center'}}>
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
                            underlineColorAndroid={'transparent'}
                            textContentType={'username'}
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
                            underlineColorAndroid={'transparent'}
                            textContentType={'password'}
                        />
                    </View>
                </View>
            </View>
        )
    };
}