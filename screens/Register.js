import React, { PureComponent } from 'react';
import {View, Image, Text} from 'react-native';

export default class Register extends PureComponent{
    constructor(props){
        super(props);
    };
    componentDidMount(){
        // this.fetchIndexArtical(1);
    };
    render(){
        return (
            <View style={{flex:1}}>
                <View style={{flex:1,backgroundColor:'tomato'}}>
                    <Image source={require('../images/login_poster.jpg')} resizeMode={'contain'}/>
                </View>
                <View style={{flex:2,justifyContent: 'center',alignItems:'center'}}>
                    <Text>{'1223'}</Text>
                </View>
            </View>
        )
    };
}