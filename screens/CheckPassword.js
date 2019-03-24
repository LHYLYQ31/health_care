import React, {Component} from 'react';
import {
	DeviceEventEmitter,
	Platform,
	StyleSheet,
	TextInput,
	NativeModules,
	View,BackHandler,
	Alert
} from 'react-native';
import {Header, Icon} from 'react-native-elements';
let lastPresTime = 1;
export default class CheckPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '',
		}
	};

	//组件渲染完毕时调用此方法
	componentDidMount() {
	};
	componentWillUnmount() {
	}

	submitPassword = () => {
		this.refs.Password.blur();
	};

	checkPassword = (text) => {

		this.body = {
			userName: this.state.basic.userName,
			passWord: text
		};

		this.setState({
			text: text
		})
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
                    centerComponent={{text: '验证密码', style: {color: '#fff', fontSize: 18}}}
                />
				<View style={styles.textInput}>
					<TextInput
						ref="Password"
						style={{flex: 1, color: 'black', padding: 0, marginLeft: 12}}
						placeholder={'请输入加密密码'}
						placeholderTextColor={'#ccc'}
						underlineColorAndroid="transparent"
						onChangeText={(text) => this.checkPassword(text)}
						value={this.state.text}
					/>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'rgba(240,240,240,1)'
	},
	textInput: {
		backgroundColor: 'white',
		height: 40,
		marginTop: 20
	}
});