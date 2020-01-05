import React from 'react'

import { StyleSheet, Text, View, StatusBar, Button } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { primaryGradientArray } from '../utils/Colors'
import { serverIP } from '../utils/Config'

import Header from '../components/Header.js'
import InputName from '../components/inputName.js'
import MyButton from '../components/MyButton.js'

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

		let json = JSON.parse(data)
		console.log(data)
		console.log(json)
		const bucketName = json.bucket_name
		const objectName = json.file_name

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
				alert(`${name}, You have been successfully verified!`)
			} else {
				console.log(response)
				alert(`${name}, sit down and eat some marmites :(`)
			}
		})
	}

	render() {
		return (
			<LinearGradient colors={primaryGradientArray} style={styles.container}>
				<View
					style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
				>
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
	}
})

export default VerifyName
