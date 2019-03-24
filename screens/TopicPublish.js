/*
 * 文章发布
 * 页面元素 标题 内容 上传附件
 *
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Platform,
    TouchableWithoutFeedback,
    DeviceEventEmitter,
    TouchableOpacity, Keyboard,
    NativeModules,
    ScrollView,
    PermissionsAndroid, Alert, BackHandler
} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import Icons from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const inputComponents = [], ACT_HEIGHT = 38;
let onceSubmit;

class TopicPublish extends Component {
    constructor(props) {
        super(props);

        this.state = {
            topicBody: {
                title: '',
                content: '',
                fileName: ''
            },
        }
    };

    componentDidMount() {

    }

    //处理TextInput失焦聚焦问题 start
    _onStartShouldSetResponderCapture(event) {
        let target = event.nativeEvent.target;
        if (!inputComponents.includes(target)) {
            Keyboard.dismiss();
        }
        return false;
    };

    _inputOnLayout(event) {
        inputComponents.push(event.nativeEvent.target);
    };

    //处理TextInput失焦聚焦问题 end

    _inputInvite = (text, key) => {
        let body = this.state.topicBody;
        body[key] = text;
        this.setState({
            topicBody: body
        }, () => {
            console.log(this.state.topicBody)
        });
    };

    //提交文章
    submitTopic = () => {
        let body = this.state.topicBody;
        body['key'] = onceSubmit;
        if (body.title == '') {
            this._toast('文章标题不得为空');
        } else if (body.title.length > 32) {
            this._toast('标题长度不得超过32位');
        } else if (body.content == '') {
            this._toast('内容不得为空');
        } else if (body.content.length > 60000) {
            this._toast('内容长度不得超过6万位');
        } else if (ToolUtil.isEmojiCharacterInString(body.content)) {
            this._toast('内容不得含有非法字符');
        } else {
            // FetchUtil.netUtil(Path.getTopicPublish, body, 'POST', this.props.navigation, {
            //     uuId: this.state.uuid,
            //     ticket: this.state.ticket,
            //     userId: this.state.basic.userId
            // }, (responseJson) => {
            //     if (responseJson === "tip") {
            //         this._toast('提交会题失败！');
            //         // this.refs.toast.show('获取联系人失败！', DURATION.LENGTH_SHORT);
            //     } else if (responseJson.code.toString() == '200') {
            //         let msgBody = this.state.messageBody;
            //         msgBody.topicId = responseJson.data.topicId;
            //         msgBody.content.title = body.title;
            //         msgBody.id = newMsgId;
            //
            //         this.setState({
            //             messageBody: msgBody
            //         }, () => {
            //             if (Platform.OS === 'ios') {
            //                 XMPP.XMPPSendGroupMessage({
            //                         'message': this.state.messageBody,
            //                         'jid': this.state.room.roomJid,
            //                         'uuid': this.state.uuid
            //                     },
            //                     (error, event) => {
            //                         if (error) {
            //                             this._toast(error);
            //                         } else {
            //                             DeviceEventEmitter.emit('topicAddPage');
            //                         }
            //                     })
            //
            //             } else {
            //                 DeviceEventEmitter.emit('topicAddPage');
            //                 // DeviceEventEmitter.emit('noticeChatPage', {body: this.state.messageBody, type: 'topic'});
            //             }
            //             this.props.navigation.goBack();
            //         });
            //     }
            // });
        }
    };

    render() {
        return (
            <View style={styles.container}>
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
                    centerComponent={{text: '文章发表', style: {color: '#fff', fontSize: 18}}}
                />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    keyboardShouldPersistTaps={'always'}
                    style={{flex: 1, backgroundColor: 'white', paddingLeft: 15, paddingRight: 15}}>
                    <View style={[styles.voteGroup, {borderTopColor: 'transparent'}]}
                          onStartShouldSetResponderCapture={this._onStartShouldSetResponderCapture.bind(this)}>
                        <Text style={styles.voteTitle}>文章标题</Text>
                        <TextInput ref={'voteTitle'}
                                   onLayout={this._inputOnLayout.bind(this)}
                                   style={styles.voteInput}
                                   value={this.state.topicBody.title}
                                   underlineColorAndroid={'transparent'}
                                   maxLength={32}
                                   placeholder='请输入文章标题'
                                   onChangeText={(text) => this._inputInvite(text, 'title')}/>
                    </View>
                    <View style={[styles.voteGroup, {flexDirection: 'column', marginBottom: 10}]}
                          onStartShouldSetResponderCapture={this._onStartShouldSetResponderCapture.bind(this)}>
                        <Text style={styles.voteTitle}>文章内容</Text>
                        <View style={{flex: 1, borderWidth: 1, borderColor: '#f0f0f0'}}
                              onStartShouldSetResponder={() => this.refs.textArea.focus()}>
                            <TextInput ref="textArea"
                                       style={{fontSize: 16, padding: 2, height: 100, textAlignVertical: 'top'}}
                                       onLayout={this._inputOnLayout.bind(this)}
                                       multiline={true}
                                       numberOfLines={10}
                                       maxLength={60000}
                                       placeholder='请输入文章内容'
                                       underlineColorAndroid={'transparent'}
                                       onChangeText={(text) => this._inputInvite(text, 'content')}
                            />
                        </View>
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={() => {
                        this.submitTopic()
                    }}>
                        <Text style={{fontSize: 15, color: '#fff'}}>发表</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, {backgroundColor: '#979394'}]} onPress={() => {
                        () => {
                            this.props.navigation.goBack();
                        }
                    }}>
                        <Text style={{fontSize: 15, color: '#fff'}}>取消</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#FFFFFF'},
    voteGroup: {
        flexDirection: 'row',
        borderTopColor: '#ccc',
        borderTopWidth: 1,
        paddingTop: 5,
        paddingBottom: 5,
    },
    voteTitle: {
        fontSize: 16,
        color: '#333',
        height: ACT_HEIGHT,
        lineHeight: ACT_HEIGHT,
    },
    voteInput: {
        flex: 1,
        textAlign: 'right',
        fontSize: 16,
        padding: 0,
    },
    btn: {
        height: 43,
        borderRadius: 4,
        backgroundColor: '#4e71ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 14,
    }
});
export default TopicPublish;
