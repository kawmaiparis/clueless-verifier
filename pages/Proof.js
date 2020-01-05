import React from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'
import { primaryGradientArray } from '../utils/Colors'

import Header from '../components/Header.js'
import ProofButton from '../components/ProofButton.js'
import { serverIP } from '../utils/Config'

import A from './../assets/svgs/thirdA.svg'
import B from './../assets/svgs/thirdB.svg'

class Proof extends React.Component {
	state = {
		license: '',
		proofs: []
	}

	componentDidMount() {
		const { navigation } = this.props
		const license = navigation.getParam('license', 'No License was passed here')
		this.setState({ license }, this.getProofs)
	}

	getProofs = async () => {
		const url = `${serverIP}get-proofs?licence=${this.state.license}`
		await fetch(url, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.json())
			.then(response => {
				if (response.status === undefined) {
					this.setState({ proofs: response })
				} else {
					alert(`Error fetching Proofs.`)
				}
			})
			.catch(() => {
				alert('Error fetching Proofs.')
			})
	}
	render() {
		const { navigation } = this.props
		const username = navigation.getParam('username', 'default username')
		const password = navigation.getParam('password', 'default password')
		const DID = navigation.getParam('DID', 'default DID')
		const license = navigation.getParam('license', 'No License was passed here')

		return (
			<LinearGradient colors={['#f0f0f0', '#f0f0f0']} style={styles.container}>
				<View
					style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center',
						marginBottom: -40
					}}
				>
					<View style={styles.A}>
						<A width={300} height={300} />
					</View>
					<View style={styles.B}>
						<B width={500} height={500} />
					</View>

					<View style={styles.centered}>
						<Header title={`${this.state.license} Proofs`} />
					</View>

					{this.state.proofs.map(proof => (
						<ProofButton
							key={proof}
							title={proof}
							onPress={async next => {
								await new Promise(resolve => setTimeout(resolve, 1000))
								next()
								this.props.navigation.navigate('ShowQR', {
									username: username,
									password: password,
									DID: DID,
									license: license,
									proof: proof
								})
							}}
						/>
					))}
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
		width: '100%',
		marginBottom: -20
	},
	A: {
		position: 'absolute',
		left: 20,
		bottom: 10
	},
	B: {
		position: 'absolute',
		right: -130,
		top: -160
	}
})

export default Proof
