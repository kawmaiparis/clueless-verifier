import React from 'react'

import { StyleSheet, Text, View, StatusBar, Button } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { primaryGradientArray } from '../utils/Colors'
import { serverIP } from '../utils/Config'

import Header from '../components/HeaderWhite.js'
import InputName from '../components/inputName.js'
import MyButton from '../components/MyButton.js'

import A from '../assets/svgs/sixthA.svg'
import B from '../assets/svgs/sixthB.svg'
import C from '../assets/svgs/sixthC.svg'

class VerifyName extends React.Component {
	state = {
		name: ''
	}

	static navigationOptions = {
		headerTransparent: true
	}

	handleVerify = async next => {
		const { navigation } = this.props
		const username = navigation.getParam('username', 'default username')
		const password = navigation.getParam('password', 'default password')
		const DID = navigation.getParam('DID', 'default DID')
		const proof = navigation.getParam('proof', 'No Proof was passed here')
		const data = navigation.getParam('data', 'No Data was passed here')
		const name = this.state.name

		console.log('here')

		let json = JSON.parse(JSON.parse(data))
		console.log(json)
		console.log(typeof json)
		const bucketName = json.bucket_name
		const objectName = json.file_name
		console.log(bucketName)
		console.log(objectName)

		const url = `${serverIP}prove-s3?verifierDid=${DID}&bucketName=${bucketName}&name=${name}&objectName=${objectName}&verifierWalletId=${username}&verifierWalletKey=${password}&proof=${proof}`
		console.log(url)
		await fetch(url, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		}).then(response => {
			next()
			if (response.status == 200) {
				alert(`${name} have been successfully verified!`)
			} else {
				console.log(response)
				alert(`${name} has failed to verify`)
			}
		})
	}

	render() {
		return (
			<LinearGradient colors={['#f0f0f0', '#f0f0f0']} style={styles.container}>
				<View
					style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
				>
					<View style={styles.A}>
						<A width={1100} height={1100} />
					</View>
					{/* <View style={styles.B}>
						<B width={600} height={600} />
					</View> */}
					{/* <View style={styles.C}>
						<C width={200} height={200} />
					</View> */}

					<StatusBar barStyle='light-content' />
					<View style={styles.centered}>
						<Header title="Verify the Prover's name" />
					</View>
					<View style={styles.inputContainer}>
						<InputName
							title='Name'
							value={this.state.name}
							onChangeText={name => this.setState({ name })}
						/>
					</View>
					<MyButton
						title='Submit'
						onPress={async next => {
							await this.handleVerify(next)
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
	centered: {
		alignItems: 'center',
		width: 300
	},
	inputContainer: {
		marginTop: 40,
		paddingLeft: 15,
		width: '100%',
		height: 50
	},
	A: {
		position: 'absolute',
		right: -220,
		top: -100
	},
	B: {
		position: 'absolute',
		right: 15,
		bottom: -100
	},
	C: {
		position: 'absolute',
		right: 10,
		bottom: 70
	}
})

export default VerifyName
