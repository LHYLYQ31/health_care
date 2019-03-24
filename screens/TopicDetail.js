/*
 * 文章详情
 * 页面元素 标题 发起人 点赞数 发表时间 点赞人员列表 讨论区
 *
 */
import React, {Component} from 'react';
import {
    StyleSheet, Text, View, Modal,
    Platform, TouchableOpacity, Dimensions, Image, ScrollView, FlatList, TextInput,
    ActivityIndicator, TouchableWithoutFeedback, Keyboard, DeviceEventEmitter, Alert, Linking
} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const {height, width} = Dimensions.get('window');
const SCREEN = width < 600 ? 6 : 10;
const MARGIN = (SCREEN - 2) * 20;
const headSize = (width - MARGIN) / SCREEN;
let commentPage = 1;

class TopicDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topicId: '',//props.navigation.state.params.topicId,
            topicInfo: {},
            commentList: [],//评论列表
            inviteContent: '',//评论全部内容
            placeholder: '',//占位文字
            commentPid: 0,
        }
    };

    componentDidMount() {
        // this._getTopicDetails();
        // this.keyboardDidShowListener = Keyboard.addListener('keyboardDidHide', () => {
        // 	this.setState({
        // 		inviteContent: '',//评论内容清空
        // 		commentPid: 0,
        // 	}, () => {
        // 		this.refs.commentInput.blur();
        // 	})
        // });
    };

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        commentPage = 1;
    }

    _getTopicDetails = () => {
        let params = {
            ticket: this.state.ticket,
            uuId: this.state.uuid,
            userId: this.state.basic.userId,
            jidNode: this.state.basic.jidNode,
            topicId: this.state.topicId,
            type: this.state.isLZ
        };
        FetchUtil.netUtil(Path.getTopicDetail + ParamsDealUtil.toGetParams(params), {}, 'GET', this.props.navigation, '', (data) => {
            if (data === "tip") {
                // this._toast('提交会题失败！');
                this.refs.toast.show('获取文章详情失败！', DURATION.LENGTH_SHORT);
            } else if (data.code.toString() == '200') {
                this.setState({
                    topicInfo: data.data.topicInfo,
                    isLike: data.data.islike,
                    liskNum: data.data.liskNum,
                    invitePeople: data.data.likeList,
                    updateFiles: data.data.topicAttachmentList,
                    commentList: data.data.discussList
                }, () => {
                    // this.forCommentList(data.data.discussList);
                    this._commentListMap(this.state.commentList);
                    this.forDiscussList(data.data.topicAttachmentList);
                    // this.refs.topicHeader._changeHeaderTitle(this.state.topicInfo.title);
                });
            }
        });
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
                    centerComponent={{text: '文章详情', style: {color: '#fff', fontSize: 18}}}
                />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    onScroll={this._scrollInviteDetails}
                    keyboardDismissMode={'on-drag'}>
                    <View style={styles.inviteInfor}>
                        <Text style={styles.inforTitle}>{this.state.topicInfo.title}</Text>
                        <Text style={styles.inforTitle}>{this.state.topicInfo.content}</Text>
                        <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 10}}>
                            <View style={{flex: 1, alignItems: 'center', flexDirection: 'row'}}>
                                <Image
                                    source={require('../images/default_poster.jpg')}
                                    // source={{
                                    //     uri: Path.headImgNew + '?uuId=' + this.state.uuid + '&ticket=' + this.state.ticket + '&userId=' + this.state.basic.userId + '&imageName=' + this.state.topicInfo.photoId + '&imageId=' + this.state.topicInfo.photoId + '&sourceType=singleImage&jidNode='
                                    //     // uri: Path.headImg + '?fileName=' + this.state.topicInfo.createUser + '&uuId=' + this.state.uuid + '&ticket=' + this.state.ticket + '&userId=' + this.state.basic.userId
                                    // }}
                                    style={{width: 30, height: 30, marginRight: 5}}/>
                                <Text style={{
                                    fontSize: 11,
                                    color: '#999'
                                }}>{`${this.state.topicInfo.nickName}发表于 ${this.state.topicInfo.createTime}`}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.inviteBox, {
                        backgroundColor: '#f0f0f0',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }]}>
                        <Text style={[styles.inviteTitle, {flex: 1}]}>发表评论</Text>
                    </View>
                    <View style={[styles.inviteBox, {flex: 1}]}>
                        {
                            this.state.commentList.map((item, index) => {
                                // console.log(item);
                                return <View key={index}
                                             style={[styles.inviteGroup, index == 0 ? {borderTopColor: 'transparent'} : null]}>
                                    <Image
                                        source={require('../images/default_poster.jpg')}
                                        // source={{
                                        //     uri: Path.headImgNew + '?uuId=' + this.state.uuid + '&ticket=' + this.state.ticket + '&userId=' + this.state.basic.userId + '&imageName=' + item.photoId + '&imageId=' + item.photoId + '&sourceType=singleImage&jidNode='
                                        // }}
                                        style={styles.inviteHeadImg}/>
                                    <View style={{flex: 1, marginLeft: 10}}>
                                        <View style={{flexDirection: 'row', paddingLeft: 6}}>
                                            <Text style={{
                                                fontSize: 15,
                                                color: '#333',
                                                flex: 1
                                            }}>{item.toUserName ? `${item.fromUserName} 评论 ${item.toUserName}` : `${item.fromUserName} 发表`}</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => {
                                            () => {
                                                this.setState({
                                                    commentPid: item.id,
                                                    inviteContent: ''
                                                }, () => {
                                                    this.refs.commentInput.focus();
                                                });
                                            }
                                        }}>
                                            <Text style={{
                                                fontSize: 13,
                                                paddingLeft: 6
                                            }}>{item.content.replace(/<br\/>/g, '')}</Text>
                                            <View style={{flexDirection: 'row'}}>
                                                <Text
                                                    style={styles.commitTime}>{item.createTime.substring(0, item.createTime.lastIndexOf(':'))}</Text>
                                                <Text style={styles.replyBtn}>回复</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            })
                        }
                        {this._commentFooter()}
                    </View>
                </ScrollView>
                <View style={styles.inviteComment}>
                    <TextInput
                        ref={'commentInput'}
                        style={styles.inviteCommentInput}
                        multiline={true}
                        value={this.state.inviteContent}
                        onChangeText={(text) => this.setState({
                            inviteContent: text,
                        })}
                        onBlur={() => {
                            this.setState({
                                inviteContent: '',//评论内容清空
                                commentPid: 0,
                            })
                        }}
                        placeholder={'请输入评论内容'}
                        underlineColorAndroid={'transparent'}/>
                    <TouchableOpacity style={styles.btn} onPress={() => {
                        this._inviteComment()
                    }}>
                        <Text style={{fontSize: 14, color: '#fff'}}>评论</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    //提交评论或回复
    _inviteComment = () => {//提交评论 有pid是回复
        let pid = this.state.commentPid;
        let content = this.state.inviteContent;
        let placeholder = this.state.placeholder;
        this.refs.commentInput.blur();
        let body = {
            jidNode: this.state.basic.jidNode,
            topicId: this.state.topicInfo.id,
            pid: pid,
            content: content
        };
        if (content == '' || content == placeholder) {
            this._toast('评论内容不能为空');
        } else if (ToolUtil.isEmojiCharacterInString(content)) {
            this._toast('评论内容不能包含非法字符');
        } else {
            if (this.state.topicInfo.id) {
                FetchUtil.netUtil(Path.saveTopicDiscuss, body, 'POST', this.props.navigation, {
                    ticket: this.state.ticket,
                    userId: this.state.basic.userId,
                    uuId: this.state.uuid
                }, (responseJson) => {
                    if (responseJson === "tip") {
                        this._toast('评论失败！');
                        // this.refs.toast.show('获取联系人失败！', DURATION.LENGTH_SHORT);
                    } else if (responseJson.code.toString() == '200') {
                        this.setState({
                            inviteContent: '',
                            commentPid: 0,
                        }, () => {
                            DeviceEventEmitter.emit('topicAddPage');//刷新文章列表
                            this._getTopicDetails();
                        });
                    }
                })
            } else {
                this._toast('正在加载，请稍等');
            }
        }
    };
    //点赞人员遍历
    _inviteHeadItem = ({item, index}) => {
        // console.log(item);
        return (
            <TouchableOpacity
                key={index}
                style={[styles.inviteHeadImg, index % (SCREEN - 1) < (SCREEN - 2) ? {marginRight: 10} : null]}
                onPress={() => {
                    () => {
                        this.props.navigation.navigate('FriendDetail', {
                            ticket: this.state.ticket,
                            uuid: this.state.uuid,
                            friendJidNode: item.createUser,
                            tigRosterStatus: 'both',
                            basic: this.state.basic
                        });
                    }
                }}>
                <Image
                    source={require('../images/default_poster.jpg')}
                    // source={{
                    //     uri: Path.headImgNew + '?uuId=' + this.state.uuid + '&ticket=' + this.state.ticket + '&userId=' + this.state.basic.userId + '&imageName=' + item.photo + '&imageId=' + item.photo + '&sourceType=singleImage&jidNode='
                    //     // uri: Path.headImg + '?fileName=' + item.createUser + '&uuId=' + this.state.uuid + '&ticket=' + this.state.ticket + '&userId=' + this.state.basic.userId
                    // }}
                    style={{width: headSize, height: headSize, borderRadius: 4}}/>
            </TouchableOpacity>
        )
    };

    _commentFooter() {
        let foot;
        if (this.state.commentShowFoot == 0) {
            foot = <TouchableOpacity style={styles.footer} onPress={() => {
            }}>
                <Text style={styles.footerText}>还没有评论</Text>
            </TouchableOpacity>
        } else if (this.state.commentShowFoot == 1) {
            foot = <View style={styles.footer}>
                <Text style={styles.footerText}>没有更多评论了</Text>
            </View>
        } else if (this.state.commentShowFoot == 2) {
            foot = <View style={styles.footer}>
                <Text style={styles.footerText}>上拉加载更多</Text>
            </View>
        } else if (this.state.commentShowFoot == 3) {
            foot = <View style={styles.footer}>
                <ActivityIndicator/>
                <Text style={styles.footerText}>正在加载更多...</Text>
            </View>
        }
        return foot;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        position: 'relative'
    },
    inviteBox: {
        flex: 1,
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15
    },
    inviteInfor: {
        paddingTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#FFFFFF',
    },
    inforTitle: {
        fontSize: 16,
        color: '#333',
        paddingBottom: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    btn: {
        padding: 3,
        paddingLeft: 8,
        paddingRight: 8,
        backgroundColor: '#3498db',
        borderRadius: 4,
        marginLeft: 10,
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginTop: 5,
        marginBottom: 5
    },
    inviteHeadImg: {
        width: headSize,
        height: headSize,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderRadius: 4
    },
    headMoreBtn: {
        width: headSize,
        height: headSize,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        top: 0,
    },
    inviteTitle: {
        color: '#333',
        fontSize: 16,
        borderLeftColor: '#ff9226',
        borderLeftWidth: 5,
        paddingLeft: 8
    },
    onlyTitle: {
        color: '#333',
        fontSize: 12
    },
    inviteComment: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        paddingLeft: 15,
        paddingRight: 15,
        borderTopColor: '#d7d7d7',
        borderTopWidth: 1,
    },
    inviteCommentInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#e1e1e1',
        borderRadius: 4,
        backgroundColor: '#f0f0f0',
        padding: 2,
        paddingLeft: 8,
        paddingRight: 8,
        lineHeight: 24,
    },
    inviteGroup: {
        flexDirection: 'row',
        marginBottom: 10,
        borderTopWidth: 1,
        borderTopColor: '#ebebeb',
        paddingTop: 10,
    },
    inviteFileIcon: {
        width: 26,
        height: 26,
        marginRight: 5,
        marginLeft: 5
    },
    inviteFileInfor: {
        flex: 1,
        justifyContent: 'center',
    },
    footer: {
        flexDirection: 'row',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    footerText: {
        fontSize: 14,
        color: '#999'
    },
    replyView: {
        flex: 1,
        paddingLeft: 6
    },
    commitTime: {flex: 1, marginRight: 10, textAlign: 'right', fontSize: 11, color: '#aaa'},
    replyBtn: {fontSize: 13, color: '#6173ff'},
});

export default TopicDetail;
