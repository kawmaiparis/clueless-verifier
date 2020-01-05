import React from 'react'

import { StyleSheet, Text, View, StatusBar, Button } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { primaryGradientArray } from '../utils/Colors'
import QRCode from 'react-native-qrcode'

import Header from '../components/Header.js'
import InputText from '../components/InputText.js'
import InputPassword from '../components/InputPassword.js'
import MyButton from '../components/MyButton.js'

class ShowQR extends React.Component {
	state = { qrValue: '' }
	static navigationOptions = {
		headerTransparent: true
	}

	componentWillMount() {
		const { navigation } = this.props
		const proof = navigation.getParam('proof', 'No Proof was passed here')
		const json = {
			proof: proof
		}
		this.setState({ qrValue: JSON.stringify(json) })
	}

	render() {
		const { navigation } = this.props
		const username = navigation.getParam('username', 'default username')
		const password = navigation.getParam('password', 'default password')
		const DID = navigation.getParam('DID', 'default DID')
		const license = navigation.getParam('license', 'No License was passed here')
		const proof = navigation.getParam('proof', 'No Proof was passed here')

		return (
			<LinearGradient colors={primaryGradientArray} style={styles.container}>
				<View
					style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
				>
					<StatusBar barStyle='light-content' />
					<View style={styles.centered}>
						<Header title='Please allow the prover to scan the code' />
					</View>
					<View style={styles.qrStyle}>
						<QRCode value={this.state.qrValue} size={300} />
					</View>
					<MyButton
						title='Click me once prover scanned'
						onPress={async next => {
							// Simulate serer request
							await new Promise(resolve => setTimeout(resolve, 1000))
							next()
							this.props.navigation.navigate('ReadQR', {
								username: username,
								password: password,
								license: license,
								proof: proof,
								DID: DID
							})
						}}
					/>
				</View>
			</LinearGradient>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	qrStyle: {
		alignItems: 'center',
		width: 350,
		height: 350,
		backgroundColor: '#333'
	},
	centered: {
		alignItems: 'center',
		width: 300
	},
	inputContainer: {
		marginTop: 40,
		paddingLeft: 15,
		width: '100%',
		height: 50
	}
})

export default ShowQR
