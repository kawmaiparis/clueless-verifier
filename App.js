import React from 'react'
import Modal, {
	ModalContent,
	ModalButton,
	ModalTitle
} from 'react-native-modals'

import {
	StyleSheet,
	Text,
	View,
	Button,
	TouchableHighlight,
	Alert,
	TextInput
} from 'react-native'
import * as Permissions from 'expo-permissions'
import { BarCodeScanner } from 'expo-barcode-scanner'

class App extends React.Component {
	state = {
		hasCameraPermission: null,
		scanned: false,
		name: '',
		data: ''
	}

	// async componentDidMount() {
	// 	 this.getPermissionsAsync()
	// }

	getPermissionsAsync = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA)
		this.setState({ hasCameraPermission: status === 'granted' })
	}

	handleSubmit = async () => {
		console.log(this.state.data)
		let json = JSON.parse(this.state.data)
		console.log(json)
		// const bucketName = 'zero-knowledge-proof-json-files'
		// const objectName = '$userDID$timestamp.json'

		const bucketName = json.bucketname
		const objectName = json.filename
		const { name } = this.state
		const url = `http://34.244.72.181:8080/prove-s3?bucketName=${bucketName}&name=${name}&objectName=${objectName}`

		await fetch(url, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
			// params: {
			// 	bucketname: json.bucketname,
			// 	objectName: json.filename,
			// 	name: this.state.name
			// }
		}).then(response => {
			if (response.status == 200) {
				alert(`${name}, You have been successfully verified!`)
			} else {
				alert(`${name}, sit down and eat some marmites :(`)
			}
			this.setState({ scanned: false })
		})
		// alert(`Bar code with type ${type} and data ${data} has been scanned!`)
	}

	render() {
		return (
			<View
				style={{
					flex: 1,
					flexDirection: 'column',
					justifyContent: 'flex-end'
				}}
			>
				<Modal
					visible={this.state.scanned}
					onTouchOutside={() => this.setState({ scanned: false })}
					modalTitle={<ModalTitle title='Name please' />}
					opacity={0.5}
				>
					<ModalContent>
						<TextInput
							style={{
								height: 40,
								borderColor: 'gray',
								borderWidth: 1,
								textAlign: 'center'
							}}
							value={this.state.name}
							placeHolder='Charlie'
							onChangeText={name => this.setState({ name })}
						/>
					</ModalContent>
					<Button title='Verify' onPress={this.handleSubmit}></Button>
				</Modal>

				<BarCodeScanner
					onBarCodeScanned={
						this.state.scanned
							? undefined
							: ({ data }) => {
									this.setState({ data: data, scanned: true })
							  }
					}
					style={StyleSheet.absoluteFillObject}
				/>
				{/* {this.state.scanned && (
					<Button
						title={'Tap to Scan Again'}
						onPress={() => this.setState({ scanned: false })}
					/>
				)} */}
			</View>
		)
	}
}

export default App
