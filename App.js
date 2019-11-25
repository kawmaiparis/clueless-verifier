import React from 'react'
import Modal, {
	ModalContent,
	ModalButton,
	ModalTitle
} from 'react-native-modals'
import QRCode from 'react-native-qrcode'

import {
	StyleSheet,
	Text,
	View,
	Button,
	TextInput,
	StatusBar,
	ScrollView
} from 'react-native'

import * as Permissions from 'expo-permissions'
import { BarCodeScanner } from 'expo-barcode-scanner'

class QrScanner extends React.Component {
	state = {
		showProofs: false,
		showQR: false,
		showReader: false,
		hasCameraPermission: null,
		scanned: false,
		name: '',
		data: '',
		qrValue: '',
		licenses: [],
		license: '',
		proofs: []
	}

	// async componentDidMount() {
	// 	 this.getPermissionsAsync()
	// }

	getPermissionsAsync = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA)
		this.setState({ hasCameraPermission: status === 'granted' })
	}

	/* API Call to get Licenses */
	getLicenses = () => {
		const mock = ['Driving', 'Drinking', 'Gaming']
		this.setState({ licenses: mock })
	}

	goToProof = license => {
		/* API Call to get Proofs for this licnese */
		const mock = ['baby', '18+', '21+', 'Dead.']
		this.setState({ license: license, proofs: mock, showProofs: true })
	}

	goToQR = () => {
		this.setState({ showQR: true })
	}

	goToReader = () => {
		this.setState({ showReader: true })
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
		}).then(response => {
			if (response.status == 200) {
				alert(`${name}, You have been successfully verified!`)
			} else {
				console.log(response)
				alert(`${name}, sit down and eat some marmites :(`)
			}
			this.setState({ scanned: false })
		})
	}

	componentDidMount() {
		this.getLicenses()
	}

	/* CHOOSE LICENSES -> PROOFS -> SHOW QR -> READER */

	render() {
		const Licenses = (
			<View style={styles.container}>
				<View style={styles.list}>
					<ScrollView contentContainerStyle={styles.scrollableList}>
						<Text>Select Your License</Text>
						{this.state.licenses.map(license => (
							<Button
								styles={styles.button}
								color='#ff0057'
								title={license}
								onPress={license => this.goToProof(license)}
							></Button>
						))}
					</ScrollView>
				</View>
			</View>
		)

		const Proofs = (
			<View style={styles.container}>
				<Text>Select Your Proof.</Text>
				<View style={styles.list}>
					<ScrollView contentContainerStyle={styles.scrollableList}>
						{this.state.proofs.map(proof => (
							<Button
								color='#ff0057'
								title={proof}
								onPress={this.goToQR}
							></Button>
						))}
					</ScrollView>
				</View>
			</View>
		)

		const QR = (
			<View style={styles.container}>
				<Text>A qr code somewhere</Text>
				<QRCode value={this.state.qrValue} size={200} />
				<Button
					title='Click me once they scan'
					onPress={this.goToReader}
				></Button>
			</View>
		)
		const Reader = (
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
			</View>
		)
		if (this.state.showReader) {
			return Reader
		}

		if (this.state.showQR) {
			return QR
		}

		if (this.state.showProofs) {
			return Proofs
		}
		return Licenses
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
		// justifyContent: 'center',
		// backgroundColor: 'red'
	},

	list: {
		height: 200,
		// flex: 1,
		// justifyContent: 'space-between',
		// marginTop: 70,
		// padding: 15,
		// marginBottom: 10,
		backgroundColor: 'blue'
	},
	column: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	scrollableList: {
		marginTop: 15
	},
	button: {
		width: '90%',
		marginTop: 15,
		padding: 20
	}

	// backgroundColor: '#fff',
	// 	alignItems: 'center',
	// 	justifyContent: 'center',
	// 	width: '100%',
	// 	backgroundColor: 'blue'
})
export default QrScanner
