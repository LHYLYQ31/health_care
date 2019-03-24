import React, {PureComponent} from 'react';
import {
    Text, View, TouchableOpacity, Image, Dimensions, FlatList
} from 'react-native';
import {Card, ListItem, Button, Icon, Header} from 'react-native-elements'

const {width} = Dimensions.get('window');

export default class AllDoctor extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            doctors: []
        }
    }

    componentDidMount() {
        this.setState({
            doctors: [
                {
                    id:1,
                    name: 'brynn',
                    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
                    hospital: '南湘雅南湘雅南湘雅南湘雅南湘雅南湘雅南湘雅南湘雅'
                },
                {
                    id:2,
                    name: 'brynn',
                    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
                    hospital: '南湘雅南湘雅南湘雅南湘雅南湘雅南湘雅南湘雅'
                },
                {
                    id:3,
                    name: 'brynn',
                    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
                    hospital: '北协和北协和北协和北协和北协和北协和北协和北协和北协和北协和北协和北协和北协和北协和北协和北协和'
                },
                {
                    id:4,
                    name: 'brynn',
                    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
                    hospital: '北协和北协和北协和北协和北协和北协和北协和北协和北协和北协和'
                },
                {
                    id:5,
                    name: 'brynn',
                    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
                    hospital: '北协和北协和北协和北协和'
                },
                {
                    id:6,
                    name: 'brynn',
                    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
                    hospital: '北协和'
                }
            ]
        })
    }

    _renderDoctors = ({item, index}) => {
        console.log(item.id);
        return (
            <Card title={item.name} key={item.id}>
                <View style={{flex:1}}>
                    <Image
                        style={{height:240}}
                        resizeMode="cover"
                        source={require('../images/default_poster.jpg')}
                    />
                    <Text style={{marginBottom: 10,marginTop:10,fontSize: 16}}>
                        {item.hospital}
                    </Text>
                    <Button
                        backgroundColor='#03A9F4'
                        buttonStyle={{borderRadius: 2, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        title='点击咨询' />
                </View>
            </Card>
        )
    };

    render() {
        const {doctors} = this.state;
        return (
            <View style={{flex: 1}}>
                <Header
                    placement="left"
                    leftComponent={
                        <Icon
                            name='arrow-left'
                            type='font-awesome'
                            color='#ffffff'
                            onPress={() => this.props.navigation.goBack()}
                        />
                    }
                    centerComponent={{text: '医生列表', style: {color: '#fff', fontSize: 18}}}
                />
                <FlatList
                    data={doctors}
                    renderItem={this._renderDoctors}
                    refreshing={false}
                    style={{marginBottom: 20}}
                />
            </View>
        )
    }
}