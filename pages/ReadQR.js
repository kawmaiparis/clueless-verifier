import React from 'react'

import {
	StyleSheet,
	Text,
	View,
	StatusBar,
	Button,
	ClippingRectangle
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { primaryGradientArray } from '../utils/Colors'
import { BarCodeScanner } from 'expo-barcode-scanner'

import Header from '../components/Header.js'

import B from './../assets/svgs/thirdB.svg'

class ReadQR extends React.Component {
	static navigationOptions = {
		headerTransparent: true
	}

	render() {
		const { navigation } = this.props
		const username = navigation.getParam('username', 'default username')
		const password = navigation.getParam('password', 'default password')
		const DID = navigation.getParam('DID', 'default DID')
		const license = navigation.getParam('license', 'No License was passed here')
		const proof = navigation.getParam('proof', 'No Proof was passed here')
		return (
			<LinearGradient colors={['#f0f0f0', '#f0f0f0']} style={styles.container}>
				<View
					style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
				>
					<StatusBar barStyle='light-content' />

					<View style={styles.B}>
						<B width={500} height={500} />
					</View>
					<View style={styles.centered}>
						<Header title={"Scan the Prover's"} />
					</View>

					<BarCodeScanner
						onBarCodeScanned={({ data }) => {
							this.props.navigation.navigate('VerifyName', {
								data: data,
								username: username,
								password: password,
								DID: DID,
								license: license,
								proof: proof
							})
						}}
						style={styles.camera}
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
	centered: {
		alignItems: 'center',
		width: '100%'
	},
	inputContainer: {
		marginTop: 40,
		paddingLeft: 15,
		width: '100%',
		height: 50
	},
	camera: {
		width: 1000,
		height: 1000
	},

	B: {
		position: 'absolute',
		right: 0,
		top: 0
	}
})

export default ReadQR
