import React, {Component} from 'react';
import {
    Platform, StyleSheet,
    Text, View, Image, TouchableOpacity, Alert,
    Dimensions, DeviceEventEmitter, NetInfo,
    ScrollView, Linking
} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import Icons from 'react-native-vector-icons/Ionicons';
import {StackActions, NavigationActions} from 'react-navigation';
const {width} = Dimensions.get('window');

export default class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            nickName: '',
            email: '',
            cell: '',
            class: '',
            sex: null,
        }
    };

    //组件渲染完毕时调用此方法
    componentDidMount() {
        // this.fetchData();
    };

    fetchData = () => {

        NetInfo.isConnected.fetch().done((isConnected) => {
            if (isConnected) {
                let url = Path.setting + '?uuId=' + this.state.uuid + '&ticket=' + this.state.ticket + '&userId=' + this.state.basic.userId + '&currentUid=' + this.state.basic.uid + '&friendUserId=' + this.state.basic.userId;
                FetchUtil.netUtil(url, {}, 'GET', this.props.navigation, '', (responseJson) => {
                    console.log(responseJson);
                    let branchName;
                    responseJson.data.positionDeptVos.map((item) => {
                        if (item.empType == '0') {
                            branchName = item.branchName;
                        }
                    });

                    this.setState({
                        userName: responseJson.data.userName,
                        nickName: responseJson.data.nickName,
                        email: responseJson.data.email,
                        cell: responseJson.data.cell,
                        photoId: responseJson.data.photoId,
                        sex: responseJson.data.sex,
                        class: branchName
                    });
                })
            } else {
                // this.refs.settingHeader._changeHeaderTitle('我的(无连接)');
                this.refs.toast.show('请检查当前网络状态！', DURATION.LENGTH_SHORT);
            }
        });


    };

    _logout = () => {
        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'Login'}),
            ]
        }))
    };

    //设置头像
    // resetHeadImage = () => {
    //     if (Platform.OS == 'android') {
    //         // this._checkPermission(true);
    //         PermissionUtil.requestAndroidPermission(
    //             [PermissionsUtil.Permissions.read, PermissionsUtil.Permissions.write, PermissionsUtil.Permissions.camera], (value) => {
    //                 if (typeof value == "boolean" && value) {
    //                     this.openImagePicker();
    //                 } else if (typeof value == "boolean" && !value) {
    //                     Alert.alert(
    //                         '提醒',
    //                         '修改头像前，请先开启相机权限！',
    //                         [
    //                             {
    //                                 text: '确定',
    //                             }
    //                         ]
    //                     )
    //                 } else if (typeof value == "object") {
    //                     let status = true;
    //                     for (let key in value) {
    //                         if (!value[key]) {
    //                             status = false;
    //                         }
    //                     }
    //                     console.log("=================");
    //                     console.log(status);
    //                     if (status) {
    //                         this.openImagePicker();
    //                     } else {
    //                         Alert.alert(
    //                             '提醒',
    //                             '修改头像前，请先开启相机权限！',
    //                             [
    //                                 {
    //                                     text: '确定',
    //                                 }
    //                             ]
    //                         )
    //                     }
    //                 } else {
    //                     //console.log(value);
    //                 }
    //             }
    //         );
    //     } else {
    //         this.openImagePicker();
    //     }
    // };

    // openImagePicker = () => {
    //     let photoOptions = {
    //         //底部弹出框选项
    //         title: '请选择',
    //         cancelButtonTitle: '取消',
    //         takePhotoButtonTitle: '拍照',
    //         chooseFromLibraryButtonTitle: '打开相册',
    //         cameraType: 'back',
    //         quality: 1,
    //         // maxWidth: 36,
    //         // maxHeight: 36,
    //         allowsEditing: false,
    //         noData: false,
    //         storageOptions: {
    //             skipBackup: true,
    //             path: 'file'
    //         }
    //     };
    //
    //     //打开图像库：
    //     ImagePickerManager.showImagePicker(photoOptions, (response) => {
    //         cookie.save('isUpload', 1);//用于判断是否为选择文件后台状态
    //         // console.log(response);
    //         if (response.didCancel) {
    //             //选择了取消
    //         } else {
    //             if (response.error) {
    //                 console.log('FilePickerManager Error: ', response.error);
    //                 this._toast('您选择的图片异常，请更换有效图片再试！');
    //                 return;
    //             }
    //
    //             let imageType;
    //             if (response.fileName && response.fileName.indexOf('HEIC') == -1) {
    //                 imageType = response.fileName.substr(response.fileName.lastIndexOf('.') + 1);
    //             } else {
    //                 imageType = response.uri.substr(response.uri.lastIndexOf('.') + 1);
    //             }
    //             const trueType = ['jpg', 'JPG', 'jpeg', 'JPEG', 'png', 'PNG', 'gif', 'GIF'];
    //             // console.log(response)
    //             if (trueType.indexOf(imageType) > -1) {
    //                 //与上一节中的代码相同！
    //                 // DeviceEventEmitter.emit('changeLoading', 'true');
    //                 let formData = new FormData();
    //                 let file = {
    //                     uri: response.uri,
    //                     type: 'multipart/form-data',
    //                     name: response.fileName && response.fileName.indexOf('HEIC') == -1 ? response.fileName : 'image.png'
    //                 };
    //                 formData.append("file", file);
    //                 this.refs.toast.show('头像更新中，请稍候...', DURATION.LENGTH_SHORT);
    //                 let url = Path.resetHeadImage + '?uuId=' + this.state.uuid + '&ticket=' + this.state.ticket + '&jidNode=' + this.state.basic.jidNode + '&userId=' + this.state.basic.userId;
    //                 fetch(url, {
    //                     method: 'POST',
    //                     headers: {
    //                         'Content-Type': 'multipart/form-data',
    //                     },
    //                     body: formData,
    //                 }).then((response) => response.json()).then((responseData) => {
    //                     console.log(responseData);
    //                     if (responseData.code == "200") {
    //                         let result =  JSON.parse(responseData.data);
    //                         if(result.status == 'Fail'){
    //                             this.refs.toast.show(result.reg, DURATION.LENGTH_SHORT);
    //                         }else{
    //                             let photo = JSON.parse(responseData.data).photoId;
    //                             let basic = this.state.basic;
    //                             basic.photoId = photo;
    //                             // console.log(photo);
    //                             cookie.save('selfPhotoId', photo);
    //                             this.sendPhotoMsg(photo, basic);
    //                         }
    //                     }
    //                 }, () => {
    //                     // alert('success')
    //                     setTimeout(()=>{
    //                         this.refs.toast.show('头像更新失败！', DURATION.LENGTH_SHORT);
    //                     },3500);
    //                 }).catch((error) => {
    //                     this.refs.toast.show('头像更新失败！', DURATION.LENGTH_SHORT);
    //                 });
    //             } else {
    //                 this._toast('无效图片格式，仅支持“gif,jpeg,jpg,png”');
    //             }
    //         }
    //     });
    // }


    /*_checkCallPermission = () => {
        PermissionUtil.requestAndroidPermission(
            PermissionsUtil.Permissions.phone, (value) => {
                if (typeof value == "boolean" && value) {
                    Linking.openURL(`tel:${this.state.cell}`)
                } else if (typeof value == "boolean" && !value) {
                    Alert.alert(
                        '提醒',
                        '使用拨号功能前，请先开启电话权限！',
                        [
                            {
                                text: '确定',
                            }
                        ]
                    )
                }
            }
        );
    };*/

    render() {
        const {showAlert, tipMsg} = this.state;
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
                    centerComponent={{text: '个人中心', style: {color: '#fff', fontSize: 18}}}
                />
                <View style={{
                    position: 'relative',
                    alignItems: 'center',
                }}>
                    <Image
                        source={require('../images/default_poster.jpg')}
                        style={{
                            width: width,
                            height: width * 233 / 720,
                        }}
                    />
                    <View style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingLeft: 15,
                        paddingRight: 15,
                    }}>
                        <TouchableOpacity onPress={() => {
                            this.resetHeadImage()
                        }} style={{
                            borderRadius: Platform.OS == 'ios' ? 30 : 50,
                            backgroundColor: '#fff'
                        }}>
                            <Image
                                source={
                                    require('../images/default_poster.jpg')
                                    // uri: Path.headImgNew + '?imageName=' + this.state.photoId + '&imageId=' + this.state.photoId + '&sourceType=singleImage&jidNode=' + this.state.basic.jidNode + Global.parseBasicParam
                                }
                                style={{
                                    width: 60,
                                    height: 60,
                                    borderWidth: 1,
                                    borderRadius: Platform.OS == 'ios' ? 30 : 50,
                                    borderColor: '#fff'
                                }}/>
                        </TouchableOpacity>
                        <View style={{marginLeft: 15}}>
                            <Text style={{color: '#FFFFFF', marginBottom: 5}}>{'张三'}</Text>
                            <Text style={{color: '#FFFFFF'}}>{'zhangsan@163.com'}</Text>
                        </View>
                    </View>
                </View>
                <ScrollView>
                    <View style={{backgroundColor: '#fff', paddingLeft: 8}}>
                        <View style={styles.menuList}>
                            <View style={styles.icons}>
                                <Icons name={'ios-person'} size={22} color={'#8d8d8d'}/>
                            </View>
                            <View style={[styles.menuListText, {borderTopColor: 'transparent'}]}>
                                <Text style={styles.settingText}>{'张三'}</Text>
                            </View>
                        </View>
                        {
                            this.state.cell ?
                                <TouchableOpacity style={styles.menuList} onPress={() => {
                                    if (Platform.OS == 'android') {
                                        Alert.alert(
                                            '提醒',
                                            '确认拨打该号码',
                                            [
                                                {
                                                    text: '取消',
                                                },
                                                {
                                                    text: '呼叫',
                                                    onPress: () => {
                                                        alert('1');
                                                        // this._checkCallPermission();
                                                    }
                                                }
                                            ]
                                        )
                                    } else {
                                        Linking.openURL(`tel:${this.state.cell}`)
                                    }
                                }}>
                                    <View style={styles.icons}>
                                        <Icons name={'ios-phone-portrait'} size={22} color={'#2ed573'}/>
                                    </View>
                                    <View style={[styles.menuListText]}>
                                        <Text style={styles.settingText}>{'123456789'}</Text>
                                    </View>
                                </TouchableOpacity> : null
                        }
                        <View style={styles.menuList}>
                            <View style={styles.icons}>
                                {
                                    this.state.sex == 0 ?
                                        <Icons name={'md-male'} size={20} color={'#4bcffa'}/>
                                        : <Icons name={'md-female'} size={22} color={'#f8a5c2'}/>
                                }
                            </View>
                            <View style={[styles.menuListText]}>
                                <Text style={styles.settingText}>{this.state.sex == 0 ? '男' : '女'}</Text>
                            </View>
                        </View>
                        <View style={styles.menuList}>
                            <View style={styles.icons}>
                                <Icons name={'ios-git-network'} size={22} color={'#eccc68'}/>
                            </View>
                            <View style={[styles.menuListText]}>
                                <Text style={styles.settingText}>{this.state.class}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{backgroundColor: '#fff', marginTop: 10}}>
                        <TouchableOpacity
                            style={[styles.menuList, styles.menuTouch, {borderTopColor: 'transparent'}]}
                            onPress={() => {
                                this.props.navigation.navigate('CheckPassword');
                            }
                            }>
                            <Text style={[styles.settingText, {flex: 1}]}>健康信息</Text>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-end'
                            }}>
                                <Icons name={'ios-arrow-forward'} size={25} color={'#CCCCCC'}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{backgroundColor: '#fff', marginTop: 10, height: 48, marginBottom: 10}}>
                        <TouchableOpacity
                            style={[styles.menuList, styles.menuTouch, {borderTopColor: 'transparent'}]}
                            onPress={() => {
                                this._logout()
                            }}>
                            <Text style={[styles.settingText, {flex: 1, textAlign: 'center'}]}>退出登录</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        // paddingBottom: 20
    },
    menuList: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 48,
    },
    icons: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:'tomato'
        // marginLeft: 12,
        // marginRight: 10,
    },
    menuListText: {
        flex: 1,
        height: 48,
        justifyContent: 'center',
        borderTopWidth: 1,
        borderTopColor: '#cecece',
    },
    iconRight: {
        width: 10,
        textAlign: 'right',
        marginRight: 12,
    },
    btn: {
        height: 43,
        borderRadius: 4,
        backgroundColor: '#f00',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 14,
        marginLeft: 12,
        marginRight: 12
    },
    settingText: {
        lineHeight: 48,
        color: '#333',
        fontSize: 14,
    },
    menuTouch: {
        paddingLeft: 15,
        paddingRight: 15,
        borderTopColor: '#cecece',
        borderTopWidth: 1,
    },
});
